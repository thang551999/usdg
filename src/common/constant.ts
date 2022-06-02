export const API_SUCCESS = 1;
export const API_FAIL = -1;
export enum ROLE {
  user = 1,
  owner = 2,
  admin = 3,
}
export const AUTH_MESSAGE = {
  EMAIL_EXITS: 'Email đã được sử dụng',
  EMAIL_NOT_FOUND: 'Email không tồn tại',
  WRONG_PASSWORD: 'Sai mật khẩu',
  EMAIL_NOT_ACTIVE: 'Email chưa được active',
  CHECK_MAIL_ACTIVE: 'Vui lòng kiểm tra email để active tài khoản',
};

export const enum TYPE_COMMENT {}
export const enum TYPE_ORDER {}
export const PLACE_MESSAGE = {
  CREATE_PLACE_SUCCESS: 'Create place success',
  DISABLE_SUCCESS: 'disable success',
};
export const MAX_SIZE = 100000;
export const FILE_LIMIT = 'File limit';
export enum ORDER_STATUS {
  WAIT_CONFIRM = 0,
  CONFIRM_OK = 1,
  CONFIRM_FAIL = 2,
}

export enum TypeVoucher {
  Percent = 0,
  Money = 1,
}
