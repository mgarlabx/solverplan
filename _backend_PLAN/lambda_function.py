import json
from functions.competency import competency
from functions.knowledge import knowledge
from functions.skills import skills
from functions.attitudes import attitudes
from functions.challenge import challenge
from functions.activities import activities
from functions.study_text import study_text
from functions.study_adds import study_adds
from functions.study_essay_ai import study_essay_ai
from functions.session_save import session_save
from functions.session_list import session_list

def lambda_handler(event, context):

    method = event["requestContext"]["http"]["method"]
    path = event["requestContext"]["http"]["path"]
    
    body = {}
    if 'body' in event and event['body'] is not None: body = event['body']
    
    if isinstance(body, str): body = json.loads(event['body']) # to convert to json when from JS or Postman

    ret = "No response"

    if (path == "/competency") & (method == "POST"):
        ret = competency(body["level"], body["competency"], body["language"])
    
    elif (path == "/knowledge") & (method == "POST"):
        ret = knowledge(body["level"], body["competency"], body["language"])

    elif (path == "/skills") & (method == "POST"):
        ret = skills(body["level"], body["competency"], body["language"])

    elif (path == "/attitudes") & (method == "POST"):
        ret = attitudes(body["level"], body["competency"], body["language"])

    elif (path == "/challenge") & (method == "POST"):
        ret = challenge(body["level"], body["competency"], body["knowledge"], body["skills"], body["attitudes"], body["additionalPrompt"], body["language"])

    elif (path == "/activities") & (method == "POST"):
        ret = activities(body["level"], body["competency"], body["knowledge"], body["skills"], body["attitudes"], body["challenge"], body["language"])
    
    elif (path == "/study_text") & (method == "POST"):
        ret = study_text(body["level"], body["competency"], body["challenge"], body["title"], body["description"], body["language"], body["complement"])
    
    elif (path == "/study_adds") & (method == "POST"):
        ret = study_adds(body["level"], body["option"], body["competency"], body["challenge"], body["title"], body["description"], body["text"], body["language"])

    elif (path == "/study_essay_ai") & (method == "POST"):
        ret = study_essay_ai(body["level"], body["question"], body["rubric"], body["answer"], body["text"], body["language"])
    
    elif (path == "/session_save") & (method == "POST"):
        ret = session_save(body["user"], body["session"], body["step"], body["tool"])

    elif (path == "/session_list") & (method == "GET"):
        ret = session_list()
   
    else:
        return {
            'statusCode': 400,
            'body': 'Bad Request'
        }
            
    resp = ret
    
    return {
         'statusCode': 200,
         'body': resp
    }
     