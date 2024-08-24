import { v4 as uuidv4 } from "uuid"; // Make sure to install uuid with npm install uuid
import "./TaskForm.css";
import "./Tag";
import Tag from "./Tag";
import { useState } from "react";

const TaskForm = (propType) => {
  const [taskData, setTaskData] = useState({
    id: uuidv4(), // Generate a unique ID for each task
    task: "",
    status: "To Do",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    propType.setTasks((prev) => {
      return [...prev, taskData];
    });

    // Reset task data and regenerate the ID for the next task
    setTaskData({ id: uuidv4(), task: "", status: "To Do", tags: [] });
  };

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (checkTag(tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter Your Task"
          onChange={handleChange}
        />
        <div className="task_form_bottom_line">
          <div>
            <Tag
              tagName="Frontend"
              selectTag={selectTag}
              selected={checkTag("Frontend")}
            />
            <Tag
              tagName="Backend"
              selectTag={selectTag}
              selected={checkTag("Backend")}
            />
            <Tag
              tagName="FullStack"
              selectTag={selectTag}
              selected={checkTag("FullStack")}
            />
            <Tag
              tagName="DevOps"
              selectTag={selectTag}
              selected={checkTag("DevOps")}
            />
            <Tag
              tagName="DataBase"
              selectTag={selectTag}
              selected={checkTag("DataBase")}
            />
          </div>

          <div>
            <select
              className="task_status"
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="To Do">To Do</option>
              <option value="Progress">Progress</option>
              <option value="Done">Done</option>
            </select>
            <button type="submit" className="task_submit">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
