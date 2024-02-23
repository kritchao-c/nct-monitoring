import { NextPage } from 'next';
import { Select } from 'antd';

import Dashboard from '@/components/SVG/Dashboard';
import DetailBlock, { DetailBlockProps } from '@/components/UI/DeviceDetails/DetailBlock';
import NewSetting from '@/components/SVG/NewSetting';
import EnergyCircle from '@/components/SVG/EnergyCircle';
import CO2 from '@/components/SVG/CO2';
import DollarSign from '@/components/SVG/DollarSign';
import Graph from '@/components/SVG/Graph';

const DeviceDetailPage: NextPage = () => {
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
    <div className="min-w-screen min-h-screen">
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
        <div className="grid grid-cols-12 pt-8">
          <div className="col-span-12 flex flex-col md:col-span-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2 text-[26px] font-semibold">
                <Graph />
                Energy Usage
              </div>
              <Select
                mode="multiple"
                className="mt-2 min-w-[280px]"
                placeholder="Select Graph"
                options={[
                  { label: 'Production', value: 'production' },
                  { label: 'Consumption', value: 'consumption' },
                  { label: 'Savings', value: 'saving' },
                  { label: 'Panel Voltage', value: 'panelVoltage' },
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
