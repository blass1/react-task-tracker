import Task from './Task'

export const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
            {
                tasks.map((task, index) => (
                    <Task key={/*task.id*/index} task={task} 
                    onDelete={onDelete} onToggle={onToggle} />
                ))
            }    
        </>
    )
}
