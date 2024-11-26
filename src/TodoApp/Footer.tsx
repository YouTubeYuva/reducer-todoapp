import "./footer.css"

interface Props {
  length: number;
  handleClick: (option: "all" | "active" | "completed") => void;
  ClearCompleted: () => void;
}

export const Footer = (props: Props) => {
    const { length, handleClick, ClearCompleted } = props;
  return (
    <div className="footer">
      <span className="todo-count">{length} items left</span>
      <button className="todo-all" onClick={() => handleClick("all")}>
        All
      </button>
      <button className="todo-active" onClick={() => handleClick("active")}>
        Active
      </button>
      <button className="todo-completed" onClick={() => handleClick("completed")}>
        Completed
      </button>
      <button className="todo-clear-completed" onClick={ClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
};
