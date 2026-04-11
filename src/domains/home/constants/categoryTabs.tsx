import * as SVG from '@/domains/home/containers/svg';

export const categoryTabs = [
  {
    icon: <SVG.ArtIcon />,
    title: '문화 · 예술',
  },
  {
    icon: <SVG.FoodIcon />,
    title: '식음료',
  },
  {
    icon: <SVG.TourIcon />,
    title: '투어',
  },
  {
    icon: <SVG.BusIcon />,
    title: '관광',
  },
  {
    icon: <SVG.WellbeingIcon />,
    title: '웰빙',
  },
];
export const tabEmojiMapping: Record<string, string> = {
  '문화 · 예술': '🎨',
  식음료: '🥗',
  투어: '🏕️',
  관광: '✈️',
  웰빙: '🧘‍♀️',
};
