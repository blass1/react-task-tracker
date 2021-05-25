import {useState} from 'react';

export const AddTask = ({onAdd}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        // No se recargue la pagina en el submit
        e.preventDefault()

        if(!text) {
            alert('Porfavor agregue una tarea')
            return
        }

        onAdd({ text, day, reminder })

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            
            <div className='form-control'>
                <label>Tarea</label>
                <input type='text' placeholder='Agregar tarea'
                value={text} onChange={(e) => setText(e.target.value)}
                />
            </div>
            
            <div className='form-control'>
                <label>Día & Hora</label>
                <input type='text' placeholder='Agregar Day & Time'
                value={day} onChange={(e) => setDay(e.target.value)}
                />
            </div>
            
            <div className='form-control form-control-check'>
                <label>Agregar Recordatorio</label>
                <input type='checkbox'
                checked={reminder}
                value={reminder} 
                onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>

            <input type='submit' value='Grabar tarea'
            className='btn btn-block'/>
        </form>
    )
}

export default AddTask
