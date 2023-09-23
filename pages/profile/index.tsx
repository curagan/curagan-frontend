import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/Button';
import { useUser } from '@/hooks/useUser';

export default function Profile() {
  const { user } = useUser();
  console.log('render', user);

  return (
    <div className="flex flex-col px-8 py-8">
      <div className="text-center my-4">
        <img
          className="inline-block h-20 w-20 rounded-full ring-2 ring-white dark:ring-zinc-500"
          src={user.imageUrl}
          alt="Profile picture"
        />
      </div>

      <div className="my-4 border-b-2">
        <div className="my-2">
          <div>E-Mail:</div>
          <div className="font-semibold">{user.email}</div>
        </div>

        <div className="my-2">
          <div>Name:</div>
          <div className="font-semibold">{user.name}</div>
        </div>
      </div>

      <div>
        <Button text="Ganti Password" />
      </div>
    </div>
  );
}
