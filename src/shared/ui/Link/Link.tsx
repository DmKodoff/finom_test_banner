import { ReactNode, AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
}

const Link = ({ children, className = '', ...props }: LinkProps) => {
  const baseClasses =
    'text-blue-600 underline transition-all duration-200 hover:text-blue-800 hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded';

  return (
    <a
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;

