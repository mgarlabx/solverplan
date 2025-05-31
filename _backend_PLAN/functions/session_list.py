import boto3
from boto3.dynamodb.types import TypeDeserializer
import json
from decimal import Decimal

def session_list():
    
    # Custom JSON encoder for Decimal
    class DecimalEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, Decimal):
                return int(obj) if obj % 1 == 0 else float(obj)
            return super(DecimalEncoder, self).default(obj)
   
    # Get all items from DynamoDB
    client = boto3.client('dynamodb')
    response = client.scan(TableName='solverplan')
    items = response.get('Items', [])

    # Deserialize and sort the items
    deserializer = TypeDeserializer()
    converted_items = [{key: deserializer.deserialize(value) for key, value in item.items()} for item in items]
    sorted_items = sorted(converted_items, key=lambda x: x.get('date', ''), reverse=True)
    json_items = json.dumps(sorted_items, indent=4, cls=DecimalEncoder)

    return json_items