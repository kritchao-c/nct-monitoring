import { ReactNode } from 'react';

export interface DetailBlockProps {
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
}

const DetailBlock: React.FC<DetailBlockProps> = ({ icon, title, children }) => {
  return (
    <div className="flex flex-col rounded-md shadow-md">
      <div className=" flex min-h-[60px] items-center justify-center gap-x-2 rounded-md bg-teal-01 font-semibold leading-tight text-white">
        {icon} {title}
      </div>
      <div className="flex min-h-[60px] items-center justify-center text-[30px]">{children}</div>
    </div>
  );
};

export default DetailBlock;
