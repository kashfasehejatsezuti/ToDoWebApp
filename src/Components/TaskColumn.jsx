/* eslint-disable react/prop-types */
import DropArea from "./DropArea";
import TaskCard from "./TaskCard";
import Card from "@mui/material/Card";
import "./TaskColumn.css";

const TaskColumn = ({
  title,
  tasks = [],
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  console.log("Filtered tasks:", filteredTasks);

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "#d3621c";
      case "In Progress":
        return "#0e305d";
      case "Done":
        return "#0c693f";
      default:
        return "black"; // Default color
    }
  };


  return (
    <Card
      sx={{
        width: "20rem",
        padding: "1rem",
        textAlign: "center",
        backgroundColor: "#dedede",
        color: getStatusColor(title),
      }}
    >
      <section>
        <h2>{title}</h2>

        {/* Initial Drop Area for adding to the top */}
        <DropArea
          status={status} // Pass status to DropArea
          index={0} // Index for the initial drop area
          onDrop={onDrop}
        />

        {filteredTasks.map((task, idx) => {
          // Console log to see the values of idx and task
          console.log("Index (idx):", idx);
          console.log("Task:", task);

          return (
            <div key={task.id}>
              {" "}
              {/* Make sure each task has a unique key */}
              <TaskCard
                task={task.task}
                tags={task.tags}
                status={task.status}
                index={idx}
                handleDelete={() => handleDelete(task.id)}
                setActiveCard={() => setActiveCard(task.id)} // Store the current task ID as the active card
              />
              {/* Drop Area after each task */}
              <DropArea
                status={status} // Pass status to DropArea
                index={idx + 1} // Pass index for the drop area after each task
                onDrop={onDrop}
              />
            </div>
          );
        })}
      </section>
    </Card>
  );
};

export default TaskColumn;
