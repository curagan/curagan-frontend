import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/Button';
import { useUser } from '@/hooks/useUser';

export default function Profile() {
  const { user } = useUser();
  console.log('render', user);

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
