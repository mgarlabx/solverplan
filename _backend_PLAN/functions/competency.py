from functions.completion import completion
from functions.competency_theory import competency_teory
from functions.level_tx import level_tx

def competency(level, competency, language):
    
    theory = competency_teory()
    
    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de elaborar competências a serem desenvolvidas pelos alunos.
    Sua missão é analisar um texto apresentado e convertê-lo em uma competência de acordo com regras específicas.

    ## Para que tipo de aluno você deve elaborar:
    
    Você deve elaborar para alunos com essas características: {level_tx(level)}.

    ## O que você deve fazer:

    1. Leia atentamente a teoria informada.
    2. Pause e reflita sobre o texto lido.
    3. Observe o texto informado pelo usuário.
    4. Analise se o texto informado tem elementos suficientes para elaborar uma competência.
    5. Se tiver, elabore uma competência no formato objetivo + condição + contexto, em uma única frase.
    
    ## O que você deve informar:
    Exiba a competência elaborada no formato JSON, com a seguinte estrutura:
        
        {{
            "competency": "text"
        }}
        
    '''
    
    messages = []
    messages.append({ "role": "system", "content": "Estude essa teoria: " + theory })
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": competency })
    
    resp = completion(messages, "", "", language)
    
    return resp 