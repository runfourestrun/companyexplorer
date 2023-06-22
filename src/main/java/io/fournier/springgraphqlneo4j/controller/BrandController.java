package io.fournier.springgraphqlneo4j.controller;


import io.fournier.springgraphqlneo4j.dto.Brand;
import io.fournier.springgraphqlneo4j.service.BrandService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;

@Controller
public class BrandController {

    private BrandService brandService;


    public BrandController(BrandService brandService){
        this.brandService = brandService;

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @QueryMapping
    public Collection<Brand> getSubBrands(@Argument String brandName){
        return brandService.getSubBrands(brandName);

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @QueryMapping
    public Collection<Brand> getAllBrands(){
        return brandService.getAllBrands();
    }


}
