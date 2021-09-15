interface MenuInfoNode {
  appLevel: number;
  parent: null | string;
  linkUrl: null | string;
  icon: null | string;
  hasPermission: boolean;
  i18nLabelKey: null | string;
  desc: null | string;
  status: string;
  resourceCode: string;
  appNo: string;
  type: 'menu';
  position: string;
  priority: number;
  label: number;
  createAt: number;
  updateAt: number;
}

export interface MenuInfo {
  node: MenuInfoNode;
  children: MenuInfo[] | null;
}
