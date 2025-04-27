import { connectToDB } from "@/lib/db"
import { ContactModel } from "@/schemas/contact"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import MessageActions from './_components/MessageActions'

async function MessagesPage() {
  await connectToDB()
  
  const messages = await ContactModel.find({}).sort({ createdAt: -1 })
  const unreadCount = await ContactModel.countDocuments({ status: 'unread' })
  const totalCount = await ContactModel.countDocuments({})

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Contact Messages</h2>
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card key={message._id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{message.subject}</CardTitle>
                    <CardDescription>
                      From: {message.name} ({message.email})
                    </CardDescription>
                  </div>
                  <Badge variant={message.status === 'unread' ? 'default' : 'secondary'}>
                    {message.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{message.message}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(message.createdAt), 'PPp')}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Reply
                    </Button>
                    <MessageActions id={message._id} status={message.status} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MessagesPage 