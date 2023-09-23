import Button from '../Button';
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
          <Skeleton className="h-8 w-full" />
        </div>

        <div className="mb-2">
          <div>Name:</div>
          <Skeleton className="h-8 w-full" />
        </div>
      </div>

      <div>
        <Button text="Ganti Password" />
      </div>
    </div>
  );
};

export default UserProfileLoader;
