export type MenuItemType =
  | 'myInfo'
  | 'reservationHistory'
  | 'manageExperiences'
  | 'reservationStatus';

export type MenuRole = 'user' | 'host' | 'customer';

export type ToggleRole = 'host' | 'customer';

export interface MenuItem {
  id: MenuItemType;
  label: string;
  iconPath: string;
  href: string;
  role: MenuRole;
}

export interface SideMenuProps {
  className?: string;
}
