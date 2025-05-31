from functions.completion import completion
from functions.study_adds_video import study_adds_video
from functions.study_adds_news import study_adds_news
from functions.level_tx import level_tx

def study_adds(level, option, competency, challenge, title, description, text, language):

    model = "gpt-4o-mini"
    temperature = 1
    
    if option == 'summary':
        task = f'''
            Elabore um resumo do texto informado, no formato de 5 itens, cada um em apenas uma linha.
            Cada linha deve conter uma informação relevante do texto.
            Cada linha deve ter no máximo 120 caracteres.

            ## Para que tipo de aluno você deve elaborar:
            Você deve elaborar para alunos com essas características: {level_tx(level)}.

            '''
        json = '''
            {"summary": [
                "item1",
                "item2",
                "item3",
                "item4",
                "item5"
            ]}
        '''

    elif option == 'quiz':
        task = f'''
            Elabore cinco testes (perguntas de múltipla escolha) sobre o texto informado, com quatro alternativas cada.
            Para cada alternativa, elabore um feedback, explicando a razão de estar certa ou errada.
            
            ## Para que tipo de aluno você deve elaborar:
            Você deve elaborar para alunos com essas características: {level_tx(level)}.
            '''
        json = '''
            {"quiz":[{
                "command": "texto",
                "alternative_1": "texto",
                "feedback_1": "texto",
                "alternative_2": "texto",
                "feedback_2": "texto",
                "alternative_3": "texto",
                "feedback_3": "texto",
                "alternative_4": "texto",
                "feedback_4": "texto",
                "correct": "numero"
            }]}
        '''

    elif option == 'essay':
        task = f'''
            Elabore uma questão discursiva sobre o tema.
            Elabore um barema ou rubrica para correção da questão, admitindo que a correção será feita por IA. 

            ## Para que tipo de aluno você deve elaborar:
            Você deve elaborar para alunos com essas características: {level_tx(level)}.
            '''
        json = '''
            {"essay":{
                "command": "texto",
			    "rubric": "texto",
                }
            }
        '''


    elif option == 'video':
        resp = study_adds_video(level, competency, challenge, title, description, text, language)
        return resp

    elif option == 'news':
        resp = study_adds_news(level, competency, challenge, title, description, text, language)
        return resp




    prompt = f'''
    
    ## Quem é você:

    Você é um planejador acadêmico em instituições de ensino superior. 
    Você está encarregado de elaborar um material instrucional de uma aula no contexto da aprendizagem baseada em projetos ("Project-Based Learning - PBL")
    
    ## O que você deve ler:

    1. Leia atentamente a competência informada: {competency}. O material instrucional deve ser elaborado para essa competência.
    
    2. Leia atentamente o desafio que foi elaborado para essa competência: {challenge}. O material instrucional deve ser elaborado para esse suportar a execução desse desafio.
       
    3. Leia atentamente o título informado: {title}. O material instrucional deve estar relacionado a esse título.

    4. Leia atentamente a descrição informada: {description}. O material instrucional deve estar relacionado a essa descrição.

    5. Leia atentamente o texto informado: {text}. O material instrucional deve estar elaborado com base nesse texto.

    6. Aguarde e reflita sobre os elementos informados para elaborar o material instrucional solicitado.

    ## O que você deve fazer:

    {task}
        
    ## O que você deve informar:
    Exiba o resultado no formato JSON, com a seguinte estrutura:

    {json}

    '''
    
    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "user", "content": "Elabore o material instrucional solicitado."})
    
    resp = completion(messages, model, temperature, language)
    
    return resp