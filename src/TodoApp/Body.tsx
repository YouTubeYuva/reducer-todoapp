import _ from "lodash";
import { Data } from "./TodoApp";
import "./body.css"

interface Props {
    filteredData: Data[];
    handleCheckbox: (id: number) => void;
    handleRemove: (id: number) => void;
}

export const Body = (props: Props) => {
  const { filteredData, handleCheckbox, handleRemove } = props;
  return (
    <div className="body">
      {_.map(filteredData,(item) => (
        <div key={item.id} className="todo-item">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleCheckbox(item.id)}
          />
          <span>{item.value}</span>
          <button className="todo-remove" onClick={() => handleRemove(item.id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};
