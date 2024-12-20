import React from 'react'
import { NewButton } from './NewButton'
import { List } from './list'

export default function Sidebar() {
  return (
    <aside className='fixed z-[1] left-0 bg-[#333] h-full w-[60px] flex p-3 flex-col gap-y-4 text-black'>
      <List />
      <NewButton />
    </aside>
  )
}
