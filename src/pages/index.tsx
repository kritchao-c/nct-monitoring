import { Button, Drawer, FloatButton, Modal, Select } from 'antd';
import { DownOutlined, LineChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { faker } from '@faker-js/faker';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import SimpleBarChart from '@/components/UI/Chart/SimpleBarChart';
import DeviceBlock, { DeviceBlockNotification } from '@/components/UI/DeviceBlock/DeviceBlock';
import ThailandChart from '@/components/UI/Chart/ThailandChart';
import SpecificDeviceBlock, { SpecificDeviceBlockProps } from '@/components/UI/DeviceBlock/SpecificDeviceBlock';
import InnerSpecificDeviceBlock, {
  InnerSpecificDeviceBlockProps,
} from '@/components/UI/DeviceBlock/InnerSpecificDeviceBlock';
import LanguageToggleButton from '@/components/UI/Button/LanguageToggleButton';

export const getServerSideProps: GetServerSideProps = async ({ locale = '' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const mockRegionDevicesFunc = (): SpecificDeviceBlockProps => {
  return {
    deviceName: faker.commerce.productName(),
    panelPower: {
      online: faker.number.int({ min: 0, max: 50 }),
      offline: faker.number.int({ min: 0, max: 50 }),
    },
    loadPower: {
      online: faker.number.int({ min: 0, max: 50 }),
      offline: faker.number.int({ min: 0, max: 50 }),
    },
    stageOfCharge: {
      online: faker.number.int({ min: 0, max: 50 }),
      offline: faker.number.int({ min: 0, max: 50 }),
    },
    critical: faker.number.int({ min: 0, max: 50 }),
    warning: faker.number.int({ min: 0, max: 50 }),
    unitCount: faker.number.int({ min: 0, max: 50 }),
  };
};
const mockInnerDevicesFunc = (): InnerSpecificDeviceBlockProps => {
  return {
    deviceName: faker.commerce.productName(),
    panelPower: faker.number.float({ min: 0, max: 200, fractionDigits: 2 }),
    loadPower: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
    stageOfCharge: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
    powerSaved: faker.number.float({ min: 100, max: 2000, fractionDigits: 2 }),
  };
};

const mockRegionDevices = faker.helpers.multiple(mockRegionDevicesFunc, { count: 10 });
const mockInnerDevices = faker.helpers.multiple(mockInnerDevicesFunc, { count: 10 });

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  // const { locale } = router;
  const [showDevices, setShowDevices] = useState(false);
  const [showSideData, setShowSideData] = useState(false);
  const [showInnerSideData, setShowInnerSideData] = useState(false);
  const chart1Data = [
    {
      date: '2024-01-01',
      value: 200,
    },
    {
      date: '2024-01-02',
      value: 300,
    },
    {
      date: '2024-01-03',
      value: 250,
    },
    {
      date: '2024-01-04',
      value: 290,
    },
    {
      date: '2024-01-05',
      value: 190,
    },
    {
      date: '2024-01-06',
      value: 320,
    },
    {
      date: '2024-01-07',
      value: 270,
    },
  ];

  const mockChartStatus: DeviceBlockNotification[] = [
    {
      type: 'danger',
      title: 'Chiang Mai Battery Off',
      description: 'Please   xxxxxxxx xxxxxxxxxxx xxxxx xxxx xxxxxxxxxx xxxxxx xxxxx xxx xxx xxxxxxxx xxxx xxxxxxx',
    },
    {
      type: 'info',
      title: 'Lampang Solar Panel Off',
      description: 'Please   xxxxxxxx xxxxxxxxxxx xxxxx xxxx xxxxxxxxxx xxxxxx xxxxx xxx xxx xxxxxxxx xxxx xxxxxxx',
    },
    {
      type: 'warning',
      title: 'Mae Hong Son MPPT Warning',
      description: 'Please   xxxxxxxx xxxxxxxxxxx xxxxx xxxx xxxxxxxxxx xxxxxx xxxxx xxx xxx xxxxxxxx xxxx xxxxxxx',
    },
  ];

  const mockData = [
    {
      title: 'Device 1',
      latitude: 18.807347862055344,
      longitude: 98.89559389865217,
    },
    {
      title: 'Device 2',
      latitude: 13.895475858583062,
      longitude: 100.34681463561515,
    },
    {
      title: 'Device 3',
      latitude: 14.096725463344901,
      longitude: 101.12581642666886,
    },
    {
      title: 'Device 4',
      latitude: 15.981243110460131,
      longitude: 103.73698540880565,
    },
    {
      title: 'Device 5',
      latitude: 8.995852165733474,
      longitude: 99.12451153911717,
    },
  ];

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
    <div>
      <div className="fixed right-0 top-0 z-20 mx-auto px-8 pt-8">
        <div className="flex items-center gap-x-4">
          <LanguageToggleButton className="" />
          <Button danger size="large" onClick={() => handleLogout()} icon={<LogoutOutlined />}>
            Logout
          </Button>
        </div>
      </div>
      {!showDevices && (
        <FloatButton tooltip={'Devices'} onClick={() => setShowDevices(true)} icon={<LineChartOutlined />} />
      )}

      <Drawer width={419} title={null} placement="left" open={showSideData} onClose={() => setShowSideData(false)}>
        <div className="flex flex-col gap-y-[25px]">
          {mockRegionDevices.map((item, key) => {
            return <SpecificDeviceBlock onClick={() => setShowInnerSideData(true)} {...item} key={key} />;
          })}
        </div>
      </Drawer>

      <Drawer
        width={419}
        title={null}
        placement="left"
        open={showInnerSideData}
        onClose={() => setShowInnerSideData(false)}
      >
        <div className="flex flex-col gap-y-[25px]">
          {mockInnerDevices.map((item, key) => {
            return <InnerSpecificDeviceBlock onClick={() => router.push('/detail/mockid')} {...item} key={key} />;
          })}
        </div>
      </Drawer>

      <div className="relative flex min-h-screen min-w-full items-center justify-center overflow-auto ">
        <ThailandChart data={mockData} className="absolute inset-0 mx-auto size-full min-h-[400px] max-w-[1280px]" />

        {/* NORTHERN */}
        <div className="absolute left-[55px] top-[10%] flex gap-x-4">
          <DeviceBlock
            onClick={() => {
              setShowSideData(true);
            }}
            notification={mockChartStatus}
            criticalCount={4}
            warningCount={5}
            deviceName={`${t('device')} 17`}
            offlineCount={1}
            onlineCount={1}
            onlineStatus={{
              light: {
                offline: 1,
                online: 1,
              },
              battery: {
                offline: 1,
                online: 1,
              },
              solar: {
                offline: 1,
                online: 1,
              },
            }}
          />
          <div className="hidden items-center 2xl:flex">
            <div className="size-4 rounded-full bg-dark-01"></div>
            <div className="-ml-1 h-1 w-[80px] bg-dark-01"></div>
          </div>
        </div>

        {/* CENTRAL */}
        <div className="absolute left-[153px] top-[45%] flex gap-x-4">
          <DeviceBlock
            onClick={() => {
              setShowSideData(true);
            }}
            notification={mockChartStatus}
            criticalCount={4}
            warningCount={5}
            deviceName={`${t('device')} 17`}
            offlineCount={1}
            onlineCount={1}
            onlineStatus={{
              light: {
                offline: 1,
                online: 1,
              },
              battery: {
                offline: 1,
                online: 1,
              },
              solar: {
                offline: 1,
                online: 1,
              },
            }}
          />
          <div className="hidden items-center 2xl:flex">
            <div className="size-4 rounded-full bg-dark-01"></div>
            <div className="-ml-1 h-1 w-[80px] bg-dark-01"></div>
          </div>
        </div>

        {/* SOUTHERN */}
        <div className="absolute bottom-[10%] left-[80px] flex gap-x-4">
          <DeviceBlock
            onClick={() => {
              setShowSideData(true);
            }}
            notification={mockChartStatus}
            criticalCount={4}
            warningCount={5}
            deviceName={`${t('device')} 17`}
            offlineCount={1}
            onlineCount={1}
            onlineStatus={{
              light: {
                offline: 1,
                online: 1,
              },
              battery: {
                offline: 1,
                online: 1,
              },
              solar: {
                offline: 1,
                online: 1,
              },
            }}
          />
          <div className="hidden items-center 2xl:flex">
            <div className="size-4 rounded-full bg-dark-01"></div>
            <div className="-ml-1 h-1 w-[80px] bg-dark-01"></div>
          </div>
        </div>

        {/* NORTHERN EAST */}
        <div className="absolute right-[80px] top-[30%] z-20 flex gap-x-4">
          <div className="hidden items-center 2xl:flex">
            <div className="-mr-1 h-1 w-[80px] bg-dark-01"></div>
            <div className="size-4 rounded-full bg-dark-01"></div>
          </div>
          <DeviceBlock
            onClick={() => {
              setShowSideData(true);
            }}
            notification={mockChartStatus}
            criticalCount={4}
            warningCount={5}
            deviceName={`${t('device')} 17`}
            offlineCount={1}
            onlineCount={1}
            onlineStatus={{
              light: {
                offline: 1,
                online: 1,
              },
              battery: {
                offline: 1,
                online: 1,
              },
              solar: {
                offline: 1,
                online: 1,
              },
            }}
          />
        </div>

        {/* Devices block */}
        {showDevices && (
          <div className="fixed bottom-2 right-0 z-20 flex h-[509px] w-[410px] flex-col rounded-md border border-neutral-01/20 bg-[#FFF] px-[26px] pt-[23px]">
            {/* HEADER */}
            <DownOutlined className="absolute right-2 top-2 cursor-pointer" onClick={() => setShowDevices(false)} />
            <div className="flex items-center justify-between">
              <div className="text-2xl">All Device: 98</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-x-2">
                  <div className="flex size-[10px] rounded-full bg-green-01 drop-shadow-md"></div>
                  <div className="">Online 90</div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="flex size-[10px] rounded-full bg-red-01 drop-shadow-md"></div>
                  <div className="">Offline 8</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-x-2 rounded-xl border border-neutral-01/20 p-4 shadow-lg">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#00B8BD]">
                    <img src="/img/lightning.png" alt="" />
                  </div>
                  <div className="text-2xl">Load Table</div>
                </div>

                <Select
                  defaultValue={'day'}
                  variant="borderless"
                  size="large"
                  options={[
                    {
                      label: 'Week',
                      value: 'day',
                    },
                    {
                      label: 'Month',
                      value: 'month',
                    },
                    {
                      label: 'Year',
                      value: 'year',
                    },
                  ]}
                />
              </div>
              <SimpleBarChart
                data={chart1Data}
                xKey="date"
                yKey="value"
                divId="testroot"
                className="h-[120px] w-full"
                timeUnit="day"
                suffixText="kWh"
              />
            </div>
            <div className="mt-4 flex flex-col gap-x-2 rounded-xl border border-neutral-01/20 p-4 shadow-lg">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#00B8BD]">
                    <img src="/img/dollar.png" alt="" />
                  </div>
                  <div className="text-2xl">Money Saving</div>
                </div>

                <Select
                  defaultValue={'day'}
                  variant="borderless"
                  size="large"
                  options={[
                    {
                      label: 'Week',
                      value: 'day',
                    },
                    {
                      label: 'Month',
                      value: 'month',
                    },
                    {
                      label: 'Year',
                      value: 'year',
                    },
                  ]}
                />
              </div>
              <SimpleBarChart
                data={chart1Data}
                xKey="date"
                yKey="value"
                divId="testroot2"
                className="h-[120px] w-full"
                timeUnit="day"
                suffixText="THB"
              />
            </div>
          </div>
        )}

        {/* <Thailand
          className="mx-auto max-w-[50%] md:max-w-[800px]"
          onCentralClick={() => {
            console.log('central');
          }}
          onNorthClick={() => {
            console.log('north');
          }}
          onNorthEastClick={() => {
            console.log('northeast');
          }}
          onSouthClick={() => {
            console.log('south');
          }}
        /> */}
      </div>
    </div>
  );
}
