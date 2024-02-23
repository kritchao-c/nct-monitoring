import styles from './SpecificDeviceBlock.module.scss';

export interface SpecificDeviceBlockProps {
  deviceName?: string;
  unitCount?: number;
  panelPower?: DeviceStatus;
  stageOfCharge?: DeviceStatus;
  loadPower?: DeviceStatus;
  critical?: number;
  warning?: number;
  onClick?: () => void;
}

interface DeviceStatus {
  online: number;
  offline: number;
}

const SpecificDeviceBlock: React.FC<SpecificDeviceBlockProps> = ({
  deviceName,
  panelPower,
  stageOfCharge,
  loadPower,
  critical = 0,
  warning = 0,
  unitCount = 0,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`${styles.SpecificDeviceBlock} flex cursor-pointer flex-col px-[20px] py-[14px] transition-all hover:shadow-xl`}
    >
      <div className="flex items-center justify-between gap-x-8">
        <div className="max-w-[150px] truncate pb-4 text-[16px] font-semibold">{deviceName}</div>
        <div className="pb-4 text-[14px] font-semibold">Device {unitCount} Unit</div>
      </div>
      <div className="flex items-center justify-between">
        <img src="/svg/solar-panel2.svg" className="size-[55px]" alt="" />
        <img src="/svg/dash.svg" alt="" />
        <img src="/svg/car-battery.svg" className="size-[55px]" alt="" />
        <img src="/svg/dash.svg" alt="" />
        <img src="/svg/light-bulb2.svg" className="size-[55px]" alt="" />
      </div>
      <div className="flex items-center justify-between pt-2 text-[10px]">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-x-1">
            <div className="flex size-[10px] rounded-full bg-green-01 drop-shadow-md" />
            Online {panelPower?.online || '-'}
          </div>
          <div className="flex items-center gap-x-1">
            <div className="flex size-[10px] rounded-full bg-red-01 drop-shadow-md" />
            Offline {panelPower?.offline || '-'}
          </div>
        </div>
        <div />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-x-1">
            <div className="flex size-[10px] rounded-full bg-green-01 drop-shadow-md" />
            Online {stageOfCharge?.online || '-'}
          </div>
          <div className="flex items-center gap-x-1">
            <div className="flex size-[10px] rounded-full bg-red-01 drop-shadow-md" />
            Offline {stageOfCharge?.offline || '-'}
          </div>
        </div>
        <div />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-x-1">
            <div className="flex size-[10px] rounded-full bg-green-01 drop-shadow-md" />
            Online {loadPower?.online || '-'}
          </div>
          <div className="flex items-center gap-x-1">
            <div className="flex size-[10px] rounded-full bg-red-01 drop-shadow-md" />
            Offline {loadPower?.offline || '-'}
          </div>
        </div>
      </div>
      <div className="mt-4 h-px w-3/4 self-center bg-neutral-01/50 px-4"></div>
      <div className="flex items-center justify-center gap-x-4 text-lg">
        <div className="font-semibold text-red-01">Critical {critical}</div>
        <div className="font-semibold text-yellow-01">Warning {warning}</div>
      </div>
    </div>
  );
};

export default SpecificDeviceBlock;
