import SlidingDot from './SlidingDot';
import styles from './SpecificDeviceBlock.module.scss';

export interface InnerSpecificDeviceBlockProps {
  deviceName?: string;
  panelPower?: number;
  stageOfCharge?: number;
  loadPower?: boolean;
  powerSaved?: number;
  onClick?: () => void;
}

const InnerSpecificDeviceBlock: React.FC<InnerSpecificDeviceBlockProps> = ({
  deviceName,
  panelPower,
  stageOfCharge,
  loadPower,
  powerSaved,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`${styles.SpecificDeviceBlock} flex cursor-pointer flex-col px-[16px] py-[14px] transition-all hover:shadow-xl`}
    >
      <div className="pb-4 text-[16px] font-semibold">{deviceName}</div>
      <div className="flex items-center justify-between">
        <img
          src={!panelPower || panelPower === 0 ? '/svg/no-solar-panel.svg' : '/svg/solar-panel2.svg'}
          className="size-[55px]"
          alt=""
        />
        {!panelPower || panelPower === 0 ? (
          <img src="/svg/stop-loading.svg" alt="" className="w-[80px] px-2" />
        ) : (
          <SlidingDot />
        )}
        <img
          src={!stageOfCharge || stageOfCharge === 0 ? '/svg/no-battery.svg' : '/svg/car-battery.svg'}
          className="size-[55px]"
          alt=""
        />
        {loadPower ? <SlidingDot /> : <img src="/svg/stop-loading.svg" alt="" className="w-[80px] px-2" />}
        <img src={!loadPower ? '/svg/no-light-bulb.svg' : '/svg/light-bulb2.svg'} className="size-[55px]" alt="" />
      </div>
      <div className="flex items-start justify-between text-[10px]">
        <div className="flex flex-col items-center">
          Panel Power<div className="text-base font-semibold">{panelPower?.toFixed(2)} W</div>
        </div>
        <div />
        <div className="flex flex-col items-center">
          Stage of Charge<div className="pl-1 text-base font-semibold">{stageOfCharge?.toFixed(2)} %</div>
        </div>
        <div />
        <div className="flex flex-col items-center">
          Load Power
          <div />
          <div className="text-base font-semibold">{loadPower ? 'On' : 'Off'}</div>
        </div>
      </div>
      <div className="pt-4 text-center font-semibold">
        Power Savings Today <span className="text-blue-01">{powerSaved?.toFixed(2)}</span> Watt
      </div>
    </div>
  );
};

export default InnerSpecificDeviceBlock;
