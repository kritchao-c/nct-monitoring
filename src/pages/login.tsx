import { Button, Form, Input } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LanguageToggleButton from '@/components/UI/Button/LanguageToggleButton';

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
  const onFinish = (values: any) => {
    console.log('Success:', values);
    router.push('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
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
            <Button type="primary" htmlType="submit" className="min-w-full bg-blue-01">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
