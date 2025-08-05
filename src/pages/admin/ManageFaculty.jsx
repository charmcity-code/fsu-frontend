import { useState, useEffect } from 'react';
import { fetchFaculty, fetchDepartments, createFaculty, updateFaculty, deleteFaculty } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import FacultyForm from '../../components/FacultyForm';
import './ManagePages.css'; // Import the shared CSS file

export default function ManageFaculty() {
  // State management
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [editingFaculty, setEditingFaculty] = useState(null); 

  // Data loading function
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

  // Load data on initial component mount
  useEffect(() => {
    loadData();
  }, []);

  // Handler for deleting a faculty member
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

  // Handler for submitting the Add/Edit form
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
  
  // Handlers for form visibility
  const handleEditClick = (prof) => {
    setEditingFaculty(prof);
  };
  
  const handleAddClick = () => {
    setEditingFaculty({}); // An empty object signifies "add mode"
  }

  const handleCancelForm = () => {
    setEditingFaculty(null);
  };

  // Render logic
  if (loading && !faculty.length) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Manage Faculty</h2>
      
      {!editingFaculty && <button onClick={handleAddClick}>Add New Professor</button>}
      
      {editingFaculty && !editingFaculty.id && (
        <FacultyForm 
          initialData={{}} 
          departments={departments}
          onSubmit={handleFormSubmit} 
          onCancel={handleCancelForm} 
          loading={loading} 
        />
      )}

      <ul className="manage-list">
        {faculty.map((prof) => (
          <li key={prof.id} className="manage-list-item">
            {editingFaculty && editingFaculty.id === prof.id ? (
              <FacultyForm 
                initialData={editingFaculty}
                departments={departments}
                onSubmit={handleFormSubmit} 
                onCancel={handleCancelForm} 
                loading={loading} 
              />
            ) : (
              <>
                <strong>{prof.name}</strong>
                <div className="item-actions">
                  <button onClick={() => handleEditClick(prof)} disabled={loading}>Edit</button>
                  <button onClick={() => handleDelete(prof.id)} disabled={loading}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}