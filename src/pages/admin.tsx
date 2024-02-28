import { LogoutOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const AdminPage: NextPage = () => {
  const router = useRouter();
  const handleLogout = () => {
    Modal.warning({
      title: 'Do you want to logout ?',
      okText: 'Logout',
      closable: true,
      okButtonProps: {
        className: 'bg-red-01 hover:bg-red-01/50',
      },
      onOk: () => router.push('/login'),
    });
  };
  return (
    <div className="min-w-screen min-h-screen">
      <div className="flex flex-col gap-y-4">
        <div className="w-full border-b border-neutral-01/20 px-2 py-4">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between">
            <div className="text-[32px] font-bold">Admin Panel</div>
            <Button danger size="large" onClick={() => handleLogout()} icon={<LogoutOutlined />}>
              Logout
            </Button>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1440px] flex-col">
          <div className="grid grid-cols-1  gap-4 lg:grid-cols-4"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
