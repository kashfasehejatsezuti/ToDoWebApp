/* eslint-disable react/prop-types */
import { useState } from "react";
import "./DropArea.css";

const DropArea = ({ onDrop, status, index }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      className={showDrop ? "drop_area" : "drop_hide"}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        // e.preventDefault(); // Prevent the default browser behavior
        // console.log(
        //   "Dropped on area with index:",
        //   index,
        //   "and status:",
        //   status
        // );
        onDrop(status, index); // Pass both status and index
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()} // Allow drop by preventing default behavior
    >
      <h4>Drop Here</h4>
    </section>
  );
};

export default DropArea;
