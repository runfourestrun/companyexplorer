package io.fournier.springgraphqlneo4j.service;
import io.fournier.springgraphqlneo4j.dto.Brand;
import org.neo4j.driver.Record;
import org.neo4j.driver.types.TypeSystem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.function.BiFunction;


@Service
public class BrandService {

    private Neo4jClient neo4jClient;

    private String database;


    private BiFunction<TypeSystem,Record,Brand> toBrandDTO = this::toBrandDTO;



    public BrandService(Neo4jClient neo4jClient,@Value("${spring.datasource.database}") String database){
        this.neo4jClient = neo4jClient;
        this.database = database;
    }


    public Collection<Brand> getSubBrands(String brandName) {
        String cypherString = String.format("MATCH (b:Brand {name: '%s'}) - [:HAS_BRAND] -> (b1:Brand) RETURN b1 {.name}", brandName);
        return this.neo4jClient.query(cypherString)
                .in(database)
                .fetchAs(Brand.class)
                .mappedBy(toBrandDTO)
                .all();

    }


    public Collection<Brand> getAllBrands(){
        String cypherString = String.format("MATCH (b:Brand) RETURN b {.name}");
        return this.neo4jClient.query(cypherString)
                .in(database)
                .fetchAs(Brand.class)
                .mappedBy(toBrandDTO)
                .all();
    }


    public Brand toBrandDTO(TypeSystem typeSystem, Record record) {
        var result_map = record.get(0).asMap();
        var name = (String) result_map.get("name");
        Brand brandDTO = new Brand(name);
        return brandDTO;
    }



}
