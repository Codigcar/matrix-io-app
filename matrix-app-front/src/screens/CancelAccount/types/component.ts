export type IconListItemPropsType = {
  // TODO: add extension of PropsWithTestID that will be in "shared/types"
  testID?: string | undefined;
  label: string;
  subtitle?: string;
  hasValue?: boolean;
  type?: number;
  value?: string;
};

export interface SvgByTypeProps extends Pick<IconListItemPropsType, 'type'> {}
