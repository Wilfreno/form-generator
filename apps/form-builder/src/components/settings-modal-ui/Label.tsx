import { useState } from "react"
import { Label as UILabel } from '@/components/ui/label'
import { Input } from "../ui/input"
export default function Label() {
  const [input_label, setInputLabel] = useState("")

  return (
    <div>
      <UILabel htmlFor="">Label</UILabel>
      <Input />
    </div>
  )
}
