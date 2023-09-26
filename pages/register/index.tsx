import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { API_REGISTER } from '@/lib/ApiLinks';
import router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import imgLogo from '@/public/icons/logo.png';
import { useState } from 'react';

const Registration: NextPage = () => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  const schema = yup.object({
    name: yup.string().required('Name required'),
    email: yup.string().email('Invalid email').required('Email required'),
    password: yup.string().required('Password required'),
    imageURL: yup.string().required('Image URL required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: any) => {
    try {
      setDisableSubmit(true);
      const response = await axios.post(API_REGISTER, formData);

      console.log('Registration success: ', response.data);
      router.push('/login');
    } catch (error) {
      setDisableSubmit(false);
      console.error('Registration failed: ', error);
    }
  };

  return (
    <div className="absolute w-full h-full flex flex-col items-center">
      <main className="grow w-full max-w-md max-h-full overflow-y-auto">
        <div className="w-full flex flex-col gap-4 p-3">
          <div className="w-full flex items-center justify-between">
            <Link href={'/beranda'}>
              <span>Kembali</span>
            </Link>
            <Link
              href={'/register'}
              className="rounded-md p-2 bg-slate-900 text-white"
            >
              <span>Masuk</span>
            </Link>
          </div>

          <div className="w-full flex flex-col items-center gap-3">
            <div className="w-10 h-10">
              <Image
                src={imgLogo}
                alt="curagan logo"
                className="object-contain"
              />
            </div>
            <div className="w-full flex flex-col items-center gap-2">
              <h1 className="text-xl font-medium">Registrasi</h1>
              <p className="text-sm">Silahkan isi data Anda terlebih dahulu</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="emailsaya@gmail.com"
                className="w-full p-3 py-2 rounded-md border border-gray-400"
                {...register('email')}
              />
              <span className="text-sm text-red-600">
                {errors.email?.message?.toString()}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="******"
                className="w-full p-3 py-2 rounded-md border border-gray-400"
                {...register('password')}
              />
              <span className="text-sm text-red-600">
                {errors.password?.message?.toString()}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="name">Nama</label>
              <input
                type="text"
                placeholder="Nama anda"
                className="w-full p-3 py-2 rounded-md border border-gray-400"
                {...register('name')}
              />
              <span className="text-sm text-red-600">
                {errors.name?.message?.toString()}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="imageURL">Foto Profil</label>
              <input
                type="text"
                placeholder="Url foto profil"
                className="w-full p-3 py-2 rounded-md border border-gray-400"
                {...register('imageURL')}
              />
              <span className="text-sm text-red-600">
                {errors.imageURL?.message?.toString()}
              </span>
            </div>

            {disableSubmit ? (
              <button
                type="submit"
                disabled
                className="w-full px-3 py-2 rounded-md bg-[#13629D] text-white opacity-50"
              >
                Daftar
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-3 py-2 rounded-md bg-[#13629D] text-white"
              >
                Daftar
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Registration;
