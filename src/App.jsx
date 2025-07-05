import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, GraduationCap, Shield, Star, Search, ExternalLink } from 'lucide-react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const studentDiscounts = [
    {
      id: 1,
      brand: 'Spotify',
      discount: '50% off Premium',
      category: 'Music & Entertainment',
      description: 'Get 50% off Spotify Premium for students with valid student ID verification.',
      rating: 4.8,
      verified: true
    },
    {
      id: 2,
      brand: 'Adobe Creative Cloud',
      discount: '60% off',
      category: 'Software & Tools',
      description: 'Save 60% on Adobe Creative Cloud All Apps plan for students and teachers.',
      rating: 4.9,
      verified: true
    },
    {
      id: 3,
      brand: 'Amazon Prime',
      discount: '50% off',
      category: 'Shopping & Delivery',
      description: 'Amazon Prime Student membership at half the regular price.',
      rating: 4.7,
      verified: true
    },
    {
      id: 4,
      brand: 'Microsoft Office 365',
      discount: 'Free',
      category: 'Software & Tools',
      description: 'Free Microsoft Office 365 Education for students and educators.',
      rating: 4.6,
      verified: true
    },
    {
      id: 5,
      brand: 'Nike',
      discount: '10% off',
      category: 'Fashion & Apparel',
      description: 'Get 10% off Nike products with student verification.',
      rating: 4.5,
      verified: true
    },
    {
      id: 6,
      brand: 'Apple Music',
      discount: '50% off',
      category: 'Music & Entertainment',
      description: 'Apple Music student subscription at discounted rate.',
      rating: 4.7,
      verified: true
    }
  ]

  const filteredDiscounts = studentDiscounts.filter(discount =>
    discount.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">StudentVerify</h1>
                <p className="text-sm text-gray-600">powered by fastdiscountfinder.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Verified Discounts</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Exclusive Student Discounts
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Verify your student status and access hundreds of verified discounts from top brands
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for brands or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Discounts</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Verified Students</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">$2M+</div>
              <div className="text-gray-600">Student Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Discounts */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Featured Student Discounts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiscounts.map((discount) => (
              <Card key={discount.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{discount.brand}</CardTitle>
                      <CardDescription>{discount.category}</CardDescription>
                    </div>
                    {discount.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-blue-600">
                      {discount.discount}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {discount.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{discount.rating}</span>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Get Discount
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">
            How StudentVerify Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">1. Verify Student Status</h4>
              <p className="text-gray-600">
                Upload your student ID or enrollment documents for instant verification
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">2. Get Verified</h4>
              <p className="text-gray-600">
                Our secure verification process confirms your student status within minutes
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">3. Access Discounts</h4>
              <p className="text-gray-600">
                Browse and claim exclusive student discounts from hundreds of brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Start Saving?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students already saving with StudentVerify
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Verify Student Status
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-lg font-bold">StudentVerify</span>
              </div>
              <p className="text-gray-400 text-sm">
                powered by fastdiscountfinder.com
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Verification Help</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 StudentVerify powered by fastdiscountfinder.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

