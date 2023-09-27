import Link from 'next/link';

interface IMenuLink {
  href: string;
  name: string;
}

export const MenuLink = ({ href, name }: IMenuLink) => {
  return (
    <Link
      href={href}
      className="w-full py-3 px-2 rounded-md hover:bg-slate-400 hover:bg-opacity-30"
    >
      {name}
    </Link>
  );
};
