// import Tag from "./Tag";
// import "./TaskCard.css";
// import CloseIcon from "@mui/icons-material/Close";

// const TaskCard = (propsType) => {
//   return (
//     <article className="task_card">
//       <p className="task_text">This is a testing</p>
//       <div className="task_card_bottom_line">
//         <div className="task_card_tags">
//           {propsType.tags.map((tag, index) => (
//             <Tag key={index} tagname={propsType.ag} />
//           ))}
//         </div>
//         <div className="task_delete">
//           <CloseIcon
//             sx={{
//               color: "#fff",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               cursor: "pointer",
//               transition: "all 0.3s ease-in-out",
//             }}
//           />
//         </div>
//       </div>
//     </article>
//   );
// };

// export default TaskCard;
import Tag from "./Tag";

import "./TaskCard.css";

import CloseIcon from "@mui/icons-material/Close";
// eslint-disable-next-line react/prop-types
const TaskCard = ({ task, tags = [], handleDelete, index }) => {
  return (
  
      <article className="task_card">
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
              onClick={() => handleDelete(index)}
            />
          </div>
        </div>
      </article>
  );
};

export default TaskCard;
