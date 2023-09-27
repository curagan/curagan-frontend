import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_PATIENT } from '@/lib/ApiLinks';

interface User {
  name: string;
  email: string;
  imageURL: string;
}

export function useUser() {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    imageURL: '',
  });

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.get(`${API_PATIENT}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, setUser };
}
