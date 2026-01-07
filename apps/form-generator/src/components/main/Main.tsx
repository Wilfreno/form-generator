import style from '@/components/main/Main.module.css'
import Canvas from './canvas/Canvas'
import ComponentLists from './component-lists/ComponentLists'
export default function Main() {
  return (
    <main className={style.main}>
      <ComponentLists />
      <Canvas />
    </main>
  )
}
