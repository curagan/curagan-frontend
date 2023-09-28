import Image from 'next/image';
import imgSearch from '@/public/icons/search.png';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export const SearchBar = () => {
  const router = useRouter();

  // Yup & react hook form setup
  const schema = yup.object({
    search: yup.string(),
  });
  const { register, handleSubmit } = useForm({
    values: {
      search: '',
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  // Handle submit
  const onSubmit = async (form: any) => {
    router.push(`/pencarian/${form.search}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <label htmlFor="search" className="sr-only">
        Cari dokter atau spesialisasi
      </label>
      <div className="relative flex items-center">
        <div className="absolute h-6 w-6 rounded-full translate-x-3">
          <Image
            src={imgSearch}
            alt="search bar"
            className="w-full object-contain"
          />
        </div>
        <input
          type="text"
          placeholder="Cari dokter atau spesialisasi"
          {...register('search')}
          className="w-full pl-11 pr-3 py-2 rounded-full border border-gray-900"
        />
      </div>
    </form>
  );
};
