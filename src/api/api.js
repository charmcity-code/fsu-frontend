const API_BASE = "http://localhost:3000";
// GET: all departments
export async function fetchDepartments() {
  const res = await fetch(`${API_BASE}/departments`);
  if (!res.ok) throw new Error("Failed to load departments");
  return await res.json();
}

// GET: single department by ID
export async function fetchDepartmentById(id) {
  const res = await fetch(`${API_BASE}/departments/${id}`);
  if (!res.ok) throw new Error("Failed to load department");
  return await res.json();
}

// GET: all faculty
export async function fetchFaculty() {
  const res = await fetch(`${API_BASE}/faculty`);
  if (!res.ok) throw new Error("Failed to load faculty");
  return await res.json();
}

// GET: single professor by ID
export async function fetchFacultyById(id) {
  const res = await fetch(`${API_BASE}/faculty/${id}`);
  if (!res.ok) throw new Error("Failed to load professor");
  return await res.json();
}
