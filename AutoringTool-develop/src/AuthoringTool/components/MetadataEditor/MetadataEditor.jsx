
const MetadataEditor = ({form,onFormUpdate}) => {

  return (
    <form className="mb-3">
        <div className="form-group mb-3">
            <label> <b>Author:</b> </label>
            <input onChange={onFormUpdate} type="text" name="autor" className="form-control" placeholder="Author" value={form.autor}/>
         </div>

         <div className="form-group mb-3">
            <label> <b>Organization:</b> </label>
            <input onChange={onFormUpdate} type="text" name="organizacion" className="form-control" placeholder="Organization" value={form.organizacion}/>
         </div>

         <div className="form-group mb-3">
            <label> <b>Title:</b> </label>
            <input onChange={onFormUpdate} type="text" name="titulo" className="form-control" placeholder="Title" value={form.titulo}/>
         </div>

        <div className="form-group d-flex flex-row">
            <label className="d-block me-3 pt-1"> <b>Total points:</b> </label>
            <input onChange={onFormUpdate} type="number" name="puntaje_total" className="form-control w-25 small" min={0} max={100} value={form.puntaje_total} />
        </div>
    </form>
  )
}

export default MetadataEditor