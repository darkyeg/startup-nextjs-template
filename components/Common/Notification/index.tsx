'use client';

import { Toaster } from 'sonner';

type NotificationProps = React.ComponentProps<typeof Toaster>;

const Notification = ({ ...props }: NotificationProps) => {
  return (
    <Toaster
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-[#F1F1F1] group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-[#6B6D6F]',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-white group-[.toast]:text-primary',
        },
      }}
      {...props}
    />
  );
};

export default Notification;
