import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { API_REGISTER } from '@/lib/ApiLinks';
import router from 'next/router';

const Registration: NextPage = () => {
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
      const response = await axios.post(API_REGISTER, formData);
      console.log('Registration success: ', response.data);
      router.push('/login');
    } catch (error) {
      console.error('Registration failed: ', error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Registration form fields */}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" {...register('name')} />
          <span>{errors.name?.message}</span>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} />
          <span>{errors.email?.message}</span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password')} />
          <span>{errors.password?.message}</span>
        </div>
        <div>
          <label htmlFor="imageURL">Image URL</label>
          <input type="text" {...register('imageURL')} />
          <span>{errors.imageURL?.message}</span>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
