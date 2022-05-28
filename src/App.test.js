import { render, screen } from "@testing-library/react";
import TodoList from "./components/TodoListApp/Todos.jsx";

test("renders Tasks Title", () => {
  render(<TodoList />);
  const tasksTitle = screen.getByText(/Tasks/i);
  expect(tasksTitle).toBeInTheDocument();
});
