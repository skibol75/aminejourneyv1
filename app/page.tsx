"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Brain, Palette, Settings, Video, Wand2, X } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [showChangelog, setShowChangelog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Show changelog modal on first visit
    const hasSeenChangelog = localStorage.getItem('hasSeenChangelog_v1.0')
    if (!hasSeenChangelog) {
      setShowChangelog(true)
    }
  }, [])

  const handleCloseChangelog = () => {
    setShowChangelog(false)
    localStorage.setItem('hasSeenChangelog_v1.0', 'true')
  }

  const workflows = [
    {
      id: 'prompt-image',
      title: 'PROMPT & IMAGE IT',
      icon: Brain,
      color: 'from-blue-400 to-cyan-400',
      hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-950/20',
      iconColor: 'text-blue-500',
      badge: null
    },
    {
      id: 'stylize-it',
      title: 'STYLIZE IT',
      icon: Palette,
      color: 'from-purple-400 to-pink-400',
      hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-950/20',
      iconColor: 'text-purple-500',
      badge: 'BETA'
    },
    {
      id: 'tweak-it',
      title: 'TWEAK IT',
      icon: Settings,
      color: 'from-orange-400 to-red-400',
      hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-950/20',
      iconColor: 'text-orange-500',
      badge: 'NEW'
    },
    {
      id: 'video-it',
      title: 'VIDEO IT',
      icon: Video,
      color: 'from-emerald-400 to-teal-400',
      hoverColor: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/20',
      iconColor: 'text-emerald-500',
      badge: 'NEW'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Hello Amine,<br />Choose your creative journey
            </h1>
            <Wand2 className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflows.map((workflow) => (
            <Link key={workflow.id} href={`/${workflow.id}`}>
              <Card className={`relative group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${workflow.hoverColor} aspect-square`}>
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  {workflow.badge && (
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 right-4 text-xs"
                    >
                      {workflow.badge}
                    </Badge>
                  )}
                  
                  <workflow.icon className={`w-16 h-16 mb-6 transition-colors duration-300 ${workflow.iconColor} group-hover:scale-110`} />
                  
                  <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${workflow.iconColor}`}>
                    {workflow.title}
                  </h3>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`transition-colors duration-300 group-hover:border-current ${workflow.iconColor}`}
                  >
                    TRY IT
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Changelog Modal */}
      <Dialog open={showChangelog} onOpenChange={setShowChangelog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              AMINEJOURNEY
              <Badge variant="secondary" className="text-xs">v1.0 alpha</Badge>
            </DialogTitle>
            <DialogDescription>
              changelog v 1.0
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground mt-0.5">•</span>
              <div>
                <span>new update includes style transfer so you can copy the style of an image</span>
                <span className="ml-2 font-semibold text-foreground">see Tutorial Part</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground mt-0.5">•</span>
              <span>you can now choose between different categories</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground mt-0.5">•</span>
              <span>We added a Tutorial Part to help you with every workflow</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground mt-0.5">•</span>
              <span>New TWEAK IT workflow for precise image editing</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground mt-0.5">•</span>
              <span>New VIDEO IT workflow for image-to-video generation</span>
            </div>
          </div>

          <Button onClick={handleCloseChangelog} className="w-full mt-6">
            Got it!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}