import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import imgLogo from '@/public/icons/logo.png';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { API_LOGIN } from '@/lib/ApiLinks';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  const router = useRouter();

  // Yup & react hook form setup
  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email required'),
    password: yup.string().required('Password required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  // Handle submit
  const onSubmit = async (formData: any) => {
    try {
      setDisableSubmit(true);
      const response = await axios.post(API_LOGIN, formData);

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.response.role);

      router.push('/beranda');
    } catch (error) {
      setDisableSubmit(false);
      // throw new Error('Failed to login');
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
              <span>Register</span>
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
              <h1 className="text-xl font-medium">Selamat Datang</h1>
              <p className="text-sm">
                Masukan email dan kata sandi untuk lanjut
              </p>
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

            {disableSubmit ? (
              <button
                type="submit"
                disabled
                className="w-full px-3 py-2 rounded-md bg-[#13629D] text-white opacity-50"
              >
                Masuk
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-3 py-2 rounded-md bg-[#13629D] text-white"
              >
                Masuk
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
