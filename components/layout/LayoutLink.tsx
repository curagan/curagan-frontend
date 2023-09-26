import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ILayoutLink {
  name: string;
  href: string;
  src: StaticImageData;
}

export const LayoutLink = ({ name, href, src }: ILayoutLink) => {
  return (
    <Link
      href={href}
      className="w-[78px] max-w-[78px] flex flex-col items-center justify-start gap-1 p-2 hover:bg-slate-300 transition-all"
    >
      <div className="w-10 h-10 rounded-full">
        <Image src={src} alt={name} className="object-contain" />
      </div>
      <span>{name}</span>
    </Link>
  );
};
