import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../components/firebase'; // Adjust the path based on your project structure
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const TodoList = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');

    // Fetch tasks from Firestore
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksCollection = collection(db, 'tasks');
                const taskSnapshot = await getDocs(tasksCollection);
                const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTasks(taskList);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleToggle = async (id) => {
        const task = tasks.find(task => task.id === id);
        const updatedTask = { ...task, completed: !task.completed };
        
        // Update the task in Firestore
        const taskDocRef = doc(db, 'tasks', id);
        await updateDoc(taskDocRef, { completed: updatedTask.completed });

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? updatedTask : task
            )
        );
    };

    const handleTaskClick = (link) => {
        navigate(link);
    };

    const handleAddTask = async () => {
        if (newTaskText.trim() !== '') {
            const newTask = {
                text: newTaskText,
                completed: false,
                link: `/page${tasks.length + 1}`, // Modify this for specific navigation
            };
            
            // Add the new task to Firestore
            const docRef = await addDoc(collection(db, 'tasks'), newTask);
            setTasks([...tasks, { id: docRef.id, ...newTask }]);
            setNewTaskText('');
        }
    };

    const handleDeleteTask = async (id) => {
        // Delete the task from Firestore
        await deleteDoc(doc(db, 'tasks', id));
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                        <span
                            style={{ 
                                textDecoration: task.completed ? 'line-through' : 'none', 
                                cursor: 'pointer' 
                            }}
                            onClick={() => handleTaskClick(task.link)}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => handleDeleteTask(task.id)} className="delete-button">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
