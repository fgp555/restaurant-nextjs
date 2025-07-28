// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await axiosInstance.get('/users/findOne/687ac7a1f7a5da4b0b28fc8e'); // Endpoint que devuelve info del usuario autenticado
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { user, loading };
};
