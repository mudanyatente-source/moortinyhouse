'use client'

import { useState } from 'react'
import { Mail, Phone, Clock, CheckCircle, AlertCircle, Eye, Trash2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { ConfirmationDialog } from './confirmation-dialog'

type ContactMessagesPanelProps = {
  messages: any[]
}

export default function ContactMessagesPanel({ messages: initialMessages }: ContactMessagesPanelProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createBrowserClient()
  const router = useRouter()

  const filteredMessages = messages.filter(msg => {
    const matchesFilter = filter === 'all' || msg.status === filter
    const matchesSearch = !searchTerm || 
      msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleUpdateStatus = async (id: string, status: string) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error

      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ))
      toast({
        title: 'Başarılı!',
        description: 'Mesaj durumu güncellendi.',
      })
      router.refresh()
    } catch (error) {
      console.error('[v0] Error updating status:', error)
      toast({
        title: 'Hata',
        description: 'Durum güncellenirken bir hata oluştu.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setMessageToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (!messageToDelete) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageToDelete)

      if (error) throw error

      setMessages(messages.filter(msg => msg.id !== messageToDelete))
      setDeleteConfirmOpen(false)
      setMessageToDelete(null)
      setIsDialogOpen(false)
      toast({
        title: 'Başarılı!',
        description: 'Mesaj başarıyla silindi.',
      })
      router.refresh()
    } catch (error) {
      console.error('[v0] Error deleting message:', error)
      toast({
        title: 'Hata',
        description: 'Mesaj silinirken bir hata oluştu.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium">İletişim Mesajları</h1>
          <p className="text-muted-foreground mt-1">{filteredMessages.length} mesaj</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Mesaj ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-64"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Duruma göre filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="pending">Beklemede</SelectItem>
            <SelectItem value="responded">Yanıtlandı</SelectItem>
            <SelectItem value="archived">Arşivlendi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Messages Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-start p-4 font-medium text-sm">İsim</th>
                <th className="text-start p-4 font-medium text-sm">İletişim</th>
                <th className="text-start p-4 font-medium text-sm">Tür</th>
                <th className="text-start p-4 font-medium text-sm">Model</th>
                <th className="text-start p-4 font-medium text-sm">Tarih</th>
                <th className="text-start p-4 font-medium text-sm">Durum</th>
                <th className="text-start p-4 font-medium text-sm">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr
                  key={message.id}
                  className="border-t border-border hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-medium text-accent">
                        {message.name?.charAt(0) || 'U'}
                      </div>
                      <span className="font-medium">{message.name || 'İsimsiz'}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1 text-sm">
                      {message.email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {message.email}
                        </div>
                      )}
                      {message.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {message.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className="capitalize">
                      {message.inquiry_type || 'general'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {message.interested_model || '-'}
                  </td>
                  <td className="p-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatDate(message.created_at)}
                    </div>
                  </td>
                  <td className="p-4">
                    <Select
                      value={message.status || 'pending'}
                      onValueChange={(value) => handleUpdateStatus(message.id, value)}
                      disabled={loading}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Beklemede</SelectItem>
                        <SelectItem value="responded">Yanıtlandı</SelectItem>
                        <SelectItem value="archived">Arşivlendi</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedMessage(message)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDelete}
        title="Mesajı Sil"
        description="Bu mesajı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sil"
        cancelText="İptal"
        variant="destructive"
        loading={loading}
      />

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>Mesaj Detayları</DialogTitle>
                <DialogDescription>
                  {selectedMessage.name || 'İsimsiz'} - {formatDate(selectedMessage.created_at)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">İsim</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.name || 'Yok'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">E-posta</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email || 'Yok'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Telefon</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.phone || 'Yok'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Tür</p>
                    <Badge variant="secondary">{selectedMessage.inquiry_type || 'genel'}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">İlgilenilen Model</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.interested_model || 'Yok'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Bütçe Aralığı</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.budget_range || 'Yok'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Tercih Edilen İletişim</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.preferred_contact_method || 'e-posta'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Zaman Çizelgesi</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.project_timeline || 'Yok'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Mesaj</p>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm whitespace-pre-wrap">{selectedMessage.message || 'Mesaj yok'}</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleDeleteClick(selectedMessage.id)}
                  disabled={loading}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Sil
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Kapat
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
