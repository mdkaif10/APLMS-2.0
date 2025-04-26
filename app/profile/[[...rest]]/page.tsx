"use client"

import { UserProfile } from "@clerk/nextjs"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h1 className="text-2xl font-bold mb-6 text-foreground">Profile Settings</h1>
            <UserProfile
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-transparent shadow-none",
                  navbar: "hidden",
                  navbarMobileMenuButton: "hidden",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 