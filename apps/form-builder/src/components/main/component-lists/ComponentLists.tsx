'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useComponentProvider } from '@/providers/ComponentProvider'
import { ChevronDown, ChevronRight, FlaskConical } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ComponentLists() {
  const { components_list, setDraggedComponent } = useComponentProvider()
  return (
    <div className="fixed grid gap-1  bg-red-700">
      <label
        className="text-center border-b p-5 font-medium text-lg"
        htmlFor="component-lists"
      >
        Components
      </label>
      {Array.from(Object.entries(components_list)).map(([group_name, entries]) => {
        const [open, setOpen] = useState(false)

        return (
          <Collapsible key={group_name} open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger className="flex  w-full p-2 justify-between group cursor-pointer">
              <span> {group_name}</span>
              <span className="aspect-square h-1px w-auto group-hover:bg-muted rounded-md">
                {open ? (
                  <ChevronDown className="h-full w-full" />
                ) : (
                  <ChevronRight className="h-full w-full" />
                )}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul
                className="p-2"
                id="component-lists"
                onDragOver={(e) => {
                  e.preventDefault()
                }}
              >
                {entries.map((entry, index) => {
                  const [is_grabbing, setIsGrabbing] = useState(false)

                  const style =
                    'text-center text-primary/80 text-sm font-medium border rounded p-2 border-primary/40'
                  return (
                    <li
                      key={entry}
                      className={style}
                      draggable
                      onDragStart={(e) => {
                        // custom drag component
                        e.dataTransfer.effectAllowed = 'move'
                        const clone = e.currentTarget.cloneNode(true) as HTMLElement
                        clone.style.opacity = '1'
                        clone.style.position = 'absolute'
                        clone.style.top = '-1000px'
                        clone.style.width = '10dvw'
                        clone.style.cursor = 'grabbing'
                        document.body.appendChild(clone)

                        e.dataTransfer.setDragImage(clone, 0, 0)

                        setTimeout(() => document.body.removeChild(clone), 0)

                        setIsGrabbing(true)
                        setDraggedComponent({
                          group: group_name as keyof typeof components_list,
                          index,
                        })
                      }}
                      onDragEnd={(e) => {
                        setIsGrabbing(false)

                        setDraggedComponent(undefined)
                      }}
                    >
                      {entry}
                    </li>
                  )
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )
      })}
      <Link
        href="/test/component-settings-ui"
        className="hover:bg-secondary rounded-full p-2 justify-self-end"
      >
        <FlaskConical className="aspect-square h-5 w-auto" />
      </Link>
    </div>
  )
}
