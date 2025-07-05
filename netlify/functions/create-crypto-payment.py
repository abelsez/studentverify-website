import json
import requests
import os
from datetime import datetime

def handler(event, context):
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
    
    # Handle preflight OPTIONS request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Parse request body
        body = json.loads(event['body'])
        amount = body.get('amount')
        currency = body.get('currency', 'usd')
        pay_currency = body.get('pay_currency', 'btc')
        customer_email = body.get('email')
        product_name = body.get('product_name')
        
        # Get the base URL from the event
        base_url = f"https://{event['headers']['host']}"
        
        # NowPayments API endpoint
        url = 'https://api.nowpayments.io/v1/payment'
        
        headers_np = {
            'x-api-key': os.environ.get('NOWPAYMENTS_API_KEY'),
            'Content-Type': 'application/json'
        }
        
        payload = {
            'price_amount': amount,
            'price_currency': currency,
            'pay_currency': pay_currency,
            'order_id': f"order_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            'order_description': f"StudentVerify - {product_name}",
            'ipn_callback_url': f"{base_url}/.netlify/functions/crypto-webhook",
            'success_url': f"{base_url}/thank-you",
            'cancel_url': f"{base_url}/"
        }
        
        response = requests.post(url, headers=headers_np, json=payload)
        
        if response.status_code == 201:
            payment_data = response.json()
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'payment_id': payment_data['payment_id'],
                    'payment_url': payment_data['payment_url'],
                    'pay_address': payment_data['pay_address'],
                    'pay_amount': payment_data['pay_amount'],
                    'pay_currency': payment_data['pay_currency']
                })
            }
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Failed to create crypto payment'})
            }
            
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }

