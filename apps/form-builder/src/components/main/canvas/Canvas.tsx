'use client'
import { ResizablePanel } from '@/components/ui/resizable'
import FormPreview from './FormDropZone'

export default function Canvas() {
  return (
    <ResizablePanel>
      <FormPreview />
    </ResizablePanel>
  )
}
