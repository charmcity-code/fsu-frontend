const API_BASE = "http://localhost:3000/api";
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

// POST: create a new department
export async function createDepartment(deptData, token) {
  const res = await fetch(`${API_BASE}/departments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(deptData),
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw new Error(errorInfo.message || 'Failed to create department');
  }
  return await res.json();
}

// PUT: update an existing department
export async function updateDepartment(id, deptData, token) {
  const res = await fetch(`${API_BASE}/departments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(deptData),
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw new Error(errorInfo.message || 'Failed to update department');
  }
  return await res.json();
}

// DELETE: remove a department
export async function deleteDepartment(id, token) {
  const res = await fetch(`${API_BASE}/departments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw new Error(errorInfo.message || 'Failed to delete department');
  }
  return { success: true };
}

// --- FACULTY FUNCTIONS ---

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

// POST: create a new faculty member
export async function createFaculty(facultyData, token) {
  const res = await fetch(`${API_BASE}/faculty`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(facultyData),
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw new Error(errorInfo.message || 'Failed to create faculty');
  }
  return await res.json();
}

// PUT: update an existing faculty member
export async function updateFaculty(id, facultyData, token) {
  const res = await fetch(`${API_BASE}/faculty/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(facultyData),
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw new Error(errorInfo.message || 'Failed to update faculty');
  }
  return await res.json();
}

// DELETE: remove a faculty member
export async function deleteFaculty(id, token) {
  const res = await fetch(`${API_BASE}/faculty/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw new Error(errorInfo.message || 'Failed to delete faculty');
  }
  return { success: true };
}

// POST: register a new user
export async function registerUser(userData) {
  const res = await fetch(`${API_BASE}/users/register`, { // Assumes /api/users/register route
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const errorInfo = await res.json();
    throw new Error(errorInfo.message || 'Failed to register');
  }
  // Changed this line from res.json() to res.text()
  return await res.text(); 
}

// POST: log in an existing user
export async function loginUser(userData) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    // Try to parse the error message from the server
    const errorBody = await res.text();
    throw new Error(errorBody || 'Failed to login');
  }

  // Just like with registration, the token is plain text
  return await res.text();
}