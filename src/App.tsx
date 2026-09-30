import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import type { Todo, Filter } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);  
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });

  const selectedTodo = todos.find((todo) => todo.id === selectedId);

  return (
    <div>
      <h1>할 일 목록</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilter filter={filter} onChange={setFilter} />

      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onSelect={setSelectedId}
          />
        ))}
      </ul>

      <p>선택한 할 일: {selectedTodo?.text || "없음"}</p>
    </div>
  );
}

export default App;