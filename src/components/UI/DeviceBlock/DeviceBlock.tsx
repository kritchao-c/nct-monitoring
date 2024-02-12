import Critical from '@/components/SVG/Critical';
import Warning from '@/components/SVG/Warning';

import styles from './DeviceBlock.module.scss';

export interface DeviceBlockProps {
  className?: string;
  criticalCount?: number;
  warningCount?: number;
  deviceName?: string;
  onlineCount?: number;
  offlineCount?: number;
  onlineStatus?: {
    solar?: {
      online?: number;
      offline?: number;
    };
    light?: {
      online?: number;
      offline?: number;
    };
    battery?: {
      online?: number;
      offline?: number;
    };
  };
  onClick?: () => void;
}

const DeviceBlock: React.FC<DeviceBlockProps> = ({
  className,
  criticalCount,
  warningCount,
  deviceName,
  onlineStatus,
  onlineCount,
  offlineCount,
  onClick,
}) => {
  return (
    <div
      className={`${styles.DeviceBlock} ${className ?? ''}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {/* FIRST ROW */}
      <div className="flex items-center gap-4 pr-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-medium text-red-01">
            <Critical />
            <span className="min-w-[50px]">Critical</span>
            <span>{criticalCount}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-yellow-01">
            <Warning />
            <span className="min-w-[50px]">Warning</span>
            <span>{warningCount}</span>
          </div>
        </div>
        <div className="text-2xl">{deviceName}</div>
        <div className="flex items-center gap-x-2">
          <div className="flex size-[10px] rounded-full bg-green-01 drop-shadow-md"></div>
          <div className="text-green-01">Online {onlineCount}</div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex size-[10px] rounded-full bg-red-01 drop-shadow-md"></div>
          <div className="text-red-01">Offline {offlineCount}</div>
        </div>
      </div>
      <div className="mx-4 my-2 h-px bg-neutral-01/50"></div>
      {/* SECOND ROW */}
      <div className="pb-2 text-center">Online Status</div>
      <div className="flex items-center justify-center gap-3 text-xs">
        <div className="flex items-center gap-2">
          <img src="/svg/solar-panel.svg" alt="" />
          <div className="flex flex-col items-center">
            Online
            <span>{onlineStatus?.solar?.online}</span>
          </div>
          <div className="flex flex-col items-center">
            Offline
            <span>{onlineStatus?.solar?.offline}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src="/svg/car-battery.svg" alt="" />
          <div className="flex flex-col items-center">
            Online
            <span>{onlineStatus?.battery?.online}</span>
          </div>
          <div className="flex flex-col items-center">
            Offline
            <span>{onlineStatus?.battery?.offline}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src="/svg/light-bulb.svg" alt="" />
          <div className="flex flex-col items-center">
            Online
            <span>{onlineStatus?.light?.online}</span>
          </div>
          <div className="flex flex-col items-center">
            Offline
            <span>{onlineStatus?.solar?.offline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceBlock;
