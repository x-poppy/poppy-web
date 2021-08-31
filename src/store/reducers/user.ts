import { DEL_USER_INFO, UPT_USER_INFO } from 'src/store/constant';
import { local } from 'src/utils/storage';

const $$USER_INFO = '$$USER_INFO';
const initState = local.getItem($$USER_INFO, { name: '1' })!!;

export default function reducer(preState = initState, action: any): { name?: string } {
  const { type, data } = action;
  switch (type) {
    case UPT_USER_INFO:
      const newState = { ...preState, ...data };
      local.setItem($$USER_INFO, newState);
      return newState;
    case DEL_USER_INFO:
      local.removeItem($$USER_INFO);
      return {};
    default:
      return preState;
  }
}
