import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Palette, Settings, Video } from "lucide-react"
import Link from "next/link"

export default function WorkflowsPage() {
  const workflows = [
    {
      id: 'prompt-image',
      title: 'PROMPT & IMAGE IT',
      icon: Brain,
      hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-950/20',
      iconColor: 'text-blue-500',
      badge: null
    },
    {
      id: 'stylize-it',
      title: 'STYLIZE IT',
      icon: Palette,
      hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-950/20',
      iconColor: 'text-purple-500',
      badge: 'BETA'
    },
    {
      id: 'tweak-it',
      title: 'TWEAK IT',
      icon: Settings,
      hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-950/20',
      iconColor: 'text-orange-500',
      badge: 'NEW'
    },
    {
      id: 'video-it',
      title: 'VIDEO IT',
      icon: Video,
      hoverColor: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/20',
      iconColor: 'text-emerald-500',
      badge: 'NEW'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Workflows</h1>
        <p className="text-muted-foreground">Create and manage your AI image generation workflows</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <Link key={workflow.id} href={`/${workflow.id}`}>
            <Card className={`relative group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${workflow.hoverColor}`}>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                {workflow.badge && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 right-4 text-xs"
                  >
                    {workflow.badge}
                  </Badge>
                )}
                
                <workflow.icon className={`w-20 h-20 mb-6 transition-colors duration-300 ${workflow.iconColor} group-hover:scale-110`} />
                
                <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${workflow.iconColor}`}>
                  {workflow.title}
                </h3>
                
                <Button 
                  variant="outline" 
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
  )
}