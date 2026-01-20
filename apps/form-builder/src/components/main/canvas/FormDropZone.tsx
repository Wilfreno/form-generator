export default function FormDropZone() {
  return (
    <div className="p-10 grow grid gap-5 h-[200dvh]">
      <label className="text-4xl font-medium text-center " htmlFor="form-builder">
        Form Builder
      </label>
      <div
        id="form-builder"
        className="border-dashed border border-muted-foreground min-h-[20dvh] rounded grid"
        onDragOver={(e) => {
          e.preventDefault()

          console.log('hello ')
        }}
        onDrop={() => {
          console.log('hello world')
        }}
      >
        <div draggable className="place-self-center border p-2 rounded-sm bg-blue-300 ">
          Drag & Drop Components here
        </div>
      </div>
    </div>
  )
}
