import React from 'react';

// Dummy data until we fetch from the API
const dummyDepartments = [
  { id: 1, name: 'Computer Science' },
  { id: 2, name: 'Mathematics' },
];

export default function ManageDepartments() {
  const handleAdd = () => {
    const name = prompt('Enter new department name:');
    if (name) {
      console.log('DUMMY HANDLER: Adding department -', name);
    }
  };

  const handleEdit = (id) => {
    const newName = prompt('Enter new name for department ' + id);
    if (newName) {
      console.log(`DUMMY HANDLER: Editing department ${id} to ${newName}`);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete department ' + id + '?')) {
      console.log('DUMMY HANDLER: Deleting department -', id);
    }
  };

  return (
    <div>
      <h2>Manage Departments</h2>
      <button onClick={handleAdd}>Add New Department</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dummyDepartments.map((dept) => (
          <li key={dept.id} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px' }}>
            {dept.name}
            <div style={{ marginTop: '5px' }}>
              <button onClick={() => handleEdit(dept.id)}>Edit</button>
              <button onClick={() => handleDelete(dept.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}