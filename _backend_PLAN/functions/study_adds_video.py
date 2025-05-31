from functions.completion import completion
from functions.level_tx import level_tx
import os 
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import json

def study_adds_video(level, competency, challenge, title, description, text, language):


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

    ###### STEP 1 - Definindo a palavra chave para a busca no Youtube

    task = ''
    task += 'Elabore uma frase curta para fazer uma busca no Youtube com os textos informados. '
    task += 'Escolha termos bem genéricos e que possam ser encontrados em diversos vídeos. '
    task += 'Traduza os termos para o idioma informado: ' + language
    task += 'Retorne no formato JSON: {"search": "sua frase"}'
    
    
    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": task })    
    
    resp = completion(messages, "", "", language)
    
    resp = json.loads(resp)
    search = resp["search"] 

    ###### STEP 2 - Buscando vídeos no Youtube

    youtube = build('youtube','v3', developerKey=os.getenv('youTubeApiKey'))

    # https://developers.google.com/youtube/v3/docs/search
    days = 3*365
    request = youtube.search().list(
        q=search,
        part="snippet",
        type="video",  
        order="viewCount",
        relevanceLanguage=language,
        maxResults=20,
        publishedAfter=(datetime.now() - timedelta(days=days)).isoformat("T") + "Z"  
    )
    response = request.execute()

    videos = []
    for item in response.get("items", []):
        videos.append({
            "title": item["snippet"]["title"],
            "description": item["snippet"]["description"],
            "id": item['id']['videoId'],
            "date": item["snippet"]["publishedAt"]
        })


    ###### STEP 3 - Selecionando o vídeo mais apropriado

    task = f'''
        Analise os vídeos dessa lista: {videos}
        Escolha um vídeo que você acredita que seja o mais relevante para o material instrucional que você está elaborando
        Selecione vídeo com no máximo 15 minutos de duração.
        Selecione vídeos no idioma informado: {language}
        Exiba o resultado em formato JSON com essa estrutura: {{"title": "Título do vídeo", "id": "ID do vídeo"}}
        '''
    
    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": task })
    
    resp = completion(messages, "", "", language)

    return resp

