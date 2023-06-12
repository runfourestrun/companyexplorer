from graphconstruction import WebScraper





if __name__ == '__main__':

    url = 'https://www.generalmills.com/food-we-make/brands'
    ws = WebScraper(url)
    print(ws.extract_resources())


