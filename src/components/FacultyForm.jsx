import { useState, useEffect } from 'react';

export default function FacultyForm({ initialData = {}, departments = [], onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profileImage: '',
    contactInfo: '',
    departmentId: ''
  });

  // This effect runs when initialData changes, populating the form for editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        bio: initialData.bio || '',
        profileImage: initialData.profileImage || '',
        contactInfo: initialData.contactInfo || '',
        departmentId: initialData.departmentId || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure departmentId is stored as a number if a department is selected
    const finalValue = name === 'departmentId' && value ? parseInt(value, 10) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.departmentId) {
      alert('Name and Department are required.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="manage-form">
      <h3>{initialData.id ? `Edit ${initialData.name}` : 'Add New Professor'}</h3>
      
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="profileImage">Profile Image URL</label>
        <input type="text" id="profileImage" name="profileImage" value={formData.profileImage} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="contactInfo">Contact Info</label>
        <input type="text" id="contactInfo" name="contactInfo" value={formData.contactInfo} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="departmentId">Department</label>
        <select id="departmentId" name="departmentId" value={formData.departmentId} onChange={handleChange} required>
          <option value="">Select a Department</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
      </div>
      
      <div className="item-actions">
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
      </div>
    </form>
  );
}