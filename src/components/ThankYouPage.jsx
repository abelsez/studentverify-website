import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { CheckCircle, GraduationCap, Star, ArrowRight } from 'lucide-react'

const ThankYouPage = () => {
  useEffect(() => {
    // Track successful conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', {
        transaction_id: new Date().getTime(),
        value: 29.99,
        currency: 'USD'
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to StudentVerify!
          </h1>
          <p className="text-xl text-gray-600">
            Your payment was successful and your account is now active.
          </p>
        </div>

        {/* Confirmation Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <span>Account Activated</span>
            </CardTitle>
            <CardDescription className="text-blue-100">
              You now have access to exclusive student discounts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Verified Discounts</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Up to 60%</div>
                <div className="text-sm text-gray-600">Savings Available</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Access Available</div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <span className="text-gray-700">Check your email for account details and verification instructions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <span className="text-gray-700">Browse our extensive catalog of student discounts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <span className="text-gray-700">Start saving on your favorite brands and services</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Pro Tip</span>
              </div>
              <p className="text-yellow-700 text-sm">
                Bookmark our website and check back regularly for new discounts and exclusive offers!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Browse Discounts
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" className="flex-1">
                Download Mobile App
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Support</h4>
                <p className="text-gray-600">Email: support@studentverify.com</p>
                <p className="text-gray-600">Response time: Within 24 hours</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Quick Links</h4>
                <div className="space-y-1">
                  <a href="/help" className="text-blue-600 hover:underline block">Help Center</a>
                  <a href="/faq" className="text-blue-600 hover:underline block">FAQ</a>
                  <a href="/contact" className="text-blue-600 hover:underline block">Contact Us</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Thank you for choosing StudentVerify powered by fastdiscountfinder.com</p>
        </div>
      </div>
    </div>
  )
}

export default ThankYouPage

