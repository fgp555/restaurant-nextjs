// app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!user) return null;

  const handleDeleteUser = async (id: string) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      alert('Usuario eliminado');
      // Opcional: refrescar lista de usuarios
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard ({user.role})</h1>

      {user.role === 'admin' ? (
        <AdminDashboard onDelete={handleDeleteUser} />
      ) : (
        <UserDashboard user={user} />
      )}
    </div>
  );
}

function AdminDashboard({ onDelete }: { onDelete: (id: string) => void }) {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get('/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-2">Lista de Usuarios</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li
            key={user.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{user.name} ({user.email})</span>
            <button
              onClick={() => onDelete(user.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDashboard({ user }: { user: any }) {
  return (
    <div>
      <h2 className="text-xl mb-2">Perfil</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Correo:</strong> {user.email}</p>
    </div>
  );
}
