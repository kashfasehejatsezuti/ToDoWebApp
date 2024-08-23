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

  return (
    <Card sx={{ maxWidth: 345, padding: "1rem" }}>
      <section>
        <h2 className="task_column_h2">{title}</h2>
        <DropArea onDrop={() => onDrop(status, 0)} />
        {filteredTasks.map((task, idx) => (
          <>
            <TaskCard
              key={task.id} // Use task.id as the key
              task={task.task}
              tags={task.tags}
              index={idx}
              handleDelete={() => handleDelete(task.id)} // Pass task.id to handleDelete
              setActiveCard={() => setActiveCard(task.id)} //Pass task.id to setActiveCard

              // setActiveCard={setActiveCard}
            />

            <DropArea onDrop={onDrop} status={status} index={idx + 1} />
          </>
        ))}
      </section>
    </Card>
  );
};

export default TaskColumn;
