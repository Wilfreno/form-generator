'use client'
import Canvas from '@/components/main/canvas/Canvas'
import ComponentLists from '@/components/main/component-lists/ComponentLists'
import { ResizableHandle, ResizablePanelGroup } from '@/components/ui/resizable'

export default function Home() {
  return (
    <main className="flex h-fit">
      <ResizablePanelGroup>
        <ComponentLists />
        <ResizableHandle className="min-h-dvh" />
        <Canvas />
      </ResizablePanelGroup>
    </main>
  )
}
