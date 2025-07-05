import json
import stripe
import os

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
        customer_email = body.get('email')
        product_name = body.get('product_name')
        
        # Set Stripe API key
        stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
        
        # Create a PaymentIntent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            metadata={
                'customer_email': customer_email,
                'product_name': product_name
            }
        )
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'client_secret': intent['client_secret'],
                'payment_intent_id': intent['id']
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }

