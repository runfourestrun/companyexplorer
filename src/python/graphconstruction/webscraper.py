import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager



class WebScraper:
    def __init__(self, url):
        self.url = url
        self.webdriver = webdriver.Chrome(ChromeDriverManager().install())

    def _driver_get(self):
        self.webdriver.get(self.url)
        return self.webdriver


    def extract_source(self):
        driver = self._driver_get()
        source = driver.page_source
        soup = BeautifulSoup(source, 'html.parser')
        print(soup)