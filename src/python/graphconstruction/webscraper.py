import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options


class WebScraper:
    def __init__(self, url):
        self.url = url
        self._chrome_version = '114.0.5735.16'
        self._chrome_options = Options().add_argument('--headless')
        self._chrome_service = Service(executable_path=
                                       ChromeDriverManager(version=self._chrome_version).install())
        self._start_chrome_service()
        self.driver = webdriver.Chrome(service=self._chrome_service,options=self._chrome_options)


    def _start_chrome_service(self):
        self._chrome_service.start()

    def extract_resources(self):
        self.driver.get(self.url)
        print(self.driver.page_source)