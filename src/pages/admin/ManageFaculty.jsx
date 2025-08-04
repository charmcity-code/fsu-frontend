import React from 'react';

// Dummy data until we fetch from the API
const dummyFaculty = [
  { id: 1, name: 'Dr. Ada Lovelace' },
  { id: 2, name: 'Dr. Alan Turing' },
];

export default function ManageFaculty() {
  const handleAdd = () => {
    const name = prompt('Enter new professor name:');
    if (name) {
      console.log('DUMMY HANDLER: Adding professor -', name);
    }
  };

  const handleEdit = (id) => {
    const newName = prompt('Enter new name for professor ' + id);
    if (newName) {
      console.log(`DUMMY HANDLER: Editing professor ${id} to ${newName}`);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete professor ' + id + '?')) {
      console.log('DUMMY HANDLER: Deleting professor -', id);
    }
  };

  return (
    <div>
      <h2>Manage Faculty</h2>
      <button onClick={handleAdd}>Add New Professor</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dummyFaculty.map((prof) => (
          <li key={prof.id} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px' }}>
            {prof.name}
            <div style={{ marginTop: '5px' }}>
              <button onClick={() => handleEdit(prof.id)}>Edit</button>
              <button onClick={() => handleDelete(prof.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}