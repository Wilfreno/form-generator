'use client'
import ComponentLists from '@/components/main/component-lists/ComponentLists'
import FormDropZone from '@/components/main/form-dropzone/FormDropZone'

export default function Home() {
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <ComponentLists />
      <FormDropZone />
    </main>
  )
}
