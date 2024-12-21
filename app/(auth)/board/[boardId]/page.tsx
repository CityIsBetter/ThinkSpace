import React from 'react'
import Canvas from './_components/Canvas'
import { Room } from '@/components/Room';
import { Loading } from './_components/Loading';

interface BoardProps {
    params: {
        boardId: string;
    }
}

const DotGrid = () => (
  <div className="absolute inset-0 overflow-hidden bg-neutral-100">
    {/* Bottom fade gradient only */}
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1" fill="#3e3e3e" opacity="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  </div>
);

export default function page({params}:BoardProps) {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId}/>
      <DotGrid />
    </Room>
  )
}
