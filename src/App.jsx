/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import "./App.css";
import TaskColumn from "./Components/TaskColumn";
import TaskForm from "./Components/TaskForm";
// import Card from "@mui/material/Card";

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
      "Drop event received with index:",
      position,
      "and status:",
      status
    );

    setTasks((prevTasks) => {
      // Step 1: Find the index of the dragged task
      const draggedTaskIndex = prevTasks.findIndex(
        (task) => task.id === activeCard
      );

      if (draggedTaskIndex === -1) {
        console.error("Dragged task not found.");
        return prevTasks; // Return the previous state if the task is not found
      }

      // Step 2: Get the dragged task
      const draggedTask = prevTasks[draggedTaskIndex];
      console.log("Dragged Task:", draggedTask);

      // Step 3: Remove the dragged task from its original position
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(draggedTaskIndex, 1);
      console.log("Task list after removing dragged task:", updatedTasks);

      // Step 4: Update the status of the dragged task to the new column
      draggedTask.status = status;

      // Step 5: Filter tasks to identify the correct position in the target column
      const filteredTasks = updatedTasks.filter(
        (task) => task.status === status
      );

      // Ensure the position is within the correct bounds
      const targetPosition = Math.min(position, filteredTasks.length);
      console.log("Inserting dragged task at position:", targetPosition);

      // Step 6: Insert the dragged task at the calculated position
      updatedTasks.splice(
        // Calculate the actual index in the full task list
        updatedTasks.findIndex((task) => task.status === status) +
          targetPosition,
        0,
        draggedTask
      );
      console.log("Final updated task list:", updatedTasks);

      return updatedTasks;
    });

    setActiveCard(null); // Clear the active card after the drop operation is complete
  };
  // console.log("tasks", tasks); // Debugging line

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />

      <main className="app_main">
        {/* <Card
          sx={{
            padding: "18px 4%",
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            borderTop: "1.5px solid #dedede",
            textAlign: "center",
          }}
        > */}
        <TaskColumn
          title="To Do"
          tasks={tasks}
          status="To Do"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks}
          status="Progress"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Done"
          tasks={tasks}
          status="Done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        {/* </Card> */}
      </main>
      <h2>{activeCard}</h2>
    </div>
  );
};

export default App;
