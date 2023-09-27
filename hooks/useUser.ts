import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_PATIENT } from '@/lib/ApiLinks';

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

export function useUser() {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    imageUrl: '',
  });

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const userId = '9d464306-9955-4f68-a2a7-a23d4a2fcd45';

    try {
      const response = await axios.get(`${API_PATIENT}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      // setUser({
      //   name: 'John Snow',
      //   email: 'johnsnow@email.com',
      //   imageUrl:
      //     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, setUser };
}
