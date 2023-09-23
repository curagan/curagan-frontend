import Link from 'next/link';

interface ILayoutLink {
  name: string;
  href: string;
}

export const LayoutLink = ({ name, href }: ILayoutLink) => {
  return (
    <Link
      href={href}
      className="w-[78px] max-w-[78px] flex flex-col items-center justify-start gap-1 p-2"
    >
      <div className="w-12 h-12 rounded-full bg-slate-500"></div>
      <span>{name}</span>
    </Link>
  );
};
