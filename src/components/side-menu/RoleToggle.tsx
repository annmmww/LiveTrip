'use client';

import type { ToggleRole } from '@/components/side-menu/type';
import { cx } from '@/lib/cx';

interface RoleToggleProps {
  selectedRole: ToggleRole;
  onChange: (role: ToggleRole) => void;
}

const TOGGLE_OPTIONS: { label: string; value: ToggleRole }[] = [
  { label: '예약자', value: 'customer' },
  { label: '호스트', value: 'host' },
];

export default function RoleToggle({
  selectedRole,
  onChange,
}: RoleToggleProps) {
  return (
    <div
      className='mb-3 rounded-2xl bg-gray-50 p-1 xl:mb-4'
      role='tablist'
      aria-label='사이드 메뉴 역할 선택'
    >
      <div className='grid grid-cols-2 gap-1'>
        {TOGGLE_OPTIONS.map((option) => {
          const isSelected = option.value === selectedRole;

          return (
            <button
              key={option.value}
              type='button'
              role='tab'
              aria-selected={isSelected}
              className={cx(
                'rounded-xl px-3 py-2 text-sm font-medium transition-colors xl:px-4',
                isSelected
                  ? 'bg-white text-primary-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-950'
              )}
              onClick={() => {
                onChange(option.value);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
