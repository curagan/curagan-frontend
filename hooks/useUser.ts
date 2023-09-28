import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DOCTOR, API_PATIENT } from '@/lib/ApiLinks';
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
  imageURL: string;
  hospital?: string;
}

export function useUser() {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    imageURL: '',
    hospital: '',
  });

  const router = useRouter();

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    let API = API_PATIENT;
    if (role == 'doctor') {
      API = API_DOCTOR;
    }

    try {
      const response = await axios.get(`${API}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
    } catch (error) {
      console.error(error);
      //alert('Silahkan login terlebih dahulu');
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, setUser };
}
