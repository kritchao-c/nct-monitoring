'use-client';

import { ReactNode, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

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
  deviceCount?: number;
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
  notification?: DeviceBlockNotification[];
  onClick?: () => void;
}

export interface DeviceBlockNotification {
  type?: 'warning' | 'info' | 'danger';
  title?: ReactNode;
  description?: ReactNode;
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
  notification,
  deviceCount,
}) => {
  const [showStatus, setShowStatus] = useState(false);
  const { t } = useTranslation('common');

  return (
    <div
      className={`${styles.DeviceBlock} ${className ?? ''} relative hover:shadow-xl ${showStatus ? 'min-h-[360px]' : ''}`}
    >
      {/* STATUS CONTENT */}
      {showStatus && (
        <>
          <div
            className="absolute right-4 top-4 z-30 cursor-pointer pr-4 text-right"
            onClick={() => setShowStatus(false)}
          >
            <CloseOutlined />
          </div>
          <div className={`${styles.DeviceBlockStatus} absolute inset-0 z-20 gap-y-[21px] overflow-auto`}>
            <div className="mt-8 flex flex-col gap-y-[21px]">
              {!notification || notification?.length === 0 ? (
                <div className="flex items-center justify-center text-center">No notification...</div>
              ) : undefined}
              {notification?.map((item, key) => {
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
                      <div className="text-[12px]">{item.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {/* FIRST ROW */}
      <div className="flex cursor-pointer items-center gap-4 pr-4" onClick={() => setShowStatus(!showStatus)}>
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
        <div className="flex flex-col items-end justify-end font-medium">
          <div className="leading-none">{deviceName}</div>
          <div className="leading-none">{t('device')}</div>
        </div>
        <div className="text-2xl">{deviceCount}</div>
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
      <div
        className="cursor-pointer"
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <div className="pb-2 text-center">Online Status</div>
        <div className="flex items-center justify-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <img src="/svg/solar-panel2.svg" alt="" className="size-[24px]" />
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
            <img src="/svg/car-battery.svg" alt="" className="size-[24px]" />
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
            <img src="/svg/light-bulb2.svg" alt="" className="size-[24px]" />
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
    </div>
  );
};

export default DeviceBlock;
