import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const { notify } = useContext(NotificationContext);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('No se pudieron cargar los usuarios.');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const handleRoleChange = async (userId, newRole) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });
        if (!response.ok) throw new Error('No se pudo actualizar el rol.');
        
        // Actualizamos la lista de usuarios en el state para reflejar el cambio
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        notify('Rol actualizado con éxito.');
    } catch (err) {
        notify(`Error: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId) => {
      if (!window.confirm('¿Estás seguro de que querés borrar a este usuario? Esta acción es irreversible.')) return;
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) throw new Error('No se pudo eliminar el usuario.');
          
          setUsers(users.filter(u => u.id !== userId));
          notify('Usuario eliminado.');
      } catch (err) {
          notify(`Error: ${err.message}`);
      }
  };


  if (loading) return <h2>Cargando usuarios...</h2>;
  if (error) return <h2 className="error-message">Error: {error}</h2>;

  return (
    <div>
      <div className="admin-header">
        <h1>Gestión de Usuarios</h1>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td title={user.id}>{user.id.slice(-6)}...</td> {/* Acortamos el ID para que no rompa la tabla */}
              <td>{user.name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
              </td>
              <td className="actions-cell">
                <button className="action-btn delete" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;