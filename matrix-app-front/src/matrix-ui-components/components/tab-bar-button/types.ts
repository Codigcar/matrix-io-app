export type TabBarButtonProps = {
  focused: boolean;
  color: string;
  size: 'xsmall' | 'small' | 'normal' | 'medium' | 'large' | 'xlarge';
  iconName: 'home' | 'benefit' | 'chat' | 'card';
  label: string;
  isHome?: boolean;
  hasAlert?: boolean;
  analyticsAlert?: boolean;
};
