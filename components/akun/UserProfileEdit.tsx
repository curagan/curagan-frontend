import Button from '../Button';
import { FileEdit } from 'lucide-react';
import axios from 'axios';
import * as yup from 'yup';
import { API_PATIENT } from '@/lib/ApiLinks';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Skeleton } from '../ui/skeleton';

interface UserProfileProps {
  name: string;
  email: string;
  imageURL: string;
}

type FormValues = {
  name: string;
};

const schema = yup.object({
  name: yup.string().required('Nama tidak boleh kosong'),
});

const UserProfileEdit = ({ name, email, imageURL }: UserProfileProps) => {
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
    const id = '93bd773c-2887-4c0f-99eb-66bd9acf39a8';
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
        {imageURL ? (
          <img
            className="inline-block h-28 w-28 rounded-full ring-1 ring-neutral-500"
            src={imageURL}
            alt="Profile picture"
          />
        ) : (
          <Skeleton className="inline-block h-28 w-28 rounded-full" />
        )}
      </div>

      <div className="border-b-2 border-neutral-200">
        <div className="mb-2">
          <div>E-Mail:</div>
          {email ? (
            <div className="font-bold">{email}</div>
          ) : (
            <Skeleton className="h-8 w-full" />
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 mb-1.5">
            <label htmlFor="name">Nama:</label>
            <input
              className="w-full p-3 py-2 rounded-md border border-gray-400"
              {...register('name')}
            />

            {/* {errors.name?.message?.toString()} */}
            {errors.name && (
              <span className="text-sm text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-2">
            <button
              className="w-16 h-8 bg-red-500 hover:bg-red-700 rounded-[3px] text-white mr-2"
              onClick={() => {
                router.push('/akun');
              }}
            >
              Batal
            </button>

            <button
              type="submit"
              className="w-16 h-8 bg-blue-500 hover:bg-blue-700 rounded-[3px] text-white mr-2"
            >
              Ubah
            </button>
          </div>
        </form>
      </div>

      <div>
        <form>
          <div className="flex flex-col gap-1 mb-1.5">
            <label htmlFor="oldPassword">Password lama:</label>
            <input className="w-full p-3 py-2 rounded-md border border-gray-400" />

            <label htmlFor="newPassword">Password baru:</label>
            <input className="w-full p-3 py-2 rounded-md border border-gray-400" />
          </div>

          <div className="mb-2">
            <button
              className="w-16 h-8 bg-red-500 hover:bg-red-700 rounded-[3px] text-white mr-2"
              onClick={() => {
                router.push('/akun');
              }}
            >
              Batal
            </button>

            <button className="w-32 h-8 bg-blue-500 hover:bg-blue-700 rounded-[3px] text-white mr-2">
              Ubah Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileEdit;
