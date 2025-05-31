from functions.completion import completion
from googleapiclient.discovery import build
from functions.level_tx import level_tx
import os 
import json
import requests

def study_adds_news(level, competency, challenge, title, description, text, language):


    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de elaborar um material instrucional de uma aula no contexto da aprendizagem baseada em projetos ("Project-Based Learning - PBL")
    
    ## Para que tipo de aluno você deve elaborar:
    
    Você deve elaborar para alunos com essas características: {level_tx(level)}.

    ## O que você deve ler:

    1. Leia atentamente a competência informada: {competency}. O material instrucional deve ser elaborado para essa competência.
    
    2. Leia atentamente o desafio que foi elaborado para essa competência: {challenge}. O material instrucional deve ser elaborado para esse suportar a execução desse desafio.
       
    3. Leia atentamente o título informado: {title}. O material instrucional deve estar relacionado a esse título.

    4. Leia atentamente a descrição informada: {description}. O material instrucional deve estar relacionado a essa descrição.

    5. Leia atentamente o texto informado: {text}. O material instrucional deve estar elaborado com base nesse texto.

    6. Aguarde e reflita sobre os elementos informados para elaborar o material instrucional solicitado.


    '''

    ###### STEP 1 - Definindo a palavra chave para a busca 

    task = '''
    Selecione palavras-chave para fazer uma busca de notícias com os textos informados
    As palavras devem ser uma expressão que resuma o texto e que possa ser usada para buscar notícias relacionadas ao tema.
    Retorne no formato JSON: {"search": "sua frase"}
    '''
    
    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": task })    
    
    resp = completion(messages, "", "", language)
    
    resp = json.loads(resp)
    search = resp["search"] 


    ###### STEP 2 - Buscando notícias
    
    if language == "en":
        search_sites = f"{search} site:cnn.com OR site:bbc.com"
    elif language == "pt":
        search_sites = f"{search} site:cnnbrasil.com.br OR site:globo.com OR site:bbc.com OR site:uol.com.br"
    elif language == "es":
        search_sites = f"{search} site:cnnenespanol.cnn.com OR site:bbc.com/mundo"
    
    cx = "e5831863c8b7345b1" 
    custom_search = build("customsearch", "v1", developerKey=os.getenv('youTubeApiKey'))
    request = custom_search.cse().list(
        q=search_sites,
        cx=cx,
        num=10,
        dateRestrict="d60"  # Últimos N dias
    )
    response = request.execute()
    items = response.get("items", [])
    
    articles = []
    for item in items:
        title = item["title"]
        description = item["snippet"]
        url = item["link"]
        articles.append(
            {
                "title": title,
                "description": description,
                "url": url,
                "urlToImage": ""
            }
        )
    
    
    ###### STEP 3 - Selecionando as melhores notícias
    task = f'''
        Analise os artigos dessa lista: {articles}
        Escolha 3 artigos que você acredita que sejam mais relevantes para o material instrucional que você está elaborando
        Exiba o resultado em formato JSON com essa estrutura: {{"title": "Título do artigo", "description": "descricao do artigo", "url": "URL do artigo", "urlToImage": "Deixar vazio"}}
        '''
    
    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": task })
    resp = completion(messages, "", "", language) # TROCAR PELO GEMINI
    
        
    return resp

