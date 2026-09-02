import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

export default function TodoForm({ onSubmit, editingTodo, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setForm({
        title: editingTodo.title || "",
        description: editingTodo.description || "",
        priority: editingTodo.priority || "medium",
        dueDate: editingTodo.dueDate
          ? new Date(editingTodo.dueDate).toISOString().slice(0, 10)
          : "",
      });
    } else {
      setForm(initialState);
    }
  }, [editingTodo]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim()) return;

    setSaving(true);
    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate || null,
      });
      if (!editingTodo) setForm(initialState);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="todo-form card" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">{editingTodo ? "Edit task" : "New task"}</span>
          <h2>{editingTodo ? "Update your todo" : "What needs to get done?"}</h2>
        </div>
        {editingTodo && (
          <button type="button" className="button ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <label>
        Title
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Finish project documentation"
          maxLength={120}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add a little context..."
          rows="3"
          maxLength={1000}
        />
      </label>

      <div className="form-grid">
        <label>
          Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Due date
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </label>
      </div>

      <button className="button primary" disabled={saving}>
        {saving ? "Saving..." : editingTodo ? "Save changes" : "Add todo"}
      </button>
    </form>
  );
}
