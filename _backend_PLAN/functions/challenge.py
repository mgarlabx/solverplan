from functions.completion import completion
from functions.level_tx import level_tx

def challenge(level, competency, knowledge, skills, attitudes, additionalPrompt, language):
    
    if (additionalPrompt != None) & (additionalPrompt != ""):
        additionalPrompt = f'6. Conside as seguintes recomendações adicionais: {additionalPrompt}'
    
    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de elaborar um desafio para ser usado no contexto da aprendizagem baseada em projetos ("Project-Based Learning - PBL")

    ## Para que tipo de aluno você deve elaborar:
    
    Você deve elaborar para alunos com essas características: {level_tx(level)}.

    ## O que você deve fazer:

    1. Leia atentamente a competência informada: {competency}.
    
    2. Leia atentamente os conhecimentos necessários para essa competência: {knowledge}.
    
    3. Leia atentamente as habilidades necessárias para essa competência: {skills}.
    
    4. Leia atentamente as atitudes necessárias para essa competência: {attitudes}.
    
    5. Elabore um desafio na forma de um projeto que os alunos deverão realizar para desenvolver a competência informada: {competency}.
    
    {additionalPrompt}

    ## Desafio

    O desafio deverá estar relacionado com a competência informada ({competency}) e deverá ser elaborado na forma de um projeto a ser realizado pelos alunos.
    O tipo de projeto a ser desenvolvido poderá ser um relatório, um artigo, uma obra de arte, uma música, um vídeo, um aplicativo, um jogo, um experimento, uma pesquisa, um protótipo, um modelo, um plano, um programa, um projeto, um sistema, um website, entre outros.

    O desafio deverá ter a seguinte estrutura:

    Título do desafio:
    - frase curta sumarizando o desafio

    Contexto do desafio: 
    - descrição do problema a ser resolvido, incluindo ambiente, situações, limitações e outros aspectos relevantes do problema

    Objetivo do projeto: 
    - descrição do que deverá ser elaborado pelo aluno para resolver o problema apresentado

    Entregas do projeto: 
    - cinco artefatos que devem ser produzidos
    - cada artefato é uma etapa do projeto
    - o último artefato é a entrega final
    - os artefatos devem considerar também as habilidades e atitudes necessárias para a competência informada, além dos conhecimentos.

    Avaliação:
    - para cada artefato deve ser elaborado um barema ou rubrica para correção, com nota final para cada artefato de zero a 10.
    - as rubricas devem considerar também as habilidades e atitudes necessárias para a competência informada, além dos conhecimentos.

    ## O que você deve informar:
    Exiba o desafio elaborado no formato JSON, com a seguinte estrutura:

    {{"challenge": {{
            "title": "text",
            "context": "text",
            "objective": "text",
            "artifacts": [
                {{
                    "title": "text",
                    "description": "text",
                    "rubric": "text"
                }},
                {{
                    "title": "text",
                    "description": "text",
                    "rubric": "text"
                }},
                {{
                    "title": "text",
                    "description": "text",
                    "rubric": "text"
                }},
                {{
                    "title": "text",
                    "description": "text",
                    "rubric": "text"
                }},
                {{
                    "title": "text",
                    "description": "text",
                    "rubric": "text"
                }}
            ]
        }}
    }}
        
    '''
    
    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": "Elabore o desafio na forma de um projeto, conforme as instruções." })
                 
    
    resp = completion(messages, "", "", language)
    
    return resp