from functions.completion import completion
from functions.level_tx import level_tx

def study_essay_ai(level, question, rubric, answer, text, language):


    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino. 
    Você está encarregado de corrigir uma questão respondida por um aluno.
    
    ## Para que tipo de aluno você deve elaborar:
    Você deve elaborar para alunos com essas características: {level_tx(level)}.

    
    ## O que você deve ler:

    1. Leia atentamente o texto informado: {text}. A pergunta que o aluno irá responder está relacionada com esse texto.

    2. Leia atentamente a pergunta que foi formulada ao aluno: {question}.

    3. Leia atentamente a rubrica para a correção da pergunta que foi formulada ao aluno: {rubric}.

    4. Aguarde e reflita sobre os elementos informados para elaborar o material instrucional solicitado.

    ## O que você deve fazer:

    Corrija a resposta do aluno, considerando a rubrica informada.
        
    ## O que você deve informar:
    Exiba o resultado no formato JSON, com a seguinte estrutura:

    {{
        "correcao": "texto da correção efetuada",
    }}

    '''
    if len(answer) < 20:
        resp = {"correcao": "Resposta do aluno muito curta. Por favor, forneça uma resposta mais detalhada."}
    
    else:
        messages = []
        messages.append({ "role": "system", "content": prompt })
        messages.append({ "role": "user", "content": "Corrija essa resposta do aluno: " + answer })
        
        resp = completion(messages, "", "", language)
        
    return resp