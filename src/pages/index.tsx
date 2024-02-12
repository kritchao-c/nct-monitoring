import { Button, Select } from 'antd';

import SimpleBarChart from '@/components/UI/Chart/SimpleBarChart';
import DeviceBlock from '@/components/UI/DeviceBlock/DeviceBlock';

import Thailand from '../components/SVG/Thailand';

export default function Home() {
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

  return (
    <>
      <div className="fixed right-0 top-0 z-20 mx-auto px-8 pt-8">
        <Button>Logout</Button>
      </div>
      <div className="relative flex min-w-full justify-center overflow-auto">
        {/* NORTHERN */}
        <div className="absolute left-[55px] top-[184px] flex gap-x-4">
          <DeviceBlock
            criticalCount={4}
            warningCount={5}
            deviceName="Device 17"
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
        <div className="absolute left-[153px] top-[670px] flex gap-x-4">
          <DeviceBlock
            criticalCount={4}
            warningCount={5}
            deviceName="Device 17"
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
        <div className="absolute bottom-[190px] left-[80px] flex gap-x-4">
          <DeviceBlock
            criticalCount={4}
            warningCount={5}
            deviceName="Device 17"
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
        <div className="absolute right-[80px] top-[292px] flex gap-x-4">
          <div className="hidden items-center 2xl:flex">
            <div className="-mr-1 h-1 w-[80px] bg-dark-01"></div>
            <div className="size-4 rounded-full bg-dark-01"></div>
          </div>
          <DeviceBlock
            criticalCount={4}
            warningCount={5}
            deviceName="Device 17"
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

        <div className="fixed bottom-2 right-0 z-20 flex h-[509px] w-[410px] flex-col rounded-md border border-neutral-01/20 bg-[#FFF] px-[26px] pt-[23px]">
          {/* HEADER */}
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

        <Thailand
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
        />
      </div>
    </>
  );
}
