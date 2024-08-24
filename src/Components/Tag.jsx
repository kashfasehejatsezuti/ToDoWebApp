import "./Tag.css";

const Tag = (propType) => {
  const tagStyle = {
    Frontend: { backgroundColor: "#fdca21", color: "#fff" },
    Backend: { backgroundColor: "#255bad", color: "#fff" },
    FullStack: { backgroundColor: "#e74951", color: "#fff" },
    DevOps: { backgroundColor: "#0b714c", color: "#fff" },
    DataBase: { backgroundColor: "#536c9d", color: "#fff" },
    default: { backgroundColor: "#f9f9f9" },
  };
  return (
    <button
      type="button"
      className="tag"
      style={propType.selected ? tagStyle[propType.tagName] : tagStyle.default}
      onClick={() => propType.selectTag(propType.tagName)}
    >
      {propType.tagName}
    </button>
  );
};

export default Tag;
