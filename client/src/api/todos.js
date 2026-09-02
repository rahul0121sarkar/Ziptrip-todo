async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export function getTodos() {
  return request("/api/todos");
}

export function getTodo(id) {
  return request(`/api/todos/${id}`);
}

export function createTodo(todo) {
  return request("/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
  });
}

export function updateTodo(id, todo) {
  return request(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });
}

export function toggleTodo(id) {
  return request(`/api/todos/${id}/toggle`, {
    method: "PATCH",
  });
}

export function deleteTodo(id) {
  return request(`/api/todos/${id}`, {
    method: "DELETE",
  });
}
