from functions.completion import completion
from functions.level_tx import level_tx

def study_text(level, competency, challenge, title, description, language, complement):
    
    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de elaborar material didático de uma aula cujo conteúdo será usado no desafio da aprendizagem baseada em projetos ("Project-Based Learning - PBL")
    
    ## Para que tipo de aluno você deve elaborar:
 
    Você deve elaborar para alunos com essas características: {level_tx(level)}.

    ## O que você deve fazer:

    1. Leia atentamente a competência informada: {competency}.
    
    2. Leia atentamente o desafio que foi elaborado para essa competência: {challenge}.
    
    3. Leia atentamente o título informado: {title}. O material instrucional deve estar relacionado a esse título.

    4. Leia atentamente a descrição informada: {description}. O material instrucional deve estar relacionado a essa descrição.
    '''
    
    if complement != "":
        prompt += f'''
        5. Leia atentamente o complemento informado: {complement}. O material instrucional deve estar relacionado a esse complemento.
        '''
    
    prompt += f'''
    
    ## Instruções:
    
    - Elabore um texto com 20 mil caracteres, considerando o título e a descrição informados.
    
    - Pesquise teorias, conceitos e exemplos práticos para enriquecer o material, correlacionado com a competência e o desafio informados.
    
    - Caso cite algum autor, inclua o link (URL) da referência.
    
    - O texto deve ter densidade teórica explorando os principais conceitos e fundamentos.
    
    - Deve ser um texto acadêmico, com linguagem formal e técnica, porém acessível às características informadas dos alunos.
    
    - Utilize negrito, itálico e sublinhado para destacar palavras e frases-chave.
    
        
    ## Estrutura do texto:
    
    - Introdução: Apresentação do tema e do objetivo do texto sobre {title} - {description}.
    
    - Desenvolvimento: Apresentação dos conceitos e teorias consagradas. Essa parte deve ser a mais extensa do texto e poderá ter subdivisões.
    
    - Dicas e sugestões: Orientações para a aplicação prática dos conceitos no desafio informado ({challenge}).
    
    - Conclusão: Síntese dos principais pontos abordados.
    
    
        
    ## O que você deve informar:
    Exiba o resultado no formato JSON, com a seguinte estrutura:

    '''
    
    prompt += '''
        {
            "texto": "texto gerado"       
        }
        
    '''
    
    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": "Elabore o texto conforme as instruções fornecidas." })
    
    resp = completion(messages, "gpt-4o", 0.5, language)
    
    return resp