import json
import stripe
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def send_email(to_email, subject, html_content):
    """Send email using SMTP"""
    try:
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = "sheeredudeals@gmail.com"
        sender_password = os.environ.get('EMAIL_PASSWORD')
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = sender_email
        msg['To'] = to_email
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Email sending failed: {str(e)}")
        return False

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
        payment_intent_id = body.get('payment_intent_id')
        
        # Set Stripe API key
        stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
        
        # Retrieve the payment intent
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        if intent['status'] == 'succeeded':
            customer_email = intent['metadata']['customer_email']
            product_name = intent['metadata']['product_name']
            amount = intent['amount'] / 100  # Convert from cents
            
            # Send confirmation email to customer
            customer_html = f"""
            <html>
            <body>
                <h2>Thank you for your purchase!</h2>
                <p>Your StudentVerify subscription has been activated.</p>
                <p><strong>Product:</strong> {product_name}</p>
                <p><strong>Amount:</strong> ${amount}</p>
                <p><strong>Payment ID:</strong> {payment_intent_id}</p>
                <p>You can now access exclusive student discounts at StudentVerify.</p>
                <p>Best regards,<br>StudentVerify Team</p>
            </body>
            </html>
            """
            
            # Send order notification to orders@fastdiscountfinder.com
            order_html = f"""
            <html>
            <body>
                <h2>New Order Received</h2>
                <p><strong>Customer Email:</strong> {customer_email}</p>
                <p><strong>Product:</strong> {product_name}</p>
                <p><strong>Amount:</strong> ${amount}</p>
                <p><strong>Payment ID:</strong> {payment_intent_id}</p>
                <p><strong>Date:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            </body>
            </html>
            """
            
            # Send emails
            send_email(customer_email, 'Thank you for your StudentVerify purchase!', customer_html)
            send_email("sheeredudeals@gmail.com", f"New StudentVerify Order - {payment_intent_id}", order_html)            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'status': 'success',
                    'message': 'Payment confirmed and email sent'
                })
            }
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'status': 'failed',
                    'message': 'Payment not completed'
                })
            }
            
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }

