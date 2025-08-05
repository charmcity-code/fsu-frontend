import { useState, useEffect } from 'react';
import { fetchFaculty, fetchDepartments, createFaculty, updateFaculty, deleteFaculty } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import FacultyForm from '../../components/FacultyForm'; // Assumes FacultyForm is in the components directory

export default function ManageFaculty() {
  // --- STATE MANAGEMENT ---
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  // This one state now controls everything about editing/adding
  const [editingFaculty, setEditingFaculty] = useState(null); 

  // --- DATA LOADING ---
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [facultyData, departmentsData] = await Promise.all([
        fetchFaculty(),
        fetchDepartments()
      ]);
      setFaculty(facultyData);
      setDepartments(departmentsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- HANDLER FUNCTIONS ---
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this professor?')) return;
    try {
      setLoading(true);
      await deleteFaculty(id, token);
      alert('Professor deleted successfully!');
      await loadData();
    } catch (err) {
      alert(`Error: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editingFaculty && editingFaculty.id) {
        await updateFaculty(editingFaculty.id, formData, token);
        alert('Professor updated successfully!');
      } else {
        await createFaculty(formData, token);
        alert('Professor created successfully!');
      }
      setEditingFaculty(null); // Hide form on success
      await loadData();
    } catch (err) {
      alert(`Error: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditClick = (prof) => {
    setEditingFaculty(prof);
  };
  
  const handleAddClick = () => {
    setEditingFaculty({}); // An empty object signifies "add mode"
  }

  const handleCancelForm = () => {
    setEditingFaculty(null);
  };

  // --- RENDER LOGIC ---
  if (loading && !faculty.length) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Manage Faculty</h2>
      
      {/* Show "Add" button only when not editing or adding */}
      {!editingFaculty && <button onClick={handleAddClick}>Add New Professor</button>}
      
      {/* Show the "Add" form at the top if editingFaculty is an empty object */}
      {editingFaculty && !editingFaculty.id && (
        <FacultyForm 
          initialData={{}} 
          departments={departments}
          onSubmit={handleFormSubmit} 
          onCancel={handleCancelForm} 
          loading={loading} 
        />
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {faculty.map((prof) => (
          <li key={prof.id} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px' }}>

            {/* If we ARE editing this professor, render the form here */}
            {editingFaculty && editingFaculty.id === prof.id ? (
              <FacultyForm 
                initialData={editingFaculty}
                departments={departments}
                onSubmit={handleFormSubmit} 
                onCancel={handleCancelForm} 
                loading={loading} 
              />
            ) : (
              // Otherwise, render the normal view
              <>
                <strong>{prof.name}</strong>
                <div style={{ marginTop: '5px' }}>
                  <button onClick={() => handleEditClick(prof)} disabled={loading}>Edit</button>
                  <button onClick={() => handleDelete(prof.id)} disabled={loading} style={{ marginLeft: '10px' }}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}