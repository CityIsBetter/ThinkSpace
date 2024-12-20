import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
      <Button>
        <Link href={'/dashboard'}>
          Dashboard
        </Link>
      </Button>
    </div>
  )
}
