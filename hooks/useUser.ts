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
    const userId = '93bd773c-2887-4c0f-99eb-66bd9acf39a8';

    try {
      const response = await axios.get(`${API_PATIENT}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
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
