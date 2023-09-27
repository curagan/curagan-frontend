import Button from '../Button';
import { FileEdit } from 'lucide-react';
import axios from 'axios';
import * as yup from 'yup';
import { API_PATIENT } from '@/lib/ApiLinks';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface UserProfileProps {
  name: string;
  email: string;
  imageUrl: string;
}

type FormValues = {
  name: string;
};

const schema = yup.object({
  name: yup.string().required('Nama tidak boleh kosong'),
});

const UserProfileEdit = ({ name, email, imageUrl }: UserProfileProps) => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    values: {
      name: name,
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  //const token = '9d464306-9955-4f68-a2a7-a23d4a2fcd45';

  const onSubmit = async (formData: any) => {
    const id = '9d464306-9955-4f68-a2a7-a23d4a2fcd45';
    const token = localStorage.getItem('token');
    console.log('submited');
    console.log(formData);

    try {
      setDisableSubmit(true);
      await axios.patch(`${API_PATIENT}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/akun');
    } catch (error) {
      setDisableSubmit(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="text-center my-4">
        <img
          className="inline-block h-28 w-28 rounded-full ring-1 ring-neutral-500"
          src={imageUrl}
          alt="Profile picture"
        />
      </div>

      <div className="mb-2">
        <div>E-Mail:</div>
        <div className="font-bold">{email}</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            className="w-full p-3 py-2 rounded-md border border-gray-400"
            {...register('name')}
          />

          {/* {errors.name?.message?.toString()} */}
          {errors.name && (
            <span className="text-sm text-red-600">{errors.name.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-[#13629D] text-white"
        >
          Ganti
        </button>
        <button
          className="px-3 py-2 rounded-md bg-[red] text-white"
          onClick={() => {
            router.push('/akun');
          }}
        >
          Batal
        </button>
      </form>

      <div>
        <Button text="Ganti Password" />
      </div>
    </div>
  );
};

export default UserProfileEdit;
