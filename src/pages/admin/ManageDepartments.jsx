import { useState, useEffect } from 'react';
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment, fetchFaculty } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

// A simple form component for adding/editing
const DepartmentForm = ({ initialData = {}, onSubmit, onCancel, loading, faculty, department, onFacultyChange }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    images: initialData.images || '',
    contactInfo: initialData.contactInfo || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.description) {
      alert('Name and Description are required.');
      return;
    }
    onSubmit(formData);
  };

    // Filter the faculty lists here, inside the form component
  const facultyInDept = faculty.filter(f => f.departmentId === department.id);
  const facultyNotInDept = faculty.filter(f => f.departmentId !== department.id);

  return (
    // The form now wraps everything
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
      <h3>{initialData.id ? 'Edit Department' : 'Add Department'}</h3>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="images" value={formData.images} onChange={handleChange} placeholder="Image URL" />
      <input name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info" />
      
      {/* The Save/Cancel buttons for the form */}
      <div>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
      </div>

      {/* --- MOVE THE FACULTY BOXES JSX HERE --- */}
      <hr style={{ margin: '20px 0' }} />
      <h4>Manage Faculty</h4>
      <div style={{ display: 'flex', marginTop: '15px', gap: '20px' }}>
        <div style={{ flex: 1, border: '1px solid #eee', padding: '10px' }}>
            <h5>Faculty in Department ({facultyInDept.length})</h5>
            {facultyInDept.map(prof => (
                <div key={prof.id}>
                    {prof.name}{' '}
                    <button type="button" onClick={() => onFacultyChange(prof, null)} disabled={loading}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
        <div style={{ flex: 1, border: '1px solid #eee', padding: '10px' }}>
            <h5>Other Faculty ({facultyNotInDept.length})</h5>
            {facultyNotInDept.map(prof => (
                <div key={prof.id}>
                    {prof.name}{' '}
                    <button type="button" onClick={() => onFacultyChange(prof, department.id)} disabled={loading}>
                        Add
                    </button>
                </div>
            ))}
        </div>
      </div>
    </form>
  );
};


export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]); // <-- Add this state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  // State for controlling the form display
  const [showForm, setShowForm] = useState(false);
  const [editingDept, setEditingDept] = useState(null); // The department being edited

  const loadData = async () => { // <-- Rename from loadDepartments
    try {
      setLoading(true);
      setError(null);
      // Use Promise.all to fetch both at the same time
      const [deptsData, facultyData] = await Promise.all([
        fetchDepartments(),
        fetchFaculty()
      ]);
      setDepartments(deptsData);
      setFaculty(facultyData); // <-- Set the faculty state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(); // <-- Call the new loadData function
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      setLoading(true);
      await deleteDepartment(id, token);
      alert('Department deleted successfully!');
      await loadDepartments(); // Refresh list
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
      if (editingDept) {
        // Update existing department
        await updateDepartment(editingDept.id, formData, token);
        alert('Department updated successfully!');
      } else {
        // Create new department
        await createDepartment(formData, token);
        alert('Department created successfully!');
      }
      setShowForm(false);
      setEditingDept(null);
      await loadDepartments(); // Refresh list
    } catch (err) {
      alert(`Error: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (department) => {
    setEditingDept(department);
    setShowForm(true);
  };
  
  const handleAddClick = () => {
    setEditingDept(null);
    setShowForm(true);
  }

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingDept(null);
  };

  const handleFacultyDepartmentChange = async (professor, newDepartmentId) => {
    // We must provide all professor fields to the updateFaculty function
    const updatedProfessorData = {
        name: professor.name,
        bio: professor.bio,
        profileImage: professor.profileImage,
        contactInfo: professor.contactInfo,
        departmentId: newDepartmentId // This is the only part we are changing
    };

    try {
        setLoading(true);
        await updateFaculty(professor.id, updatedProfessorData, token);
        await loadData(); // Reload all data to see the change
    } catch (err) {
        alert(`Error updating faculty: ${err.message}`);
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

  if (loading && !departments.length) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Manage Departments</h2>

      {/* --- THIS LOGIC CHANGES --- */}
      {/* Instead of showing the form separately, we'll now show it within the list item when editing */}
      {!editingDept && <button onClick={handleAddClick}>Add New Department</button>}
      {editingDept && !editingDept.id && (
          <DepartmentForm initialData={{}} onSubmit={handleFormSubmit} onCancel={handleCancelForm} loading={loading} faculty={[]} department={{}} onFacultyChange={()=>{}} />
      )}
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {departments.map((dept) => (
            <li key={dept.id} style={{ margin: '20px 0', border: '1px solid #ddd', padding: '10px' }}>
              
              {/* If we are NOT editing this department, just show its name and the buttons */}
              {(!editingDept || editingDept.id !== dept.id) && (
                <>
                  <strong>{dept.name}</strong>
                  <div style={{ marginTop: '5px' }}>
                    <button onClick={() => handleEditClick(dept)} disabled={loading}>Edit</button>
                    <button onClick={() => handleDelete(dept.id)} disabled={loading} style={{ marginLeft: '10px' }}>Delete</button>
                  </div>
                </>
              )}
              
              {/* If we ARE editing this department, show the all-in-one form */}
              {editingDept && editingDept.id === dept.id && (
                <DepartmentForm 
                  initialData={editingDept} 
                  onSubmit={handleFormSubmit} 
                  onCancel={handleCancelForm} 
                  loading={loading}
                  faculty={faculty}
                  department={editingDept}
                  onFacultyChange={handleFacultyDepartmentChange}
                />
              )}

            </li>
        ))}
      </ul>
    </div>
  );
}