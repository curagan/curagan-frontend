import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/Button';

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

export default function Profile() {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    imageUrl: '',
  });

  // dummy data
  const API_URL = '';
  const token = '';
  const userId = '';

  const fetchUserData = async () => {
    try {
      //   const response = await axios.get(`${API_URL}/users/${userId}`, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
      //   setUser(response.data);
      setUser({
        name: 'John Snow',
        email: 'jhonsnow@email.com',
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

  return (
    <>
      <img
        className="inline-block h-20 w-20 rounded-full ring-2 ring-white dark:ring-zinc-500"
        src={user.imageUrl}
        alt="Profile picture"
      />

      <div>
        <div>E-Mail:</div>
        <div>{user.email}</div>
      </div>

      <div>
        <div>Name:</div>
        <div>{user.name}</div>
      </div>

      <Button text="Ganti Password" />
    </>
  );
}
