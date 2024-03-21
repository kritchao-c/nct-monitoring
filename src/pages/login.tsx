import { Button, Form, Input, notification } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import LanguageToggleButton from '@/components/UI/Button/LanguageToggleButton';
import axo from '@/configs/axios';
import { environments } from '@/configs/environments';
import { UserInfo } from '@/types';
import LoadingScreen from '@/components/UI/LoadingScreen';

interface LoginResponse {
  status: string;
  token: string;
  expireAt: string;
}

export const getServerSideProps: GetServerSideProps = async ({ locale = '' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

type FieldType = {
  username?: string;
  password?: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  // const { locale } = router;
  const { t } = useTranslation('common');
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: { username: string; password: string }) => {
    const { apiUrl, mariaPort } = environments;
    setLoading(true);
    try {
      const res = await axo.post<LoginResponse>(`${apiUrl}:${mariaPort}/login`, values);
      // eslint-disable-next-line no-console
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404 || error.response?.status === 401) {
          notification.error({
            message: 'Username or Password is incorrect',
          });
        } else {
          notification.error({
            message: 'Login failed, Please try again later..',
            description: <div className="italic">reason: {error.message}</div>,
          });
        }
      }
    } finally {
      setLoading(false);
    }
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
        if (res.data) {
          router.push('/');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        localStorage.removeItem('token');
        setPageLoading(false);
      }
    };
    if (token && router.isReady) {
      getUserInfo(token);
    } else {
      setPageLoading(false);
    }
  }, [router]);

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };
  if (pageLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-[#F4F3F3]">
      <div className="mx-4 flex w-full max-w-[845px] flex-col items-center gap-y-4 rounded-3xl bg-[#FFF] px-4 pb-8 pt-6 md:mx-0">
        <LanguageToggleButton className="cursor-pointer self-end pr-2" />
        <img src="/img/logo.png" className="mx-auto max-h-[231px] max-w-[268px]" alt="" />
        <div className="text-[45px] font-semibold">NCT</div>
        <div className="text-xl font-semibold">{t('login-title')}</div>
        <Form
          name="basic"
          style={{ maxWidth: 560, width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label={<div className="font-semibold">Username</div>}
            name="username"
            required={false}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label={<div className="font-semibold">Password</div>}
            name="password"
            required={false}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="min-w-full bg-blue-01">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
