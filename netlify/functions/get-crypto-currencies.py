import json
import requests
import os

def handler(event, context):
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    }
    
    # Handle preflight OPTIONS request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        url = 'https://api.nowpayments.io/v1/currencies'
        headers_np = {
            'x-api-key': os.environ.get('NOWPAYMENTS_API_KEY')
        }
        
        response = requests.get(url, headers=headers_np)
        
        if response.status_code == 200:
            currencies = response.json()
            # Filter to popular cryptocurrencies
            popular_cryptos = ['btc', 'eth', 'ltc', 'bch', 'xrp', 'ada', 'dot', 'bnb', 'usdt', 'usdc']
            filtered_currencies = [curr for curr in currencies['currencies'] if curr in popular_cryptos]
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'currencies': filtered_currencies})
            }
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Failed to fetch currencies'})
            }
            
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }

