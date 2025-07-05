import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CreditCard, Coins, Shield, CheckCircle, X } from 'lucide-react'

let stripePromise = null

const PaymentModal = ({ isOpen, onClose, product }) => {
  const [stripeKey, setStripeKey] = useState('')
  const [cryptoCurrencies, setCryptoCurrencies] = useState([])
  const [selectedCrypto, setSelectedCrypto] = useState('btc')
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchStripeKey()
      fetchCryptoCurrencies()
    }
  }, [isOpen])

  const fetchStripeKey = async () => {
    try {
      const response = await fetch('/api/get-stripe-key')
      const data = await response.json()
      setStripeKey(data.publishable_key)
      stripePromise = loadStripe(data.publishable_key)
    } catch (error) {
      console.error('Failed to fetch Stripe key:', error)
    }
  }

  const fetchCryptoCurrencies = async () => {
    try {
      const response = await fetch('/api/get-crypto-currencies')
      const data = await response.json()
      setCryptoCurrencies(data.currencies || [])
    } catch (error) {
      console.error('Failed to fetch crypto currencies:', error)
    }
  }

  const handleCryptoPayment = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch('/api/create-crypto-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price,
          currency: 'usd',
          pay_currency: selectedCrypto,
          email: email,
          product_name: product.name
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        // Redirect to NowPayments checkout
        window.open(data.payment_url, '_blank')
        setPaymentSuccess(true)
      } else {
        alert('Failed to create crypto payment: ' + data.error)
      }
    } catch (error) {
      alert('Payment failed: ' + error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Initiated!</CardTitle>
            <CardDescription>
              Your payment is being processed. You will receive a confirmation email once completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onClose} className="w-full">
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
              <CardDescription>
                {product?.name} - ${product?.price}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Credit Card</span>
              </TabsTrigger>
              <TabsTrigger value="crypto" className="flex items-center space-x-2">
                <Coins className="h-4 w-4" />
                <span>Cryptocurrency</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4">
              {stripeKey && (
                <Elements stripe={stripePromise}>
                  <StripePaymentForm 
                    product={product} 
                    email={email} 
                    onSuccess={() => setPaymentSuccess(true)}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                  />
                </Elements>
              )}
            </TabsContent>

            <TabsContent value="crypto" className="space-y-4">
              <div>
                <Label>Select Cryptocurrency</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {cryptoCurrencies.map((currency) => (
                    <Button
                      key={currency}
                      variant={selectedCrypto === currency ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCrypto(currency)}
                      className="text-xs"
                    >
                      {currency.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Secure Crypto Payment</span>
                </div>
                <p className="text-sm text-blue-700">
                  Pay with {selectedCrypto.toUpperCase()} through our secure payment processor.
                </p>
              </div>

              <Button 
                onClick={handleCryptoPayment} 
                className="w-full"
                disabled={isProcessing || !email}
              >
                {isProcessing ? 'Processing...' : `Pay with ${selectedCrypto.toUpperCase()}`}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <p className="text-xs text-gray-600">
              Your payment information is encrypted and secure. We never store your payment details.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const StripePaymentForm = ({ product, email, onSuccess, isProcessing, setIsProcessing }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements || !email) {
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price * 100, // Convert to cents
          currency: 'usd',
          email: email,
          product_name: product.name
        })
      })

      const { client_secret, payment_intent_id } = await response.json()

      // Confirm payment
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        }
      })

      if (result.error) {
        setError(result.error.message)
      } else {
        // Payment succeeded
        await fetch('/api/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_intent_id: payment_intent_id
          })
        })
        
        onSuccess()
      }
    } catch (error) {
      setError('Payment failed: ' + error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing || !email}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : `Pay $${product.price}`}
      </Button>
    </form>
  )
}

export default PaymentModal

