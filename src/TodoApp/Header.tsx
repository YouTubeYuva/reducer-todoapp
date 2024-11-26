import "./header.css";

interface Props {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allCompleted: boolean;
}

export const Header = (props: Props) => {
    const { value, handleChange, handleKeyPress, handleSelectAll, allCompleted }= props
  return (
    <div className="header">
      <h1>todos</h1>
      <div className="div_input">
        <input
          className="check"
          type="checkbox"
          onChange={handleSelectAll}
          checked={allCompleted}
        />
        <div>
          <input
            type="text"
            value={value}
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            placeholder="What needs to be done?"
          />
        </div>
      </div>
    </div>
  );
};
