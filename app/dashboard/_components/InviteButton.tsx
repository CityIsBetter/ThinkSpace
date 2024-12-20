import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { OrganizationProfile } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React from 'react'

export default function InviteButton() {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={'outline'}>
                <Plus className='h-4 w-4 mr-2'/>
                Invite Members
            </Button>
        </DialogTrigger>
        <DialogContent className='p-0 bg-transparent border-none max-w-[880px]'>
            <DialogTitle className='hidden'/>
            <OrganizationProfile />
        </DialogContent>
    </Dialog>
  )
}
