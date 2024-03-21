import {
  CloseOutlined,
  FilterOutlined,
  LaptopOutlined,
  LogoutOutlined,
  PartitionOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Form, Input, Modal, Select, Table, Upload, notification } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

import SimplePieChart from '@/components/UI/Chart/SimplePieChart';
import { environments } from '@/configs/environments';
import axo from '@/configs/axios';
import { UserInfo } from '@/types';
import LoadingScreen from '@/components/UI/LoadingScreen';

interface User {
  name: string;
  username: string;
  password: string;
  company: string;
  role: string;
  device: number;
}

const fakeUserFunc = (count: number) => {
  const data: any[] = [];
  for (let i = 0; i < count; i += 1) {
    data.push({
      name: faker.person.fullName(),
      username: faker.system.fileName(),
      company: faker.company.name(),
      role: faker.commerce.department(),
      device: faker.number.int({ min: 0, max: 100 }),
    });
  }
  return data;
};

const AdminPage: NextPage = () => {
  const [currentPage, setCurrenPage] = useState(1);
  const [editForm] = Form.useForm();
  const [pageLoading, setPageLoading] = useState(true);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const router = useRouter();

  const handleLogoutFunc = () => {
    setPageLoading(true);
    localStorage.removeItem('token');
    router.push('/login');
  };
  const handleLogout = () => {
    Modal.warning({
      title: 'Do you want to logout ?',
      okText: 'Logout',
      closable: true,
      okButtonProps: {
        className: 'bg-red-01 hover:bg-red-01/50',
      },
      onOk: () => handleLogoutFunc(),
    });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getUserInfo = async (tk: string) => {
      try {
        const { apiUrl, mariaPort } = environments;
        const res = await axo.get<UserInfo>(`${apiUrl}:${mariaPort}/info`, {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        });
        if (!res.data) {
          localStorage.removeItem('token');
          router.push('/login');
        }
        setPageLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        localStorage.removeItem('token');
        router.push('/login');
      }
    };
    if (token && router.isReady) {
      getUserInfo(token);
    } else {
      router.push('/login');
    }
  }, [router]);

  const CustomUpload: React.FC<{ name: string }> = ({ name }) => {
    return (
      <Upload
        className="flex items-center justify-between gap-x-2"
        listType="text"
        accept=".png,.jpg,.jpeg"
        maxCount={1}
        itemRender={(_, _f, fileList, action) => {
          if (fileList.length !== 0) {
            return (
              <div className="flex items-center justify-end gap-x-2 text-right text-sm">
                <div className=" max-w-[140px] truncate">{fileList[0].name}</div>
                <CloseOutlined className="cursor-pointer" onClick={() => action.remove()} />
              </div>
            );
          }
          return <></>;
        }}
      >
        <Button type="primary" className="bg-blue-01">
          {name}
        </Button>
      </Upload>
    );
  };

  if (pageLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-w-screen min-h-screen">
      {/* CREATE USER DRAWER */}
      <Drawer placement="left" open={openAddUser} onClose={() => setOpenAddUser(false)} title={'Add New User'}>
        <Form
          onFinish={() => {
            setOpenAddUser(false);
            notification.success({
              message: 'User Created',
            });
          }}
          layout="vertical"
          className="min-h-full"
        >
          <Form.Item rules={[{ required: true }]} name="name">
            <Input size="large" placeholder="Name" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="username">
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="password">
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
            name="confirmPassword"
          >
            <Input.Password size="large" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="companyName">
            <Input size="large" placeholder="Company Name" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="role">
            <Select
              size="large"
              placeholder="Role"
              allowClear
              options={[
                {
                  label: 'A',
                  value: 'a',
                },
                {
                  label: 'B',
                  value: 'b',
                },
              ]}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="device">
            <Select
              allowClear
              size="large"
              placeholder="Device"
              mode="multiple"
              options={[
                {
                  label: 'NCT0012',
                  value: '1',
                },
                {
                  label: 'NCT0013',
                  value: '2',
                },
                {
                  label: 'NCT0014',
                  value: '3',
                },
                {
                  label: 'NCT0015',
                  value: '4',
                },
                {
                  label: 'NCT0016',
                  value: '5',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="photoAll" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo ALL" />
          </Form.Item>
          <Form.Item name="photoNorth" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo North" />
          </Form.Item>
          <Form.Item name="photoSouth" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo South" />
          </Form.Item>
          <Form.Item name="photoCenter" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo Center" />
          </Form.Item>
          <Form.Item name="photoNortheast" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo Northest" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="w-full bg-blue-01" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      {/* EDIT USER DRAWER */}
      <Drawer placement="right" open={openEditUser} onClose={() => setOpenEditUser(false)} title={'Edit User'}>
        <Form
          onFinish={() => {
            setOpenEditUser(false);
            notification.success({
              message: 'User Edited',
            });
          }}
          form={editForm}
          layout="vertical"
          className="min-h-full"
        >
          <Form.Item rules={[{ required: true }]} name="name">
            <Input size="large" placeholder="Name" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="username">
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="password">
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
            name="confirmPassword"
          >
            <Input.Password size="large" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="company">
            <Input size="large" placeholder="Company Name" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="role">
            <Select
              size="large"
              placeholder="Role"
              allowClear
              options={[
                {
                  label: 'A',
                  value: 'a',
                },
                {
                  label: 'B',
                  value: 'b',
                },
              ]}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="device">
            <Select
              allowClear
              size="large"
              placeholder="Device"
              mode="multiple"
              options={[
                {
                  label: 'NCT0012',
                  value: '1',
                },
                {
                  label: 'NCT0013',
                  value: '2',
                },
                {
                  label: 'NCT0014',
                  value: '3',
                },
                {
                  label: 'NCT0015',
                  value: '4',
                },
                {
                  label: 'NCT0016',
                  value: '5',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="photoAll" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo ALL" />
          </Form.Item>
          <Form.Item name="photoNorth" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo North" />
          </Form.Item>
          <Form.Item name="photoSouth" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo South" />
          </Form.Item>
          <Form.Item name="photoCenter" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo Center" />
          </Form.Item>
          <Form.Item name="photoNortheast" valuePropName="fileList" getValueFromEvent={normFile}>
            <CustomUpload name="Add Photo Northest" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="w-full bg-blue-01" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <div className="flex flex-col gap-y-4">
        <div className="w-full border-b border-neutral-01/20 px-2 py-4">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between">
            <div className="text-[32px] font-bold">Admin Panel</div>
            <Button danger size="large" onClick={() => handleLogout()} icon={<LogoutOutlined />}>
              Logout
            </Button>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4">
          <div className="flex flex-col justify-between gap-4 px-2 lg:flex-row">
            <div className="flex min-w-[270px] items-center gap-x-4 rounded-lg border border-neutral-01/20 p-4 shadow-md lg:px-4">
              <SimplePieChart
                divId="123"
                icon={<UserOutlined className="text-xl" />}
                className="size-[100px]"
                data={[
                  {
                    x: 'test',
                    color: '#00B8BD',
                    y: 12,
                    setting2: {
                      forceHidden: true,
                    },
                  },
                  {
                    x: 'less',
                    color: '#CFCFCF',
                    y: 12,
                    setting: {
                      forceHidden: true,
                    },
                  },
                ]}
              />
              <div className="flex flex-col justify-between gap-y-4">
                <div className="text-[#8A92A6]">Total User</div>
                <div>50</div>
              </div>
            </div>
            <div className="flex min-w-[270px] items-center  gap-x-4 rounded-lg border border-neutral-01/20 p-4 shadow-md lg:px-4">
              <SimplePieChart
                divId="1234"
                className="size-[100px]"
                icon={<UserOutlined className="text-xl" />}
                data={[
                  {
                    x: 'test',
                    color: '#00B8BD',
                    y: 30,
                    setting2: {
                      forceHidden: true,
                    },
                  },
                  {
                    x: 'less',
                    color: '#CFCFCF',
                    y: 70,
                    setting: {
                      forceHidden: true,
                    },
                  },
                ]}
              />
              <div className="flex flex-col justify-between gap-y-4">
                <div className="text-[#8A92A6]">User / Day</div>
                <div>30</div>
              </div>
            </div>
            <div className="flex min-w-[270px] items-center  gap-x-4 rounded-lg border border-neutral-01/20 p-4 shadow-md lg:px-4">
              <SimplePieChart
                divId="1235"
                className="size-[100px]"
                icon={<PartitionOutlined className="text-xl" />}
                data={[
                  {
                    x: 'test',
                    color: '#00B8BD',
                    y: 98,
                    setting2: {
                      forceHidden: true,
                    },
                  },
                  {
                    x: 'less',
                    color: '#CFCFCF',
                    y: 2,
                    setting: {
                      forceHidden: true,
                    },
                  },
                ]}
              />
              <div className="flex flex-col justify-between gap-y-4">
                <div className="text-[#8A92A6]">Total Device</div>
                <div>98</div>
              </div>
            </div>
            <div className="flex min-w-[270px] items-center  gap-x-4 rounded-lg border border-neutral-01/20 p-4 shadow-md lg:px-4">
              <SimplePieChart
                divId="1236"
                className="size-[100px]"
                icon={<LaptopOutlined className="text-xl" />}
                data={[
                  {
                    x: 'test',
                    color: '#00B8BD',
                    y: 12,
                    setting2: {
                      forceHidden: true,
                    },
                  },
                  {
                    x: 'less',
                    color: '#CFCFCF',
                    y: 12,
                    setting: {
                      forceHidden: true,
                    },
                  },
                ]}
              />
              <div className="flex flex-col justify-between gap-y-4">
                <div className="text-[#8A92A6]">Device Online</div>
                <div>50</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-2 pt-8">
            <div className="flex items-center gap-x-2">
              <Button size="large" icon={<FilterOutlined />}>
                Filter
              </Button>
              <Button
                size="large"
                type="primary"
                className="bg-blue-01 text-white"
                onClick={() => setOpenAddUser(true)}
              >
                + Add User
              </Button>
            </div>
            <Input prefix={<SearchOutlined />} placeholder="Search" size="large" className="max-w-[320px]" />
          </div>
          <Table
            dataSource={fakeUserFunc(50)}
            pagination={{
              total: 50,
              current: currentPage,

              onChange: setCurrenPage,
              pageSize: 10,
              className: 'justify-center',
            }}
            className="px-2"
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                sorter: (a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                },
              },
              {
                title: 'Username',
                dataIndex: 'username',
                sorter: (a, b) => {
                  if (a.username < b.username) {
                    return -1;
                  }
                  if (a.username > b.username) {
                    return 1;
                  }
                  return 0;
                },
              },
              {
                title: 'Company',
                dataIndex: 'company',
                sorter: (a, b) => {
                  if (a.company < b.company) {
                    return -1;
                  }
                  if (a.company > b.company) {
                    return 1;
                  }
                  return 0;
                },
              },
              {
                title: 'Role',
                dataIndex: 'role',
                sorter: (a, b) => {
                  if (a.role < b.role) {
                    return -1;
                  }
                  if (a.role > b.role) {
                    return 1;
                  }
                  return 0;
                },
              },
              {
                title: 'Device',
                dataIndex: 'device',
                sorter: (a, b) => a.device - b.device,
              },
              {
                title: '',
                render(_, record: User) {
                  return (
                    <div className="flex items-center gap-x-2">
                      <img
                        src="/svg/trash.svg"
                        alt=""
                        className="cursor-pointer"
                        onClick={() => {
                          Modal.warning({
                            content: 'Are you sure to delete this user ?',
                            okText: 'Delete',
                            okButtonProps: {
                              danger: true,
                              children: 'Delete',
                            },
                            onOk: () =>
                              notification.success({
                                message: 'User Deleted',
                              }),
                          });
                        }}
                      />
                      <img
                        src="/svg/edit.svg"
                        alt=""
                        className="cursor-pointer"
                        onClick={() => {
                          editForm.setFieldsValue({
                            ...record,
                            password: '12345',
                            confirmPassword: '12345',
                            device: ['NCT0012', 'NCT0013'],
                          });
                          setOpenEditUser(true);
                        }}
                      />
                    </div>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
