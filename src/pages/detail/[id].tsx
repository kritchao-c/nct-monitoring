import { NextPage } from 'next';
import { Select } from 'antd';
import { useState } from 'react';
import { faker } from '@faker-js/faker';

import Dashboard from '@/components/SVG/Dashboard';
import DetailBlock, { DetailBlockProps } from '@/components/UI/DeviceDetails/DetailBlock';
import NewSetting from '@/components/SVG/NewSetting';
import EnergyCircle from '@/components/SVG/EnergyCircle';
import CO2 from '@/components/SVG/CO2';
import DollarSign from '@/components/SVG/DollarSign';
import Graph from '@/components/SVG/Graph';
import EnergyChart from '@/components/UI/Chart/EnergyChart';
import DollarCalendar from '@/components/SVG/DollarCalendar';
import PieChart from '@/components/UI/Chart/PieChart';

const fakeProductionData = (count: number) => {
  const data: { date: number; value: number }[] = [];
  const handleDateString = (num: number) => {
    if (num > 9) {
      return `${num}`;
    }
    return `0${num}`;
  };
  for (let i = 0; i < count; i += 1) {
    data.push({
      date: new Date(`2024-${handleDateString(i + 1)}-01`).getTime(),
      value: faker.number.int({ min: 25000, max: 27000 }),
    });
  }
  return data;
};

const fakeConsumptionData = (count: number) => {
  const data: { x: number; y: number }[] = [];
  const handleDateString = (num: number) => {
    if (num > 9) {
      return `${num}`;
    }
    return `0${num}`;
  };
  for (let i = 0; i < count; i += 1) {
    data.push({
      x: new Date(`2024-${handleDateString(i + 1)}-01`).getTime(),
      y: faker.number.int({ min: 20000, max: 30000 }),
    });
  }
  return data;
};

const fakeSavingData = (count: number) => {
  const data: { x: number; y: number }[] = [];
  const handleDateString = (num: number) => {
    if (num > 9) {
      return `${num}`;
    }
    return `0${num}`;
  };
  for (let i = 0; i < count; i += 1) {
    data.push({
      x: new Date(`2024-${handleDateString(i + 1)}-01`).getTime(),
      y: faker.number.int({ min: 20000, max: 30000 }),
    });
  }
  return data;
};

const DeviceDetailPage: NextPage = () => {
  const [selectedGraphs, setSelectedGraph] = useState<any[]>([]);
  const detailBlocks: DetailBlockProps[] = [
    {
      title: (
        <div>
          Overall System <br />
          Efficiency
        </div>
      ),
      icon: <NewSetting />,
      children: '70%',
    },
    {
      title: (
        <div>
          Renewable Energy <br />
          Utilization
        </div>
      ),
      icon: <EnergyCircle />,
      children: '70%',
    },
    {
      title: (
        <div>
          Carbon Emision <br /> Reduction
        </div>
      ),
      icon: <CO2 />,
      children: '70%',
    },
    {
      title: (
        <div>
          Energy Cost <br /> Savings
        </div>
      ),
      icon: <DollarSign />,
      children: (
        <div className="flex items-center gap-x-2">
          150 <span className="text-base">THB</span>
        </div>
      ),
    },
    {
      title: 'Daily Saving',
      icon: <DollarSign />,
      children: (
        <div className="flex items-center gap-x-2">
          150 <span className="text-base">THB</span>
        </div>
      ),
    },
  ];
  return (
    <div className="min-w-screen min-h-screen pb-8">
      <div className="mx-auto flex max-w-[1440px] flex-col px-2 pt-[66px]">
        <div className="flex items-center justify-between gap-x-2 text-[26px] font-semibold">
          <div className="flex items-center gap-x-2">
            <Dashboard />
            Dashboard Bangkok 01
          </div>
        </div>
        {/* SECTION 1 */}
        <div className="grid grid-cols-2 justify-center gap-x-2 gap-y-3 pt-4 sm:grid-cols-3 xl:grid-cols-5">
          {detailBlocks.map((item, key) => {
            return <DetailBlock {...item} key={key} />;
          })}
        </div>

        {/* SECTION 2 */}
        {/* PANEL POWER */}
        <div className="mt-12 flex flex-col items-center justify-center gap-x-8 gap-y-6 sm:flex-row">
          <div className="flex min-h-[347px] min-w-full flex-col items-center gap-y-2 rounded-md border border-neutral-01/20 p-2 px-8 text-[30px] font-medium shadow-md sm:min-w-0">
            <div className="text-center">Panel Power</div>
            <img src="/svg/solar-panel2.svg" className="size-[105px]" alt="" />
            <div>54.12 W</div>
            <div>48.49 V</div>
            <div>45.78 A</div>
          </div>
          <img src="/svg/big-dash.svg" className="hidden lg:block" alt="" />
          {/* BATTERY POWER */}
          <div className="flex min-h-[347px] min-w-full flex-col items-center gap-y-2 rounded-md border border-neutral-01/20 p-2 px-8 text-[30px] font-medium shadow-md sm:min-w-0">
            <div className="text-center">Battery Power</div>
            <img src="/svg/car-battery.svg" className="size-[105px]" alt="" />
            <div>92.50 %</div>
            <div>13.65 V</div>
            <div>08.95 A</div>
          </div>
          <img src="/svg/big-dash.svg" className="hidden lg:block" alt="" />
          {/* LOAD POWER */}
          <div className="flex min-h-[347px] min-w-full flex-col items-center gap-y-2 rounded-md border border-neutral-01/20 p-2 px-8 text-[30px] font-medium shadow-md sm:min-w-0">
            <div className="text-center">Load Power</div>
            <img src="/svg/light-bulb2.svg" className="size-[105px]" alt="" />
            <div>1.2 kW</div>
            <div>220 Vac</div>
            <div>45.78 A</div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="grid grid-cols-12 gap-4 pt-8">
          {/* ENERGY USAGE */}
          <div className="col-span-12 flex  flex-col md:col-span-8">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2 text-[26px] font-semibold">
                <Graph />
                Energy Usage
              </div>
              <Select
                mode="multiple"
                size="large"
                className="mt-2 w-[280px]"
                maxTagCount={'responsive'}
                placeholder="Select Graph"
                showSearch={false}
                value={selectedGraphs}
                onChange={setSelectedGraph}
                options={[
                  { label: 'Production', value: 'production' },
                  { label: 'Consumption', value: 'consumption' },
                  { label: 'Savings', value: 'saving' },
                  { label: 'Panel Voltage', value: 'panelVoltage' },
                ]}
              />
            </div>
            {/* CONTENT */}
            <div className="mt-2 flex h-full min-h-[340px] justify-between rounded-md border border-neutral-01/10 p-4 shadow-xl">
              <EnergyChart
                className="min-h-[300px] w-[75%]"
                productionXKey="date"
                productionYKey="value"
                productionData={fakeProductionData(12)}
                timeUnit="month"
                consumptionData={fakeConsumptionData(12)}
                savingData={fakeSavingData(12)}
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-x-1">
                  <div className="flex size-[10px] rounded-full bg-[#00B8BD] drop-shadow-md" />
                  Production
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="flex size-[10px] rounded-full bg-[#005980] drop-shadow-md" />
                  Consumption
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="flex size-[10px] rounded-full bg-[#BFFFEA] drop-shadow-md" />
                  Saving
                </div>
                <div className="my-4 h-px w-full bg-[#3BA881]"></div>
                <div>Energy consumption: </div>
                <div className="font-semibold">137.23 kWh/month</div>
                <div className="pt-2">House area:</div>
                <div className="font-semibold">125 m2</div>
                <div className="pt-2">Average temperature:</div>
                <div className="font-semibold">50°C</div>
              </div>
            </div>
          </div>

          {/* DAILY ENERGY COST */}
          <div className="col-span-12 flex flex-col md:col-span-4">
            {/* HEADER */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-x-2 text-[26px] font-semibold">
                <DollarCalendar />
                Daily Energy Cost
              </div>
            </div>
            {/* CONTENT */}
            <div className="mt-2.5 flex h-full min-h-[340px] flex-col items-center gap-2 rounded-md border border-neutral-01/10 p-4 shadow-xl">
              <div className="grid w-full grid-cols-1 gap-2 font-semibold xl:grid-cols-3">
                <div className="flex min-h-[70px] w-full flex-col items-center justify-center rounded-md bg-[#0059801A] ">
                  <div className="flex items-center gap-2">
                    <div className="flex size-[10px] rounded-full bg-[#005980] drop-shadow-md" />
                    Production
                  </div>
                  <div className="text-[18px]">236 THB</div>
                </div>
                <div className="flex min-h-[70px] w-full flex-col items-center justify-center rounded-md bg-[#00B8BD1A] ">
                  <div className="flex items-center gap-2">
                    <div className="flex size-[10px] rounded-full bg-[#00B8BD] drop-shadow-md" />
                    Consumption
                  </div>
                  <div className="text-[18px]">90 THB</div>
                </div>
                <div className="flex min-h-[70px] w-full flex-col items-center justify-center rounded-md bg-[#00B8BD1A] ">
                  <div className="flex items-center gap-2">
                    <div className="flex size-[10px] rounded-full bg-[#004082] drop-shadow-md" />
                    Saving
                  </div>
                  <div className="text-[18px]">10 THB</div>
                </div>
              </div>
              <div className="text-[20px] font-semibold">Total: 336 THB</div>
              <PieChart
                className="min-h-[180px] w-full"
                suffixText="THB"
                data={[
                  {
                    x: 'Production',
                    color: '#005980',
                    y: 236,
                  },
                  {
                    x: 'Consumption',
                    color: '#00B8BD',
                    y: 90,
                  },
                  {
                    x: 'Saving',
                    color: '#004082',
                    y: 10,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailPage;
