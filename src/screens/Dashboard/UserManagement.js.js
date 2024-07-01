
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };

  const fetchRoles = async () => {
    const response = await axios.get('http://localhost:5000/api/roles');
    setRoles(response.data);
  };

  const handleCreateOrUpdateUser = async () => {
    const userData = { firstName, lastName, email, mobile, roles: selectedRoles };

    if (selectedUser) {
      await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, userData);
    } else {
      await axios.post('http://localhost:5000/api/users', userData);
    }

    fetchUsers();
    resetForm();
  };

  const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/api/users/${userId}`);
    fetchUsers();
  };

  const handleEditUser = (user) => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setMobile(user.mobile);
    setSelectedRoles(user.roles.map(role => role._id));
    setSelectedUser(user);
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobile('');
    setSelectedRoles([]);
    setSelectedUser(null);
  };

  const handleRoleChange = (e) => {
    setSelectedRoles(Array.from(e.target.selectedOptions, option => option.value));
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Users Management</h2>
      <form onSubmit={handleCreateOrUpdateUser} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: '10px' }}>First Name:</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: '10px' }}>Last Name:</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: '10px' }}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: '10px' }}>Mobile:</label>
          <input 
            type="text" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            required 
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: '10px' }}>Roles:</label>
          <select
            multiple
            value={selectedRoles}
            onChange={handleRoleChange}
            style={{ minWidth: '200px' }}
          >
            {roles.map(role => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">{selectedUser ? 'Update User' : 'Create User'}</button>
        <button type="button" onClick={resetForm}>Cancel</button>
      </form>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>First Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Last Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Mobile</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Roles</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.firstName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.lastName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.mobile}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.roles.map(role => role.roleName).join(', ')}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
