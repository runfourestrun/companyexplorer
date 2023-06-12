package io.fournier.springgraphqlneo4j;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;

@TestConfiguration(proxyBeanMethods = false)
class TestSpringGraphqlNeo4jApplication {

    public static void main(String[] args) {
        SpringApplication.from(SpringGraphqlNeo4jApplication::main).with(TestSpringGraphqlNeo4jApplication.class).run(args);
    }

}
