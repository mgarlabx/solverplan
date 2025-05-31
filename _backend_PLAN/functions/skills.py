from functions.completion import completion
from functions.competency_theory import competency_teory
from functions.level_tx import level_tx
  
def skills(level, competency, language):
    
    theory = competency_teory()
    
    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de elaborar uma lista de habilidades necessárias para o aluno desemvolver uma determinada competência.

    ## Para que tipo de aluno você deve elaborar:
    
    Você deve elaborar para alunos com essas características: {level_tx(level)}.
    
    ## O que você deve fazer:

    1. Leia atentamente a teoria informada.
    2. Pause e reflita sobre o texto lido.
    3. Leia atentamente a competência informada.
    4. Elabore 5 habilidades necessárias para desenvolver essa competência.

    ## Habilidades:

    As habilidades a serem elaboradas precisam estar diretamente relacionadas com a competência informada.
    
    Considere os seguintes exemplos de habilidades, mas pode criar mais caso seja necessário:

    **Habilidades mentais**
    - Pensamento crítico
    - Pensamento estratégico
    - Pensamento analítico
    - Resolução de problemas
    - Tomada de decisão
    - Criatividade
    - Raciocínio lógico
    - Pensamento matemático
    - Senso de humor
    - Curiosidade
    - Memorização
    - Abstração
    
    **Habilidades de comunicação**
    - Comunicação verbal
    - Comunicação escrita
    - Comunicação não verbal
    - Fala em público
    - Capacidade de argumentação
    - Capacidade de negociação
    - Capacidade de síntese

    **Habilidades interpessoais**
    - Empatia
    - Liderança
    - Escuta ativa

    **Habilidades motoras**
    - Coordenação motora
    - Agilidade motora
    - Força muscular
    - Flexibilidade motora
    - Equilíbrio motor
    - Destreza manual

    **Habilidades sensoriais**
    - Visão aguçada
    - Audição apurada
    - Olfato apurado
    - Paladar apurado
    - Tato apurado
    
    **Habilidades artísticas**
    - Criatividade artística
    - Sensibilidade artística
    - Expressão artística
    - Talento musical
    - Talento para artes plásticas
    - Talento para pintura
    - Senso estético
    - Combinação de cores

    Utilize essas palavras, mas expanda para correlacionar com a competência informada.
        
    ## O que você deve informar:
    Exiba as habilidades elaboradas no formato JSON, com a seguinte estrutura:
        
    {{"skills": [
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
    messages.append({ "role": "user", "content": "Elabore as habilidades necessárias para desenvolver essa competência: " + competency })
    
    resp = completion(messages, "", "", language)
    
    return resp