'use client'
import Canvas from '@/components/main/canvas/Canvas'
import ComponentLists from '@/components/main/component-lists/ComponentLists'

export default function Home() {
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <ComponentLists />
      <Canvas />
    </main>
  )
}
