/* eslint-disable react/prop-types */

import Tag from "./Tag";
import "./TaskCard.css";
import CloseIcon from "@mui/icons-material/Close";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";

const TaskCard = ({ task, tags, handleDelete, setActiveCard, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "#d3621c";
      case "Progress":
        return "#0e305d";
      case "Done":
        return "#0c693f";
      default:
        return "black"; // Default color
    }
  };

  return (
    <article
      className="task_card"
      draggable="true"
      onDragStart={() => {
        setActiveCard(); // Pass the task id to setActiveCard
      }}
      onDragEnd={() => setActiveCard(null)} // Clear active card on drag end
    >
      <div className="task_text_border">
        <p className="task_text">{task}</p>
      </div>
      <div className="task_card_bottom_line">
        <div>
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>

        <div className="task_delete">
          <CloseIcon
            sx={{
              color: "#5a347a",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => handleDelete(task.id)} // Pass the task id to handleDelete
          />
        </div>
      </div>
      <div
        className="task_card_status"
        style={{ color: getStatusColor(status) }}
      >
        <DynamicFeedIcon />
        <span>{status}</span>
      </div>
    </article>
  );
};

export default TaskCard;
