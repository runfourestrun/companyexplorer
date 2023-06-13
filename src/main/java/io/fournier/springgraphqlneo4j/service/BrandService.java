package io.fournier.springgraphqlneo4j.service;


import io.fournier.springgraphqlneo4j.dto.Brand;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {

    Neo4jClient neo4jClient;
    String database;

    public BrandService(Neo4jClient neo4jClient){
        this.neo4jClient = neo4jClient;
        this.database = "companyAnalyzer";

    }

    public List<Brand> getAllBrands(String brandName){

        return List.of();



    }







}
