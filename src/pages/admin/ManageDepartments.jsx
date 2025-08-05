import { useState, useEffect } from 'react';
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment, fetchFaculty, updateFaculty } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import './ManagePages.css'; // Import the shared CSS

const DepartmentForm = ({ initialData = {}, onSubmit, onCancel, loading, faculty, department, onFacultyChange }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      description: initialData.description || '',
      images: initialData.images || '',
      contactInfo: initialData.contactInfo || ''
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      alert('Name and Description are required.');
      return;
    }
    onSubmit(formData);
  };

  const facultyInDept = faculty.filter(f => f.departmentId === department.id);
  const facultyNotInDept = faculty.filter(f => f.departmentId !== department.id);

  return (
    <form onSubmit={handleSubmit} className="manage-form">
      <h3>{initialData.id ? 'Edit Department' : 'Add Department'}</h3>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="images" value={formData.images} onChange={handleChange} placeholder="Image URL" />
      <input name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info" />
      
      <div className="item-actions">
        <button type="submit" disabled={loading}>Save</button>
        <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
      </div>

      <hr className="form-divider" />
      <h4>Manage Faculty</h4>
      <div className="faculty-management-container">
        <div className="faculty-list-box">
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
        <div className="faculty-list-box">
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
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [editingDept, setEditingDept] = useState(null);

  useEffect(() => {
    if (editingDept) {
      const freshDept = departments.find(d => d.id === editingDept.id);
      if (freshDept) {
        setEditingDept(freshDept);
      }
    }
  }, [departments]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [deptsData, facultyData] = await Promise.all([
        fetchDepartments(),
        fetchFaculty()
      ]);
      setDepartments(deptsData);
      setFaculty(facultyData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      setLoading(true);
      await deleteDepartment(id, token);
      alert('Department deleted successfully!');
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
      const action = editingDept && editingDept.id ? updateDepartment : createDepartment;
      const data = editingDept && editingDept.id ? [editingDept.id, formData, token] : [formData, token];
      
      await action(...data);
      alert(`Department ${editingDept && editingDept.id ? 'updated' : 'created'} successfully!`);

      setEditingDept(null);
      await loadData();
    } catch (err) {
      alert(`Error: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFacultyDepartmentChange = async (professor, newDepartmentId) => {
    const updatedProfessorData = {
        name: professor.name,
        bio: professor.bio,
        profileImage: professor.profileImage,
        contactInfo: professor.contactInfo,
        departmentId: newDepartmentId
    };

    try {
        setLoading(true);
        await updateFaculty(professor.id, updatedProfessorData, token);
        await loadData();
    } catch (err) {
        alert(`Error updating faculty: ${err.message}`);
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const handleEditClick = (department) => {
    setEditingDept(department);
  };
  
  const handleAddClick = () => {
    setEditingDept({});
  }

  const handleCancelForm = () => {
    setEditingDept(null);
  };

  if (loading && !departments.length) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Manage Departments</h2>
      {!editingDept && <button onClick={handleAddClick}>Add New Department</button>}
      {editingDept && !editingDept.id && (
          <DepartmentForm 
          initialData={{}} 
          onSubmit={handleFormSubmit} 
          onCancel={handleCancelForm} 
          loading={loading} 
          faculty={faculty} 
          department={{}} 
          onFacultyChange={()=>{}} 
          />
      )}
      
      <ul className="manage-list">
        {departments.map((dept) => (
            <li key={dept.id} className="manage-list-item">
              {(!editingDept || editingDept.id !== dept.id) && (
                <>
                  <strong>{dept.name}</strong>
                  <div className="item-actions">
                    <button onClick={() => handleEditClick(dept)} disabled={loading}>Edit</button>
                    <button onClick={() => handleDelete(dept.id)} disabled={loading}>Delete</button>
                  </div>
                </>
              )}
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