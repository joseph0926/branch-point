import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='w-full h-screen overflow-hidden flex items-center justify-center'>
      {children}
    </div>
  );
}
