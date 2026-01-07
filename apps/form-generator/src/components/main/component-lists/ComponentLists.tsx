import style from '@/components/main/component-lists/ComponentLists.module.css'
import { useComponentProvider } from '@/providers/ComponentProvider'

export default function ComponentLists() {
  const { componentsList } = useComponentProvider()
  return (
    <div className={style.base}>
      <label className={style.label} htmlFor="component-lists">
        Components
      </label>
      <ul
        className={style.list}
        id="component-lists"
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
        }}
      >
        {componentsList.map((component) => (
          <li
            key={component[1]}
            className={style.list_item}
            draggable
            onDragStart={(e) => {
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
            }}
          >
            {component[0]}
          </li>
        ))}
      </ul>
    </div>
  )
}
