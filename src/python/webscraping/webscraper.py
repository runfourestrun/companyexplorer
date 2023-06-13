import requests
from typing import List
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options


'''
todo: Need to implement logging instead of that ugly try/catch block
'''
class WebScraper:
    def __init__(self, url: str) -> None:
        self.url = url
        self._chrome_version = '114.0.5735.16'
        self._chrome_options = Options().add_argument('--headless')
        self._chrome_service = Service(executable_path=
                                       ChromeDriverManager(version=self._chrome_version).install())
        self._start_chrome_service()
        self._beautiful_soup_parser = 'html.parser'
        self.driver = webdriver.Chrome(service=self._chrome_service,options=self._chrome_options)


    def _start_chrome_service(self) -> None:
        self._chrome_service.start()

    def extract_resources(self, selector: str) -> List[str]:
        try:
            self.driver.get(self.url)
            html_content = self.driver.page_source
            soup = BeautifulSoup(html_content,self._beautiful_soup_parser)
            result_set = soup.select(selector)
            return list(result_set)
        except Exception as e:
            print("an error has occured")
            return []
