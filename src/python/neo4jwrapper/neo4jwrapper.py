from neo4j import GraphDatabase,Transaction,Result
from typing import List, Any, Iterator,Callable,Dict


class Neo4jWrapper:
    def __init__(self, neo4j_url: str, neo4j_user: str, neo4j_password: str, database: str,batch_size: int = 1000) -> None:
        self.driver = GraphDatabase.driver(neo4j_url, auth=(neo4j_user, neo4j_password))
        self.session = self.driver.session(database=database)
        self.batch_size = batch_size


    def execute_write(self,params: List[Any], transaction_func: Callable[[Transaction, List[Dict[str, Any]]], Result]) -> None:
        for paramenters in self._batch_parameters(params,self.batch_size):
            packaged_params = {'params': paramenters}
            self.session.execute_write(transaction_func,packaged_params)



    @staticmethod
    def _batch_parameters(lst: List[Any], batch_size: int) -> Iterator[List[Any]]:
        for i in range(0, len(lst), batch_size):
            yield lst[i:i + batch_size]


    @staticmethod
    def mergeBrand(tx:Transaction,params: List[Dict[str, Any]]) -> Result:
        tx.run('''
        UNWIND $params as param
        MERGE (b:Brand {name:param.name})
        MERGE (b1:Brand {name:"General Mills"})
        ''',parameters=params)


    @staticmethod
    def mergeHasBrand(tx:Transaction,params: List[Dict[str, Any]]) -> Result:
        tx.run('''
        UNWIND $params as param
        MATCH (b:Brand {name: param.name})
        MATCH (b1:Brand {name: "General Mills"})
        MERGE (b1)-[:HAS_BRAND]->(b)
        ''',parameters=params)





