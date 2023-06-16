import os

from webscraping import WebScraper
from neo4jwrapper import Neo4jWrapper
import pandas
import random
from faker import Faker


'''
todo:
probably should seperate the steps into two seperate scripts. 
'''
if __name__ == '__main__':



    #run webscraping
    scrape_url = 'https://www.generalmills.com/food-we-make/brands'
    ws = WebScraper(scrape_url)
    brand_titles = list(ws.extract_resources('.field-brandtitle'))
    values = [title.text.strip() for title in brand_titles]
    brands = [{'name':brand_title} for brand_title in values]





    #neo4j
    neo4j_user = os.getenv('NEO4J_CENTRAL_USER')
    neo4j_password = os.getenv('NEO4J_CENTRAL_PASSWORD')
    neo4j_uri = os.getenv('NEO4J_CENTRAL_URI')
    neo4jwrapper = Neo4jWrapper(neo4j_url=neo4j_uri,neo4j_password=neo4j_password,neo4j_user=neo4j_user,database='SubsidiaryInsight',batch_size=10000)
    neo4jwrapper.execute_write(brands,Neo4jWrapper.mergeBrand)
    neo4jwrapper.execute_write(brands,Neo4jWrapper.mergeHasBrand)











