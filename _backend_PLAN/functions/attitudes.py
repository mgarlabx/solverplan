from functions.completion import completion
from functions.competency_theory import competency_teory
from functions.level_tx import level_tx

def attitudes(level, competency, language):
    
    theory = competency_teory()
    
    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de elaborar uma lista de atitudes necessárias para o aluno desemvolver uma determinada competência.

    ## Para que tipo de aluno você deve elaborar:
    
    Você deve elaborar para alunos com essas características: {level_tx(level)}.

    ## O que você deve fazer:

    1. Leia atentamente a teoria informada.
    2. Pause e reflita sobre o texto lido.
    3. Leia atentamente a competência informada.
    4. Elabore 5 atitudes necessárias para desenvolver essa competência.

    ## Atitudes:

    As atitudes a serem elaboradas precisam estar diretamente relacionadas com a competência informada.
    
    Considere os seguintes exemplos de atitudes, mas pode criar mais caso seja necessário:

    **Atitudes éticas**
    - Honestidade
    - Respeito às normas
    - Responsabilidade
    - Justiça
    - Transparência
    
    **Atitutes consigo mesmo**
    - Resilência
    - Empenho
    - Dedicação
    - Autocontrole 
    - Disciplina
    - Iniciativa
    - Foco
    - Persistência
    - Proatividade
    - Aprendizagem contínua
    
    **Atitudes com os outros**
    - Colaboração
    - Compromisso
    - Cordialidade
    - Paciência
    - Pontualidade
    - Tolerância
    - Solidariedade
    - Lealdade
    - Respeito às diferenças
    
    **Atitudes com o entorno**
    - Sustentabilidade
    - Cidadania
    - Consciência ambiental
    - Consciência social
    - Consciência cultural
    - Consciência histórica
    - Consicência política
   
    Utilize essas palavras, mas expanda para correlacionar com a competência informada.
    
    ## O que você deve informar:
    Exiba as habilidades elaboradas no formato JSON, com a seguinte estrutura:
        
    {{"attitudes": [
        "text1",
        "text2",
        "text3",
        "text4",
        "text5"
    ]}}
        
        
    '''
    
    messages = []
    messages.append({ "role": "system", "content": "Estude essa teoria: " + theory })
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": "Elabore as atitudes necessárias para desenvolver essa competência: " + competency })
    
    resp = completion(messages, "", "", language)
    
    return resp