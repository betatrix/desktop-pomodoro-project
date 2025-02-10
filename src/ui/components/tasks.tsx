import { useState } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const startEditing = (index: number) => {
        setIsEditing(true);
        setNewTask(tasks[index]);
        setEditIndex(index);
    };

    const saveEdit = () => {
        if (editIndex !== null && newTask.trim() !== "") {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = newTask;

            setTasks(updatedTasks);
            setIsEditing(false);
            setNewTask("");
            setEditIndex(null);
        }
    };

    return (
        <>
            <h2>Minhas Tarefas</h2>
            <input
                type="text"
                value={isEditing ? "" : newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Digite uma nova tarefa"
            />
            <button onClick={addTask}>"Adicionar"</button>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                    {isEditing && editIndex === index ? (
                        <input 
                        type="text" 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Edite o nome da sua tarefa"
                        />
                    ) : (
                        <p>{task}</p>
                    )}
                    
                    {isEditing && editIndex === index ? (
                        <button onClick={saveEdit}>💾</button>
                    ) : (
                        <button onClick={() => startEditing(index)}>✏️</button>
                    )}

                    <button onClick={() => removeTask(index)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Tasks;