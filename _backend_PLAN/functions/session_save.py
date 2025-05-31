import boto3
from datetime import datetime

def session_save(user, session, step, tool):
   
    if (user == "mgar"): return 
    
    client = boto3.client('dynamodb')
    
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
   
    # Prepare the DynamoDB item
    page = {
        'user': {'S': user},
        'session': {'S': session},
        'step': {'N': str(step)},
        'date': {'S': now},
        'tool': {'S': tool}
    }
    
    # Insert/update item in DynamoDB
    client.put_item(
        TableName = 'solverplan',
        Item = page
    )   

    resp = {"user": user, "session": session, "step": step, "tool": tool}
    
    return resp