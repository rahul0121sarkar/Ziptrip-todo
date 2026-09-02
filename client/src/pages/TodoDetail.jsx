import { useEffect, useState } from "react";
import { deleteTodo, getTodo, toggleTodo, updateTodo } from "../api/todos";
import Loading from "../components/Loading";

function formatDate(value) {
  if (!value) return "Not set";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function TodoDetail() {
  const id = new URLSearchParams(window.location.search).get("id");
  const [todo, setTodo] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) {
        setError("No todo id was provided.");
        setLoading(false);
        return;
      }

      try {
        const data = await getTodo(id);
        setTodo(data.todo);
        setForm({
          title: data.todo.title,
          description: data.todo.description || "",
          priority: data.todo.priority,
          dueDate: data.todo.dueDate
            ? new Date(data.todo.dueDate).toISOString().slice(0, 10)
            : "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const data = await updateTodo(id, {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate || null,
      });
      setTodo(data.todo);
      setForm({
        title: data.todo.title,
        description: data.todo.description || "",
        priority: data.todo.priority,
        dueDate: data.todo.dueDate
          ? new Date(data.todo.dueDate).toISOString().slice(0, 10)
          : "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle() {
    try {
      const data = await toggleTodo(id);
      setTodo(data.todo);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this todo?")) return;
    try {
      await deleteTodo(id);
      window.location.href = "/index.html";
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <main className="page-shell detail-shell">
        <Loading text="Loading todo..." />
      </main>
    );
  }

  if (error && !todo) {
    return (
      <main className="page-shell detail-shell">
        <a href="/index.html" className="back-link">← Back to todos</a>
        <div className="alert error">{error}</div>
      </main>
    );
  }

  return (
    <main className="page-shell detail-shell">
      <header className="topbar">
        <a href="/index.html" className="brand">
          <span className="brand-mark">✓</span>
          TodoFlow
        </a>
      </header>

      <a href="/index.html" className="back-link">← Back to all todos</a>

      {error && <div className="alert error">{error}</div>}

      <section className="detail-card card">
        <div className="detail-header">
          <div>
            <span className={`priority ${todo.priority}`}>{todo.priority} priority</span>
            <h1>{todo.title}</h1>
            <p className={todo.completed ? "status completed-text" : "status"}>
              {todo.completed ? "Completed" : "In progress"}
            </p>
          </div>
          <button className="button secondary" onClick={handleToggle}>
            {todo.completed ? "Mark incomplete" : "Mark complete"}
          </button>
        </div>

        <div className="detail-info">
          <div>
            <span>Created</span>
            <strong>{formatDate(todo.createdAt)}</strong>
          </div>
          <div>
            <span>Last updated</span>
            <strong>{formatDate(todo.updatedAt)}</strong>
          </div>
          <div>
            <span>Due date</span>
            <strong>{formatDate(todo.dueDate)}</strong>
          </div>
        </div>

        <form className="detail-form" onSubmit={handleSave}>
          <label>
            Title
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              maxLength={120}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="7"
              maxLength={1000}
            />
          </label>

          <div className="form-grid">
            <label>
              Priority
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label>
              Due date
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </label>
          </div>

          <div className="detail-actions">
            <button className="button primary" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button type="button" className="button danger-button" onClick={handleDelete}>
              Delete todo
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
