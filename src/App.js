import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { Tasks } from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";


function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  // Traemos la data del "npm run server" que esta en el puerto 5000
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


  // Con esta funcion async traigo la data del backend
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Con esta funcion le mando el id a toggle reminder
  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Agregar tarea
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`,
      {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(task),
      }
    )
    
    // Como es una promesa uso el await
    const data = await res.json()

    setTasks([...tasks, data])
    
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  // Borrar tarea (task)
  // Filtro todas las tareas menos la del id que le mando con el click en el boton
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    
    setTasks(tasks.filter((task) => task.id !== id))
  }

  /**
   * Recordatorio, si se le hace dobleclick envia el id como parametro
   * Recorre todas las tareas devolviendo intactas las que no coincide el id
   * Si es la tarea la la traigo con todos sus atributos y le cambio el reminder por el opuesto
   */
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    // Se le cambia la propiedad reminder al objeto tarea traido con su id
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}
    // Creo la respuesta hacuendo PUT (ACTUALIZACION) y le mando la task actualizada
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PUT',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(updatedTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? 
        { ...task,  reminder: data.reminder } : task
      ))
  }


  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={ showAddTask } 
            
        />

        <Route
          path='/' 
          exact 
          render = {(props) => (
            <>
              
              {showAddTask && <AddTask onAdd={addTask} />}

              {
                tasks.length > 0 ? (
                  <Tasks 
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />)
                  : 'No task to show'
              }

            </>
          )
        }
        
        />


        <Route path='/about' component={About} />
        <Footer /> 

      </div>
    </Router>
  );
}

export default App;
