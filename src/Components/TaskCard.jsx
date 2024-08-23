/* eslint-disable react/prop-types */

import Tag from "./Tag";
import "./TaskCard.css";
import CloseIcon from "@mui/icons-material/Close";

const TaskCard = ({ task = [], tags = [], handleDelete, setActiveCard }) => {
  return (
    <article
      className="task_card"
      draggable="true"
      onDragStart={() => {
        setActiveCard(task.id);
      }}
      onDragCapture={() => setActiveCard(null)}
    >
      <div className="task_text_border">
        <p className="task_text">{task}</p>
      </div>
      <div className="task_card_bottom_line">
        <div className="task_card_tags">
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
            onClick={() => handleDelete(task.id)}
          />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
