'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleToggle from '@/components/side-menu/RoleToggle';
import type {
  MenuItem,
  MenuItemType,
  SideMenuProps,
  ToggleRole,
} from '@/components/side-menu/type';
import { cx } from '@/lib/cx';

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'myInfo',
    label: '내 정보',
    iconPath: '/icons/icon_user.svg',
    href: '/profile',
    role: 'user',
  },
  {
    id: 'reservationHistory',
    label: '예약내역',
    iconPath: '/icons/icon_list.svg',
    href: '/myreservation',
    role: 'customer',
  },
  {
    id: 'manageExperiences',
    label: '내 체험 관리',
    iconPath: '/icons/icon_setting.svg',
    href: '/myactivities',
    role: 'host',
  },
  {
    id: 'reservationStatus',
    label: '내 체험 예약현황',
    iconPath: '/icons/icon_calendar.svg',
    href: '/reservation-status',
    role: 'host',
  },
];

export const SIZE_CONFIG = {
  container: 'w-[11.12rem] xl:w-[18.187rem]',
  iconDefaultSize: 16,
  iconSize: 'w-3 h-4 xl:w-4 xl:h-4',
  spacing: {
    padding: 'py-4 xl:py-6',
    menuPadding: 'px-3 py-4 xl:px-4 xl:py-6',
    gap: 'gap-3 p-4',
    spaceY: 'space-y-2 xl:space-y-3',
    textSize: 'text-sm xl:text-base',
  },
} as const;

const PRIMARY_FILTER =
  'brightness(0) saturate(100%) invert(43%) sepia(96%) saturate(1352%) hue-rotate(188deg) brightness(119%) contrast(119%)';

const getActiveItem = (pathname: string): MenuItemType => {
  if (pathname.includes('/profile')) {
    return 'myInfo';
  }
  if (pathname.includes('/myreservation')) {
    return 'reservationHistory';
  }
  if (pathname.includes('/myactivities')) {
    return 'manageExperiences';
  }
  if (pathname.includes('/reservation-status')) {
    return 'reservationStatus';
  }

  return 'myInfo';
};

const getRoleFromPath = (pathname: string): ToggleRole | null => {
  if (pathname.includes('/myreservation')) {
    return 'customer';
  }
  if (
    pathname.includes('/myactivities') ||
    pathname.includes('/reservation-status')
  ) {
    return 'host';
  }

  return null;
};

export default function SideMenu({ className = '' }: SideMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRole, setSelectedRole] = useState<ToggleRole>(
    getRoleFromPath(pathname) ?? 'customer'
  );

  useEffect(() => {
    const roleFromPath = getRoleFromPath(pathname);

    if (roleFromPath) {
      setSelectedRole(roleFromPath);
    }
  }, [pathname]);

  const activeItem = getActiveItem(pathname);
  const visibleMenuItems = MENU_ITEMS.filter(
    (item) => item.role === 'user' || item.role === selectedRole
  );

  const handleMenuClick = (href: string) => {
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleMenuClick(href);
    }
  };

  return (
    <div
      className={cx(
        `rounded-lg bg-white shadow-sm`,
        SIZE_CONFIG.container,
        className
      )}
    >
      <div className={SIZE_CONFIG.spacing.menuPadding}>
        <RoleToggle selectedRole={selectedRole} onChange={setSelectedRole} />
        <div className={SIZE_CONFIG.spacing.spaceY}>
          {visibleMenuItems.map((item) => {
            const isActive = item.id === activeItem;

            return (
              <div
                key={item.id}
                tabIndex={0}
                role='button'
                className={`flex cursor-pointer items-center rounded-2xl transition-colors ${SIZE_CONFIG.spacing.gap} ${
                  isActive ? 'bg-primary-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  handleMenuClick(item.href);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, item.href);
                }}
              >
                <Image
                  src={item.iconPath}
                  alt={item.label}
                  width={SIZE_CONFIG.iconDefaultSize + 8}
                  height={SIZE_CONFIG.iconDefaultSize + 8}
                  className={cx(
                    SIZE_CONFIG.iconSize,
                    isActive ? 'brightness-0 saturate-100' : ''
                  )}
                  style={isActive ? { filter: PRIMARY_FILTER } : {}}
                />
                <span
                  className={`font-medium ${SIZE_CONFIG.spacing.textSize} ${isActive ? 'text-gray-950' : 'text-gray-600'}`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
