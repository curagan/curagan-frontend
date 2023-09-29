import { API_DOCTOR, API_PATIENT } from '@/lib/ApiLinks';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FormChangePasswordProps {
  setDisplaySuccessModal: Dispatch<SetStateAction<boolean>>;
  setDisplayFailedModal: Dispatch<SetStateAction<boolean>>;
}

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

const schema = yup.object({
  oldPassword: yup.string().required('Password lama tidak boleh kosong'),
  newPassword: yup.string().required('Password baru tidak boleh kosong'),
});

const FormChangePassword = ({
  setDisplaySuccessModal,
  setDisplayFailedModal,
}: FormChangePasswordProps) => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    values: { oldPassword: '', newPassword: '' },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (formData: FormValues) => {
    setDisableSubmit(true);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    let API = API_PATIENT;
    if (role == 'doctor') {
      API = API_DOCTOR;
    }

    try {
      await axios.patch(
        `${API}/change-password/${userId}`,
        { ...formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setDisplaySuccessModal(true);
    } catch (error) {
      console.error(error);
      setDisplayFailedModal(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mb-1.5">
          <label htmlFor="oldPassword">Password lama:</label>
          <input
            className="w-full p-3 py-2 rounded-md border border-gray-400"
            type="password"
            placeholder="******"
            {...register('oldPassword')}
          />
          {errors.oldPassword && (
            <span className="text-sm text-red-600">
              {errors.oldPassword.message}
            </span>
          )}

          <label htmlFor="newPassword">Password baru:</label>
          <input
            className="w-full p-3 py-2 rounded-md border border-gray-400"
            type="password"
            placeholder="******"
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <span className="text-sm text-red-600">
              {errors.newPassword.message}
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
            className="w-32 h-8 bg-blue-500 hover:bg-blue-700 rounded-[3px] text-white mr-2"
          >
            Ubah Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormChangePassword;
