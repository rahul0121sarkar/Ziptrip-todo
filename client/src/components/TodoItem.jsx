function formatDueDate(value) {
  if (!value) return "No due date";
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <article className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <button
        className={`check ${todo.completed ? "checked" : ""}`}
        onClick={() => onToggle(todo._id)}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed ? "✓" : ""}
      </button>

      <div className="todo-content">
        <a className="todo-title" href={`/todo.html?id=${todo._id}`}>
          {todo.title}
        </a>
        {todo.description && <p>{todo.description}</p>}
        <div className="todo-meta">
          <span className={`priority ${todo.priority}`}>{todo.priority}</span>
          <span>Due: {formatDueDate(todo.dueDate)}</span>
        </div>
      </div>

      <div className="todo-actions">
        <button className="icon-button" onClick={() => onEdit(todo)} aria-label="Edit todo">
          ✎
        </button>
        <button className="icon-button danger" onClick={() => onDelete(todo._id)} aria-label="Delete todo">
          ×
        </button>
      </div>
    </article>
  );
}
