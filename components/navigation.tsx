"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { User, LogOut, Settings, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserButton, useUser, useClerk } from "@clerk/nextjs"

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { isSignedIn } = useUser()
  const { signOut } = useClerk()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 border-b shadow-md backdrop-blur-md rounded-b-xl transition-all">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-700 dark:text-blue-400">
          APLMS
        </Link>
        <nav className="hidden md:flex space-x-10">
          <Link 
            href="/#features" 
            onClick={(e) => handleScroll(e, "features")}
            className={cn(
              "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200",
              pathname === "/" && "text-blue-700 dark:text-blue-400"
            )}
          >
            Features
          </Link>
          <Link 
            href="/#how-it-works" 
            onClick={(e) => handleScroll(e, "how-it-works")}
            className={cn(
              "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200",
              pathname === "/" && "text-blue-700 dark:text-blue-400"
            )}
          >
            How It Works
          </Link>
          <Link 
            href="/about" 
            className={cn(
              "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200",
              pathname === "/about" && "text-blue-700 dark:text-blue-400"
            )}
          >
            About & Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
             <>
             <Link
               href="/mybookings"
               className={cn(
                 "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200",
                 pathname === "/mybookings" && "text-blue-700 dark:text-blue-400"
               )}
             >
                My Bookings
              </Link>
              <Link 
                href="/dashboard" 
                className={cn(
                  "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200",
                  pathname === "/dashboard" && "text-blue-700 dark:text-blue-400"
                )}
              >
                Admin
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <UserButton afterSignOutUrl="/" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Profile</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Manage your account
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/security" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Security</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link 
                href="/sign-in" 
                className={cn(
                  "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200",
                  pathname === "/sign-in" && "text-blue-700 dark:text-blue-400"
                )}
              >
                Sign In
              </Link>
              <Button asChild className="bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md px-4 py-2">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 