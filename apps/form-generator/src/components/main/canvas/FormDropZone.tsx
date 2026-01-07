import style from '@/components/main/canvas/FormDropZone.module.css'

export default function FormDropZone() {
  return (
    <div className={style.base}>
      <label className={style.label} htmlFor="form-builder">
        Form Builder
      </label>
      <div id="form-builder" className={style.form_builder}>
        <div draggable className={style.empty_form}>Drag & Drop Components here</div>
      </div>
    </div>
  )
}
