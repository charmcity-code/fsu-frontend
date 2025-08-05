import { useState, useEffect } from 'react';

// A reusable form for adding/editing a faculty member
export default function FacultyForm({ initialData = {}, departments = [], onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    bio: initialData.bio || '',
    profileImage: initialData.profileImage || '',
    contactInfo: initialData.contactInfo || '',
    // Use 'departmentId' to match the API response
    departmentId: initialData.departmentId || '' 
  });

  // Ensure form updates if the initialData changes
  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      bio: initialData.bio || '',
      profileImage: initialData.profileImage || '',
      contactInfo: initialData.contactInfo || '',
      // Use 'departmentId' here as well
      departmentId: initialData.departmentId || ''
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure departmentId is stored as a number
    const finalValue = name === 'departmentId' ? parseInt(value, 10) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check formData.departmentId
    if (!formData.name || !formData.departmentId) {
      alert('Name and Department are required.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
      <h3>{initialData.id ? 'Edit Professor' : 'Add Professor'}</h3>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biography" />
      <input name="profileImage" value={formData.profileImage} onChange={handleChange} placeholder="Profile Image URL" />
      <input name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info" />
      
      {/* Update the name and value for the select dropdown */}
      <select name="departmentId" value={formData.departmentId} onChange={handleChange} required>
        <option value="">Select a Department</option>
        {departments.map(dept => (
          <option key={dept.id} value={dept.id}>{dept.name}</option>
        ))}
      </select>
      
      <div>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
      </div>
    </form>
  );
};