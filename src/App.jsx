// // import React from "react";
// import { useState } from "react";
// import "./App.css";
// import TaskColumn from "./Components/TaskColumn";
// import TaskForm from "./Components/TaskForm";

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   // console.log("task", tasks);
//   return (
//     <div className="app">
//       <TaskForm setTasks={setTasks} />
//       <main className="app_main">
//         <TaskColumn value="TO DO" tasks={tasks} status="todo" />
//         <TaskColumn value="Progress" />
//         <TaskColumn value="Done" />
//       </main>
//     </div>
//   );
// };

// export default App;
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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
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
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks}
          status="progress"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="Done"
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default App;
