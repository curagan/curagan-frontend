import { Skeleton } from '../ui/skeleton';

const UserProfileLoader = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="text-center my-4">
        <Skeleton className="inline-block h-28 w-28 rounded-full" />
      </div>

      <div className="border-b-2 border-neutral-200">
        <div className="mb-2">
          <div>E-Mail:</div>
          <Skeleton className="h-6 w-full" />
        </div>

        <div className="mb-2">
          <div>Name:</div>
          <Skeleton className="h-6 w-full" />
        </div>
      </div>

      <div>
        <button className="w-28 h-8 bg-blue-500 rounded-[3px] text-white mr-2">
          Ubah Profil
        </button>
      </div>
    </div>
  );
};

export default UserProfileLoader;
