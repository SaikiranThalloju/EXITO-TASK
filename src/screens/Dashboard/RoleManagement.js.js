
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [name, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const menuItems = [
    'Projects', 'Tasks', 'Timesheet', 'Leaders', 'Our Clients', 'Clients', 'Client Profile',
    'Employees', 'Members', 'Holidays', 'Attendance'
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCreateOrUpdateRole = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    try {
      if (selectedRole) {
        await axios.put(`http://localhost:5000/api/roles/${selectedRole._id}`, { name, permissions });
      } else {
        await axios.post('http://localhost:5000/api/roles', { name, permissions });
      }
      fetchRoles(); // Refresh roles after creating or updating
      resetForm();
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error); // Display the error message from the server
      } else {
        console.error('Error creating or updating role:', error);
      }
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${id}`);
      fetchRoles(); // Refresh roles after deleting
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const resetForm = () => {
    setRoleName('');
    setPermissions([]);
    setSelectedRole(null);
    setError('');
  };

  const handleEditRole = (role) => {
    setRoleName(role.name);
    setPermissions(role.permissions);
    setSelectedRole(role);
  };

  const handlePermissionChange = (permission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter(p => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Roles Management</h2>
      <form onSubmit={handleCreateOrUpdateRole} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: '10px' }}>Role Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setRoleName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: '10px' }}>Permissions:</label>
          {menuItems.map(item => (
            <div key={item}>
              <input
                type="checkbox"
                checked={permissions.includes(item)}
                onChange={() => handlePermissionChange(item)}
              />
              {item}
            </div>
          ))}
        </div>
        <button type="submit">{selectedRole ? 'Update Role' : 'Create Role'}</button>
        <button type="button" onClick={resetForm}>Cancel</button>
      </form>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Role Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Permissions</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{role.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{role.permissions.join(', ')}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleEditRole(role)}>Edit</button>
                <button onClick={() => handleDeleteRole(role._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;



