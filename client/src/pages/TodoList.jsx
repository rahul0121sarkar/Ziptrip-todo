import { useEffect, useMemo, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoFilters from "../components/TodoFilters";
import TodoItem from "../components/TodoItem";
import Loading from "../components/Loading";
import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from "../api/todos";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("newest");

  async function loadTodos() {
    try {
      setLoading(true);
      setError("");
      const data = await getTodos();
      setTodos(data.todos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleCreate(values) {
    try {
      const data = await createTodo(values);
      setTodos((current) => [data.todo, ...current]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleUpdate(values) {
    try {
      const data = await updateTodo(editingTodo._id, values);
      setTodos((current) =>
        current.map((todo) => (todo._id === data.todo._id ? data.todo : todo))
      );
      setEditingTodo(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleToggle(id) {
    try {
      const data = await toggleTodo(id);
      setTodos((current) =>
        current.map((todo) => (todo._id === data.todo._id ? data.todo : todo))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this todo?")) return;
    try {
      await deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo._id !== id));
      if (editingTodo?._id === id) setEditingTodo(null);
    } catch (err) {
      setError(err.message);
    }
  }

  const visibleTodos = useMemo(() => {
    const priorityWeight = { high: 3, medium: 2, low: 1 };

    return todos
      .filter((todo) => {
        const matchesSearch =
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.description?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          status === "all" ||
          (status === "completed" && todo.completed) ||
          (status === "active" && !todo.completed);

        const matchesPriority = priority === "all" || todo.priority === priority;

        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
        if (sort === "priority") return priorityWeight[b.priority] - priorityWeight[a.priority];
        if (sort === "dueDate") {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [todos, search, status, priority, sort]);

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="page-shell">
      <header className="topbar">
        <a href="/index.html" className="brand">
          <span className="brand-mark">✓</span>
          TodoFlow
        </a>
        <span className="assignment-label">Ziptrrip • Technical Assignment</span>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">Your workspace</span>
          <h1>Make progress, one task at a time.</h1>
          <p>Capture your work, keep priorities visible, and finish what matters.</p>
        </div>
        <div className="stats">
          <strong>{todos.length}</strong>
          <span>Total tasks</span>
          <strong>{completedCount}</strong>
          <span>Completed</span>
        </div>
      </section>

      <section className="layout">
        <TodoForm
          editingTodo={editingTodo}
          onSubmit={editingTodo ? handleUpdate : handleCreate}
          onCancel={() => setEditingTodo(null)}
        />

        <div className="todo-panel">
          <TodoFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            sort={sort}
            setSort={setSort}
          />

          {error && <div className="alert error">{error}</div>}

          {loading ? (
            <Loading text="Loading your todos..." />
          ) : visibleTodos.length === 0 ? (
            <div className="empty card">
              <div className="empty-icon">✓</div>
              <h2>{todos.length === 0 ? "No todos yet" : "No matching todos"}</h2>
              <p>
                {todos.length === 0
                  ? "Create your first task using the form."
                  : "Try changing your search or filters."}
              </p>
            </div>
          ) : (
            <div className="todo-list">
              {visibleTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={setEditingTodo}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
