import React, { useReducer } from "react";
import _ from "lodash";
import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";
import "./td.css";

export interface Data {
  id: number;
  value: string;
  completed: boolean;
}

type Todo = "all" | "active" | "completed";

interface State {
  value: string;
  data: Data[];
  filter: Todo;
}

type Action =
  | { type: "SET_VALUE"; value: string }
  | { type: "ADD_TODO"; value: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "REMOVE_TODO"; id: number }
  | { type: "SET_FILTER"; option: Todo }
  | { type: "SELECT_ALL"; completed: boolean }
  | { type: "CLEAR_COMPLETED" };

const initialState: State = {
  value: "",
  data: [],
  filter: "all",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.value };

    case "ADD_TODO":
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: Math.random(),
            value: action.value.trim(),
            completed: false,
          },
        ],
        value: "",
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        data: _.map(state.data, (item) =>
          item.id === action.id ? { ...item, completed: !item.completed } : item
        ),
      };

    case "REMOVE_TODO":
      return {
        ...state,
        data: _.filter(state.data, (item) => item.id !== action.id),
      };

    case "SET_FILTER":
      return { ...state, filter: action.option };

    case "SELECT_ALL":
      return {
        ...state,
        data: _.map(state.data, (item) => ({
          ...item,
          completed: action.completed,
        })),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        data: _.filter(state.data, (item) => !item.completed),
      };

    default:
      return state;
  }
}

export const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_VALUE", value: event.target.value });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && state.value.trim()) {
      event.preventDefault();
      dispatch({ type: "ADD_TODO", value: state.value });
    }
  };

  const handleCheckbox = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const handleClick = (option: Todo) => {
    dispatch({ type: "SET_FILTER", option });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SELECT_ALL", completed: event.target.checked });
  };

  const filteredData = (() => {
    if (state.filter === "active") {
      return _.filter(state.data, (item) => !item.completed);
    } else if (state.filter === "completed") {
      return _.filter(state.data, (item) => item.completed);
    } else {
      return state.data;
    }
  })();

  const allCompleted = state.data.length > 0 && _.every(state.data, (item) => item.completed);

  return (
    <div>
      <Header
        value={state.value}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        handleSelectAll={handleSelectAll}
        allCompleted={allCompleted}
      />
      <Body filteredData={filteredData} handleCheckbox={handleCheckbox} handleRemove={handleRemove} />
      <Footer
        length={_.filter(state.data, (item) => !item.completed).length}
        handleClick={handleClick}
        ClearCompleted={() => dispatch({ type: "CLEAR_COMPLETED" })}
      />
    </div>
  );
};
