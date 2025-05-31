from functions.completion import completion
from functions.pbl_theory import pbl_theory
from functions.level_tx import level_tx

def activities(level, competency, knowledge, skills, attitudes, challenge, language):
    
    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de elaborar um conjunto de atividades relacionadas com um desafio para ser usado no contexto da aprendizagem baseada em projetos ("Project-Based Learning - PBL")

    ## Para que tipo de aluno você deve elaborar:
    
    Você deve elaborar para alunos com essas características: {level_tx(level)}.

    ## O que você deve fazer:

    1. Leia atentamente a teoria do PBL: {pbl_theory()}.
    
    2. Descanse e reflita sobre o texto lido.
    
    3. Leia atentamente a competência informada: {competency}.
    
    4. Leia atentamente os conhecimentos necessários para essa competência: {knowledge}.
    
    5. Leia atentamente as habilidades necessárias para essa competência: {skills}.
    
    6. Leia atentamente as atitudes necessárias para essa competência: {attitudes}.
    
    7. Leia atentamente o desafio que foi elaborado para essa competência: {challenge}.
    
    8. Elabore um conjunto de atividades de acordo com o conceito de Learning Backlog (LBL) a serem desenvolvidas pelo aluno.

    ## Desafio

    ## Learning Backlog (LBL)

    O Learning Backlog (LBL) deverá ter duração total de 5 unidades
    
    Em cada unidade deverá haver:
    - 1 encontro de orientação (advising)
    - 4 encontros de instrução (instructions)
    - 5 autoestudos (studies)
    
    ## Autoestudos (studies)
    
    - Os autoestudos são atividades que o aluno deverá realizar de forma autônoma, interagindo com o material que será disponibilizado.
    - O tema dos autoestudos devem apoiar os encontros de instrução e os artefatos a serem entregues, leia o desafio para entender melhor: {challenge}.
    - Aborde todos os conteúdos teóricos nos autoestudos das quatro primeiras unidades: {knowledge}.
    - Na unidade 5, os autoestudos devem ser voltados para o desenvolvimento dessas atitudes: {attitudes}.
    - Não repita os títulos dos autoestudos em unidades diferentes.
    - O título dos autoestudos deve ser claro e objetivo e refletir os conteúdos a serem estudados.
    - A descrição dos autoestudos deve conter palavras e frases-chave significativas que serão utilizadas nos prompts para geração de conteúdos.
        
    ## O que você deve informar:
    Exiba a atividades elaboradas no formato JSON, com a seguinte estrutura:

    {{"activities":
        [
            {{
                "unit": "number",
                "advising": {{ "title": "text", "description": "text" }},
                "instructions": [
                    {{ "title": "text", "description": "text" }},
                    {{ "title": "text", "description": "text" }},
                    {{ "title": "text", "description": "text" }},
                    {{ "title": "text", "description": "text" }}
                ],
                "studies": [
                    {{ "title": "text", "description": "text" }},
                    {{ "title": "text", "description": "text" }},
                    {{ "title": "text", "description": "text" }},
                    {{ "title": "text", "description": "text" }},
                    {{ "title": "text", "description": "text" }},
                ]
            }}
        ]
    }}
    '''
    
    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": "Elabore as atividades conforme as instruções fornecidas." })
    
    resp = completion(messages, "", "", language)
    
    return resp