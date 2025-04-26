"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Users, Shield, Clock, Zap } from "lucide-react"

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Message sent successfully! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* About Section */}
      <div className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-6 text-foreground">About APLMS</h1>
            <p className="text-muted-foreground text-lg">
              Revolutionizing parking management with innovative solutions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Story</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    APLMS (Advanced Parking Lot Management System) was founded with a simple mission: to revolutionize the way people find and manage parking spaces. 
                    We understand the frustration of searching for parking spots and the time wasted in the process. Our platform was created to make parking 
                    management seamless, efficient, and stress-free for both parking lot owners and users.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We are committed to providing innovative solutions that transform the parking experience. Our goal is to:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 text-primary mt-1">
                        <Users className="w-5 h-5" />
                      </span>
                      <span className="ml-3 text-muted-foreground">Simplify parking management for lot owners</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 text-primary mt-1">
                        <Clock className="w-5 h-5" />
                      </span>
                      <span className="ml-3 text-muted-foreground">Reduce time spent searching for parking spots</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 text-primary mt-1">
                        <Zap className="w-5 h-5" />
                      </span>
                      <span className="ml-3 text-muted-foreground">Optimize parking space utilization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 text-primary mt-1">
                        <Shield className="w-5 h-5" />
                      </span>
                      <span className="ml-3 text-muted-foreground">Ensure secure and convenient payment options</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-foreground">Why Choose Us</h2>
                  <div className="space-y-6">
                    <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">Advanced Technology</h3>
                      <p className="text-muted-foreground">
                        We utilize cutting-edge technology to provide real-time parking solutions and seamless user experiences.
                      </p>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">User-Friendly Platform</h3>
                      <p className="text-muted-foreground">
                        Our intuitive interface makes it easy for anyone to find and book parking spaces within minutes.
                      </p>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">24/7 Support</h3>
                      <p className="text-muted-foreground">
                        Our dedicated support team is always ready to assist you with any questions or concerns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-6 text-foreground">Contact Us</h1>
              <p className="text-muted-foreground text-lg">
                Have questions? We're here to help!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-foreground">Get in Touch</h2>
                  <p className="text-muted-foreground mb-6">
                    Have questions about our parking management solutions? We're here to help! 
                    Fill out the form and we'll get back to you as soon as possible.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">support@aplms.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <p className="text-muted-foreground">
                        123 Parking Street<br />
                        Suite 100<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      className="min-h-[150px] bg-background"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 