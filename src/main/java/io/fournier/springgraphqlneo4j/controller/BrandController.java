package io.fournier.springgraphqlneo4j.controller;


import io.fournier.springgraphqlneo4j.dto.Brand;
import io.fournier.springgraphqlneo4j.service.BrandService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Collection;
import java.util.List;

@Controller
public class BrandController {

    private BrandService brandService;


    public BrandController(BrandService brandService){
        this.brandService = brandService;

    }


    @QueryMapping
    public Collection<Brand> getAllBrands(@Argument String brandName){
        return brandService.getAllBrands(brandName);

    }



}
