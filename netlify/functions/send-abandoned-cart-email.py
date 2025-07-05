import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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
        email = body.get('email')
        product_name = body.get('product_name')
        
        # Get the base URL from the event
        base_url = f"https://{event['headers']['host']}"
        
        html_content = f"""
        <html>
        <body>
            <h2>Don't miss out on exclusive student discounts!</h2>
            <p>You were about to purchase: <strong>{product_name}</strong></p>
            <p>Complete your purchase now and start saving with StudentVerify.</p>
            <p><a href="{base_url}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Complete Purchase</a></p>
            <p>Best regards,<br>StudentVerify Team</p>
        </body>
        </html>
        """
        
        success = send_email(email, 'Complete your StudentVerify purchase', html_content)
        
        if success:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'status': 'success', 'message': 'Abandoned cart email sent'})
            }
        else:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': 'Failed to send email'})
            }
        
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }

