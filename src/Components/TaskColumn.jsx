import TaskCard from "./TaskCard";
import Card from "@mui/material/Card";
// eslint-disable-next-line react/prop-types
const TaskColumn = ({ title, tasks = [], status, handleDelete }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <Card sx={{ maxWidth: 345, padding: "1rem" }}>
      <section className="task_column">
        <h2>{title}</h2>

        {filteredTasks.map((task) => (
          <>
            <TaskCard
              key={task.id} // Use task.id as the key
              task={task.task}
              tags={task.tags}
              handleDelete={() => handleDelete(task.id)} // Pass task.id to handleDelete
            />
          </>
        ))}
      </section>
    </Card>
  );
};

export default TaskColumn;

// export default TaskColumn;
// import TaskCard from "./TaskCard";
// const TaskColumn = (propsType) => {
//   return (
//     <section className="task_coloumn">
//       <h2>{propsType.title}</h2>

//       {propsType.tasks.map(
//         (task, index) =>
//           task.status === status && (
//             <TaskCard key={index} title={task.task} tags={task.tags} />
//           )
//       )}
//     </section>
//   );
// };

// export default TaskColumn;
