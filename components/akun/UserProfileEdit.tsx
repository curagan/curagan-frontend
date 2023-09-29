import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { API_DOCTOR, API_PATIENT } from '@/lib/ApiLinks';
import { Skeleton } from '../ui/skeleton';
import { User } from './types';
import ImageUpload from './ImageUpload';

interface UserProfileProps {
  name: string;
  email: string;
  imageURL: string;
  hospital?: string;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

type FormValues = {
  name: string;
  hospital?: string;
};

const schema = yup.object({
  name: yup.string().required('Nama tidak boleh kosong'),
  hospital: yup.string(),
});

const UserProfileEdit = ({
  name,
  email,
  imageURL,
  hospital,
  setUser,
}: UserProfileProps) => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    values: {
      name: name,
      hospital: hospital,
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (formData: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    let API = API_PATIENT;
    if (role == 'doctor') {
      API = API_DOCTOR;
    }

    try {
      setDisableSubmit(true);
      await axios.put(
        `${API}/${userId}`,
        { ...formData, imageURL },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      router.push('/akun');
    } catch (error) {
      setDisableSubmit(false);
      console.error(error);
    }
  };

  const handleImageUploadSuccess = (imageURL: string) => {
    setUser((prevState) => ({
      ...prevState,
      imageURL: imageURL,
    }));
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="text-center my-4">
        {imageURL ? (
          <div className="relative">
            <img
              className="inline-block h-28 w-28 rounded-full ring-1 ring-neutral-500"
              src={imageURL}
              alt="Profile picture"
            />
            <div className="absolute bottom-2 right-40">
              <ImageUpload onSuccess={handleImageUploadSuccess} />
            </div>
          </div>
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
              placeholder="Nama"
              {...register('name')}
            />

            {/* {errors.name?.message?.toString()} */}
            {errors.name && (
              <span className="text-sm text-red-600">
                {errors.name.message}
              </span>
            )}

            {hospital && (
              <>
                <label htmlFor="hospital">Rumah Sakit:</label>
                <input
                  className="w-full p-3 py-2 rounded-md border border-gray-400"
                  placeholder="Rumah Sakit"
                  {...register('hospital')}
                />

                {/* {errors.name?.message?.toString()} */}
                {errors.hospital && (
                  <span className="text-sm text-red-600">
                    {errors.hospital.message}
                  </span>
                )}
              </>
            )}
          </div>

          <div className="mb-2">
            <button
              type="button"
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
            <input
              className="w-full p-3 py-2 rounded-md border border-gray-400"
              type="password"
              placeholder="******"
            />

            <label htmlFor="newPassword">Password baru:</label>
            <input
              className="w-full p-3 py-2 rounded-md border border-gray-400"
              type="password"
              placeholder="******"
            />
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
