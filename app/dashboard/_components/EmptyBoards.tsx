"use client"
import { api } from '@/convex/_generated/api'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useOrganization } from '@clerk/nextjs'
import { UseApiMutation } from '@/hooks/UseApiMutation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function EmptyBoards() {
  const router = useRouter();
  const { organization } = useOrganization();
  const {mutate, pending} = UseApiMutation(api.board.create);

  const onClick = () => {
    if(!organization) return
    mutate({
      orgId: organization.id,
      title: "Untitled"
    })
    .then((id)=> {
      toast.success("Board Created");
      router.push(`/board/${id}`);
    })
    .catch((error)=>toast.error("Failed to create new board"))
  };

  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <Image src={'/note.svg'} alt='empty' height={110} width={110}/>
        <h2 className='text-2xl font-semibold mt-6'>Create Your First Board!</h2>
        <p className='text-muted-foreground text-sm mt-2'>Start by creating a board.</p>
        <div className="mt-6">
          <Button disabled={pending} onClick={onClick} size={'lg'}>
            Create Board
          </Button>
        </div>
    </div>
  )
}
