/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import "./App.css";
import TaskColumn from "./Components/TaskColumn";
import TaskForm from "./Components/TaskForm";

const App = () => {
  const loadTasks = () => {
    const oldTasksFromStorage = localStorage.getItem("tasks");
    try {
      return oldTasksFromStorage ? JSON.parse(oldTasksFromStorage) : [];
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
      return []; // Return an empty array if parsing fails
    }
  };

  const [tasks, setTasks] = useState(loadTasks);
  // eslint-disable-next-line no-unused-vars
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };
  // eslint-disable-next-line no-unused-vars
  const onDrop = (status, position) => {
    console.log(
      `${activeCard}is going to place ${status} and the position ${position}`
    );
    if (activeCard) {
      setTasks((prevTasks) => {
        const draggedTaskIndex = prevTasks.findIndex(
          (task) => task.id === activeCard
        );
        const draggedTask = prevTasks[draggedTaskIndex];

        // Remove the task from its current position
        const updatedTasks = [...prevTasks];
        updatedTasks.splice(draggedTaskIndex, 1);

        // Update the task's status
        draggedTask.status = status;
        // Insert the task into the new position
        if (position >= updatedTasks.length) {
          updatedTasks.push(draggedTask);
        } else {
          updatedTasks.splice(position, 0, draggedTask);
        }

        return updatedTasks;
      });
      setActiveCard(null); // Reset activeCard after the drop action
    } else {
      console.log("No active card to drop.");
    }
  };

  console.log("tasks", tasks); // Debugging line

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="TO DO"
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks}
          status="progress"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Done"
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </main>
    </div>
  );
};

export default App;
