"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { 
  Home, 
  LayoutGrid, 
  Bell, 
  Clock, 
  LogOut, 
  Sun, 
  Moon 
} from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navigation = [
    { name: 'Home', href: '/', icon: Home, current: pathname === '/' },
    { name: 'Workflows', href: '/workflows', icon: LayoutGrid, current: pathname === '/workflows' },
    { name: 'Notifications', href: '#', icon: Bell, current: false },
    { name: 'Gallery', href: '/gallery', icon: Clock, current: pathname === '/gallery' },
  ]

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarExpanded ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col bg-card border-r`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {/* User Profile */}
        <div className={`p-6 flex items-center gap-3 mb-8 ${isSidebarExpanded ? '' : 'justify-center'}`}>
          <Avatar className="w-10 h-10">
            <AvatarImage src="/logo.png" alt="Profile" />
            <AvatarFallback>LX</AvatarFallback>
          </Avatar>
          {isSidebarExpanded && (
            <div>
              <h2 className="text-sm font-medium">LUXE</h2>
              <p className="text-xs text-muted-foreground">amine@publicis.com</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={item.current ? "secondary" : "ghost"}
                className={`w-full justify-start ${isSidebarExpanded ? '' : 'px-2'}`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarExpanded && <span className="ml-3">{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full justify-start ${isSidebarExpanded ? '' : 'px-2'}`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-3">Logout</span>}
          </Button>
          
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className={`w-full justify-start ${isSidebarExpanded ? '' : 'px-2'}`}
          >
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            {isSidebarExpanded && (
              <>
                <span className="ml-3">{theme === 'dark' ? 'Dark' : 'Light'} mode</span>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                  className="ml-auto"
                />
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}