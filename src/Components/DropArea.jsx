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
        onDrop(status, index);
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <h4> Drop Here</h4>
    </section>
  );
};

export default DropArea;
