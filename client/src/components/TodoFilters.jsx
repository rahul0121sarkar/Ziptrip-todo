export default function TodoFilters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
}) {
  return (
    <div className="filters card">
      <div className="search-wrap">
        <span className="search-icon">⌕</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search todos..."
          aria-label="Search todos"
        />
      </div>

      <div className="filter-row">
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter status">
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Filter priority">
          <option value="all">All priorities</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort todos">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due date</option>
        </select>
      </div>
    </div>
  );
}
