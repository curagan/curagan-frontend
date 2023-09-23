import { useEffect, useState } from 'react';
import axios from 'axios';

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
    try {
      // const response = await axios.get(`${API_URL}/users/${userId}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // setUser(response.data);
      setUser({
        name: 'John Snow',
        email: 'johnsnow@email.com',
        imageUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user };
}
