import styles from './SpecificDeviceBlock.module.scss';

const SpecificDeviceBlock: React.FC = () => {
  return (
    <div
      className={`${styles.SpecificDeviceBlock} flex cursor-pointer flex-col px-[16px] py-[14px] transition-all hover:shadow-xl`}
    >
      <div className="pb-4 text-[16px] font-semibold">Chiang Mai 01</div>
      <div className="flex items-center justify-between">
        <img src="/svg/solar-panel.svg" className="size-[55px]" alt="" />
        <img src="/svg/dash.svg" alt="" />
        <img src="/svg/car-battery.svg" className="size-[55px]" alt="" />
        <img src="/svg/dash.svg" alt="" />
        <img src="/svg/light-bulb.svg" className="size-[55px]" alt="" />
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex flex-col items-center">
          Panel Power<div className="text-base font-semibold">0 W</div>
        </div>
        <div />
        <div className="flex flex-col items-center">
          Stage of Charge<div className="pl-1 text-base font-semibold">80.88 %</div>
        </div>
        <div />
        <div className="flex flex-col items-center">
          Load Power<div className="text-base font-semibold">3.5 kW</div>
        </div>
      </div>
      <div className="pt-4 text-center font-semibold">
        Power Savings Today <span className="text-blue-01">2250.11</span> Watt
      </div>
    </div>
  );
};

export default SpecificDeviceBlock;
