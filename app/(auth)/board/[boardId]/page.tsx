import React from 'react'
import Canvas from './_components/Canvas'
import { Room } from '@/components/Room';
import { Loading } from './_components/Loading';

interface BoardProps {
    params: {
        boardId: string;
    }
}

export default function page({params}:BoardProps) {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId}/>
    </Room>
  )
}
