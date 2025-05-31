from functions.completion import completion
from functions.competency_theory import competency_teory
from functions.level_tx import level_tx

  

def knowledge(level, competency, language):
    
    theory = competency_teory()
    
    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de elaborar uma lista de conhecimentos necessários para o aluno desemvolver uma determinada competência.

    ## Para que tipo de aluno você deve elaborar:
    
    Você deve elaborar para alunos com essas características: {level_tx(level)}.
    
    ## O que você deve fazer:

    1. Leia atentamente a teoria informada.
    2. Pause e reflita sobre o texto lido.
    3. Leia atentamente a competência informada.
    4. Elabore 10 conhecimentos necessários para essa competência.

    ## Conhecimentos:

    Os conhecimentos a serem elaborados precisam estar diretamente relacionados com a competência informada.
    Elabore apenas uma lista de conhecimentos, sem iniciar com verbos como saber, compreender, etc.
    
    
    ## O que você deve informar:
    Exiba os conhecimentos elaborados no formato JSON, com a seguinte estrutura:
        
    {{"knowledge": [
        "text1",
        "text2",
        "text3",
        "text4",
        "text5",
        "text6",
        "text7",
        "text8",
        "text9",
        "text10"
    ]}}
        
    '''
    
    messages = []
    messages.append({ "role": "system", "content": "Estude essa teoria: " + theory })
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": "Elabore os conhecimentos para essa competência: " + competency })
    
    resp = completion(messages, "", "", language)
    
    return resp