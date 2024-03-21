import { Badge, Button, DatePicker, Drawer, FloatButton, Input, Modal, Select, Skeleton } from 'antd';
import {
  BellOutlined,
  CloseOutlined,
  DownOutlined,
  ExportOutlined,
  LineChartOutlined,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { faker } from '@faker-js/faker';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';

import SimpleBarChart from '@/components/UI/Chart/SimpleBarChart';
import { DeviceBlockNotification } from '@/components/UI/DeviceBlock/DeviceBlock';
import ThailandChart, { PointData } from '@/components/UI/Chart/ThailandChart';
import SpecificDeviceBlock, { SpecificDeviceBlockProps } from '@/components/UI/DeviceBlock/SpecificDeviceBlock';
import InnerSpecificDeviceBlock, {
  InnerSpecificDeviceBlockProps,
} from '@/components/UI/DeviceBlock/InnerSpecificDeviceBlock';
import LanguageToggleButton from '@/components/UI/Button/LanguageToggleButton';
import axo from '@/configs/axios';
import { environments } from '@/configs/environments';
import {
  GraphPeriods,
  OverallGraphResponse,
  OverallNotificationsResponse,
  OverallNotificationsResult,
  OverallRegion,
  OverallResponse,
  UserInfo,
} from '@/types';
import LoadingScreen from '@/components/UI/LoadingScreen';
import { handleNotificationType, handlePeriod, sortObjectsByDateTimeKey } from '@/utils/string';

const DeviceBlock = dynamic(() => import('@/components/UI/DeviceBlock/DeviceBlock'), { ssr: false });
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

const timeOptions = [
  {
    label: 'Minute',
    value: '1min',
  },
  {
    label: 'Hourly',
    value: '1H',
  },
  {
    label: 'Daily',
    value: '1D',
  },
  {
    label: 'Weekly',
    value: '1W',
  },
  {
    label: 'Monthly',
    value: '1M',
  },
  {
    label: 'Yearly',
    value: '1Y',
  },
];

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [showNotification, setShowNotification] = useState(false);
  const [showExportNotification, setShowExportNotification] = useState(false);
  const [notifications, setNotifications] = useState<DeviceBlockNotification[]>([]);
  const [rawNotifications, setRawNotification] = useState<OverallNotificationsResult[]>([]);
  // const { locale } = router;
  const [showDevices, setShowDevices] = useState(false);
  const [showSideData, setShowSideData] = useState(false);
  const [showInnerSideData, setShowInnerSideData] = useState(false);
  const [allDevice, setAllDevice] = useState(0);
  const [onlineDevice, setOnlineDevice] = useState(0);
  const [offlineDevice, setOfflineDevice] = useState(0);
  const [geoData, setGeoData] = useState<PointData[]>([]);
  const [regionData, setRegionData] = useState<OverallRegion[]>([]);
  const [loadGraphLoading, setLoadGraphLoading] = useState(true);
  const [savingsGraphLoading, setSavingsGraphLoading] = useState(true);
  const [loadData, setLoadData] = useState<any[]>([]);
  const [loadDataPeriod, setLoadDataPeriod] = useState<GraphPeriods>('1M');
  const [savingsData, setSavingsData] = useState<any[]>([]);
  const [savingsDataPeriod, setSavingsDataPeriod] = useState<GraphPeriods>('1M');

  const CentralData = regionData.find(v => v.region === 'Central');
  const NorthData = regionData.find(v => v.region === 'Northern');
  const NortheastData = regionData.find(v => v.region === 'Isan');
  const SouthData = regionData.find(v => v.region === 'Southern');

  const centralNotification = rawNotifications.filter(v => v.region === 'Central');
  const northNotification = rawNotifications.filter(v => v.region === 'Northern');
  const northeastNotification = rawNotifications.filter(v => v.region === 'Isan');
  const southNotification = rawNotifications.filter(v => v.region === 'Southern');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getUserInfo = async (tk: string) => {
      try {
        const { apiUrl, mariaPort, apiPort } = environments;
        const res = await axo.get<UserInfo>(`${apiUrl}:${mariaPort}/info`, {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        });
        if (res) {
          const data = await axo.get<OverallResponse>(`${apiUrl}:${apiPort}/regions/device`);
          setAllDevice(data.data.result.total.alllDevice);
          setOnlineDevice(data.data.result.total.allOnline);
          setOfflineDevice(data.data.result.total.allOffline);
          const newGeoData = data.data.result.geoMap.map(v => {
            return {
              title: v.name,
              latitude: v.latitude,
              longitude: v.longtitude,
            };
          });
          setGeoData(newGeoData);
          setRegionData(data.data.result.regions);
          const noti = await axo.get<OverallNotificationsResponse>(`${apiUrl}:${apiPort}/notification`);
          const newNotiData: DeviceBlockNotification[] = noti.data.result.map(v => {
            return {
              title: `${v.device} ${v.title}`,
              description: v.description,
              type: handleNotificationType(v.status),
            };
          });
          setRawNotification(noti.data.result);
          setNotifications(newNotiData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    if (token && router.isReady) {
      getUserInfo(token);
    } else {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  // Load graph
  useEffect(() => {
    const controller = new AbortController();
    const getLoadGraphData = async () => {
      setLoadGraphLoading(true);
      try {
        const { apiUrl, apiPort } = environments;
        const data = await axo.get<OverallGraphResponse>(`${apiUrl}:${apiPort}/home/graph/type`, {
          params: {
            period: loadDataPeriod,
            type: 'LoadTable',
          },
          signal: controller.signal,
        });
        const newData = sortObjectsByDateTimeKey(data.data.result.data, 'datetime')
          .filter(v => !!v.value)
          .map(v => {
            const newV = v;
            // @ts-ignore
            newV.datetime = dayjs(v.datetime).format(handlePeriod(loadDataPeriod));
            return newV;
          });
        setLoadData(newData);
      } catch (error) {
        if (error instanceof AxiosError && error.code !== 'ERR_CANCELED') {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      } finally {
        setLoadGraphLoading(false);
      }
    };
    getLoadGraphData();
    return () => controller.abort();
  }, [loadDataPeriod]);

  // Savings graph
  useEffect(() => {
    const controller = new AbortController();
    const getSavingsGraphData = async () => {
      setSavingsGraphLoading(true);
      try {
        const { apiUrl, apiPort } = environments;
        const data = await axo.get<OverallGraphResponse>(`${apiUrl}:${apiPort}/home/graph/type`, {
          params: {
            period: savingsDataPeriod,
            type: 'MoneySaving',
          },
          signal: controller.signal,
        });
        const newData = sortObjectsByDateTimeKey(data.data.result.data, 'datetime')
          .filter(v => !!v.value)
          .map(v => {
            const newV = v;
            // @ts-ignore
            newV.datetime = dayjs(v.datetime).format(handlePeriod(savingsDataPeriod));
            return newV;
          });
        setSavingsData(newData);
      } catch (error) {
        if (error instanceof AxiosError && error.code !== 'ERR_CANCELED') {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      } finally {
        setSavingsGraphLoading(false);
      }
    };
    getSavingsGraphData();
    return () => controller.abort();
  }, [savingsDataPeriod]);

  const handleLogoutFunc = () => {
    setLoading(true);
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {/* EXPORT ALARM MODAL */}
      <Modal
        title={'Export Alarm'}
        footer={null}
        closable
        open={showExportNotification}
        onCancel={() => setShowExportNotification(false)}
      >
        <div className="flex items-end gap-x-4">
          <div className="flex flex-col gap-2">
            <div>{t('selectDate')}</div>
            <DatePicker.RangePicker />
          </div>
          <div className="flex flex-col gap-2">
            <div>{t('selectRegion')}</div>
            <Select
              className="min-w-[120px]"
              placeholder={t('selectRegion')}
              options={[
                {
                  label: t('all'),
                  value: 'all',
                },
                {
                  label: t('northernDevice'),
                  value: 'northern',
                },
                {
                  label: t('centralDevice'),
                  value: 'central',
                },
                {
                  label: t('northeastDevice'),
                  value: 'northeast',
                },
                {
                  label: t('southernDevice'),
                  value: 'southern',
                },
              ]}
            />
          </div>
          <Button className="bg-blue-01 hover:bg-blue-01/80" type="primary">
            Export
          </Button>
        </div>
      </Modal>
      <div className="fixed right-0 top-0 z-30 mx-auto px-8 pt-8">
        <div className="flex items-center gap-x-4">
          <div className="relative z-30">
            {/* NOTIFICATIONS */}
            <Badge count={notifications.length} className="mr-3">
              {showNotification && (
                <div
                  style={{ zIndex: 1000 }}
                  className="fixed right-5 top-5 flex min-w-[400px] flex-col gap-y-[21px] shadow-md md:absolute"
                >
                  <div className="min-size-full z-30 max-h-[500px] overflow-auto rounded-md border border-neutral-01/20 bg-white/80 p-4">
                    <div className="flex flex-col gap-y-[21px]">
                      <div className="">
                        <div className="flex items-center justify-between">
                          <div className="font-bold">All Alarms</div>
                          <div className="flex items-center gap-x-2">
                            <Button onClick={() => setShowExportNotification(true)} icon={<ExportOutlined />}>
                              Export
                            </Button>
                            <CloseOutlined
                              className="cursor-pointer text-xl"
                              onClick={() => setShowNotification(false)}
                            />
                          </div>
                        </div>
                      </div>
                      {!notifications || notifications?.length === 0 ? (
                        <div className="flex items-center justify-center text-center">No notification...</div>
                      ) : undefined}
                      <div className="flex max-h-full flex-col gap-y-2">
                        {notifications?.map((item, key) => {
                          let svg = '/svg/info.svg';
                          let textColor = 'text-[#33CCEE]';
                          switch (item.type) {
                            case 'danger':
                              textColor = 'text-red-01';
                              svg = '/svg/danger.svg';
                              break;
                            case 'warning':
                              textColor = 'text-[#EE7700]';
                              svg = '/svg/warning.svg';
                              break;

                            default:
                              break;
                          }
                          return (
                            <div
                              key={key}
                              className="flex items-start gap-x-2 rounded-md border border-neutral-01/20 bg-white p-4 shadow-lg"
                            >
                              <img src={svg} alt="" />
                              <div className="flex flex-col gap-y-2">
                                <div className={`text-sm font-semibold ${textColor}`}>{item.title}</div>
                                <div className="text-[12px] leading-normal">{item.description}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <BellOutlined onClick={() => setShowNotification(!showNotification)} className="cursor-pointer text-xl" />
            </Badge>
          </div>

          <LanguageToggleButton className="" />
          <Button danger size="large" onClick={() => handleLogout()} icon={<LogoutOutlined />}>
            Logout
          </Button>
        </div>
      </div>
      {!showDevices && (
        <FloatButton tooltip={'Devices'} onClick={() => setShowDevices(true)} icon={<LineChartOutlined />} />
      )}

      {/* SIDE DATA */}
      <Drawer
        width={419}
        title={<Input placeholder="input search text" addonAfter={<SearchOutlined />} />}
        placement="left"
        open={showSideData}
        onClose={() => setShowSideData(false)}
      >
        <div className="flex flex-col gap-y-[25px]">
          {mockRegionDevices.map((item, key) => {
            return <SpecificDeviceBlock onClick={() => setShowInnerSideData(true)} {...item} key={key} />;
          })}
        </div>
      </Drawer>

      {/* INNER SIDE DATA */}
      <Drawer
        width={419}
        title={<Input placeholder="input search text" addonAfter={<SearchOutlined />} />}
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
        <ThailandChart data={geoData} className="absolute inset-0 mx-auto size-full min-h-[400px] max-w-[1280px]" />

        {/* NORTHERN */}
        <div className="absolute left-[55px] top-[10%] flex gap-x-4">
          <DeviceBlock
            onClick={() => {
              setShowSideData(true);
            }}
            deviceName={t('northernDevice')}
            deviceCount={NorthData?.amount}
            notification={northNotification?.map(v => {
              return (
                {
                  title: `${v.device} ${v.title}`,
                  description: v.description,
                  type: handleNotificationType(v.status),
                } || []
              );
            })}
            criticalCount={NorthData?.criticalAll}
            warningCount={NorthData?.warning}
            offlineCount={NorthData?.deviceOffline}
            onlineCount={NorthData?.deviceOnline}
            onlineStatus={{
              light: {
                offline: NorthData?.loadOffline,
                online: NorthData?.loadOnline,
              },
              battery: {
                offline: NorthData?.batteryOffline,
                online: NorthData?.batteryOnline,
              },
              solar: {
                offline: NorthData?.panelOffline,
                online: NorthData?.panelOnline,
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
            deviceName={t('centralDevice')}
            deviceCount={CentralData?.amount}
            notification={centralNotification?.map(v => {
              return (
                {
                  title: `${v.device} ${v.title}`,
                  description: v.description,
                  type: handleNotificationType(v.status),
                } || []
              );
            })}
            criticalCount={CentralData?.criticalAll}
            warningCount={CentralData?.warning}
            offlineCount={CentralData?.deviceOffline}
            onlineCount={CentralData?.deviceOnline}
            onlineStatus={{
              light: {
                offline: CentralData?.loadOffline,
                online: CentralData?.loadOnline,
              },
              battery: {
                offline: CentralData?.batteryOffline,
                online: CentralData?.batteryOnline,
              },
              solar: {
                offline: CentralData?.panelOffline,
                online: CentralData?.panelOnline,
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
            deviceName={t('southernDevice')}
            deviceCount={SouthData?.amount}
            notification={southNotification?.map(v => {
              return (
                {
                  title: `${v.device} ${v.title}`,
                  description: v.description,
                  type: handleNotificationType(v.status),
                } || []
              );
            })}
            criticalCount={SouthData?.criticalAll}
            warningCount={SouthData?.warning}
            offlineCount={SouthData?.deviceOffline}
            onlineCount={SouthData?.deviceOnline}
            onlineStatus={{
              light: {
                offline: SouthData?.loadOffline,
                online: SouthData?.loadOnline,
              },
              battery: {
                offline: SouthData?.batteryOffline,
                online: SouthData?.batteryOnline,
              },
              solar: {
                offline: SouthData?.panelOffline,
                online: SouthData?.panelOnline,
              },
            }}
          />
          <div className="hidden items-center 2xl:flex">
            <div className="size-4 rounded-full bg-dark-01"></div>
            <div className="-ml-1 h-1 w-[80px] bg-dark-01"></div>
          </div>
        </div>

        {/* NORTHERN EAST */}
        <div className="absolute right-[80px] top-[30%] z-10 flex gap-x-4">
          <div className="hidden items-center 2xl:flex">
            <div className="-mr-1 h-1 w-[80px] bg-dark-01"></div>
            <div className="size-4 rounded-full bg-dark-01"></div>
          </div>
          <DeviceBlock
            onClick={() => {
              setShowSideData(true);
            }}
            deviceName={t('northeastDevice')}
            deviceCount={NortheastData?.amount}
            notification={northeastNotification?.map(v => {
              return (
                {
                  title: `${v.device} ${v.title}`,
                  description: v.description,
                  type: handleNotificationType(v.status),
                } || []
              );
            })}
            criticalCount={NortheastData?.criticalAll}
            warningCount={NortheastData?.warning}
            offlineCount={NortheastData?.deviceOffline}
            onlineCount={NortheastData?.deviceOnline}
            onlineStatus={{
              light: {
                offline: NortheastData?.loadOffline,
                online: NortheastData?.loadOnline,
              },
              battery: {
                offline: NortheastData?.batteryOffline,
                online: NortheastData?.batteryOnline,
              },
              solar: {
                offline: NortheastData?.panelOffline,
                online: NortheastData?.panelOnline,
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
              <div className="text-2xl">All Device: {allDevice}</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-x-2">
                  <div className="flex size-[10px] rounded-full bg-green-01 drop-shadow-md"></div>
                  <div className="">Online {onlineDevice}</div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="flex size-[10px] rounded-full bg-red-01 drop-shadow-md"></div>
                  <div className="">Offline {offlineDevice}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-x-2 rounded-xl border border-neutral-01/20 p-4 shadow-lg">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#00B8BD]">
                    <img src="/img/lightning.png" alt="" />
                  </div>
                  <div className="text-xl">Load Table</div>
                </div>

                <Select
                  variant="borderless"
                  className="w-[100px]"
                  value={loadDataPeriod}
                  onChange={setLoadDataPeriod}
                  size="large"
                  options={timeOptions}
                />
              </div>
              {loadGraphLoading ? (
                <Skeleton paragraph={{ rows: 3 }} active />
              ) : (
                <SimpleBarChart
                  data={loadData}
                  xKey="datetime"
                  yKey="value"
                  divId="testroot"
                  className="h-[120px] w-full"
                  suffixText="Wh"
                />
              )}
            </div>
            <div className="mt-4 flex flex-col gap-x-2 rounded-xl border border-neutral-01/20 p-4 shadow-lg">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#00B8BD]">
                    <img src="/img/dollar.png" alt="" />
                  </div>
                  <div className="text-xl">Money Saving</div>
                </div>

                <Select
                  variant="borderless"
                  size="large"
                  className="w-[100px]"
                  value={savingsDataPeriod}
                  onChange={setSavingsDataPeriod}
                  options={timeOptions}
                />
              </div>
              {savingsGraphLoading ? (
                <Skeleton paragraph={{ rows: 3 }} active />
              ) : (
                <SimpleBarChart
                  data={savingsData}
                  xKey="datetime"
                  yKey="value"
                  divId="testroot2"
                  className="h-[120px] w-full"
                  suffixText="THB"
                />
              )}
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
