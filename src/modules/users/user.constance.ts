// mức độ cơ thể
export enum EBodyLevel {
  BEO_PHI = 1,
  BINH_THUONG = 2,
  THIEU_CAN = 3,
}
// mục tiêu phát triển cơ thể
export enum EBodyDevelopmentGoals {
  TANG_CAN = 1,
  GIAM_CAN = 2,
  TANG_CO_BAP = 3,
  DUY_TRI = 4,
}
export enum EMeal {
  BUA_SANG = 1,
  BUA_TRUA = 2,
  BUA_TOI = 3,
}
export interface IUserBonus {
  money: number;
  rank: number;
  gradePoint: number;
}
export const UserBonus: IUserBonus[] = [
  {
    money: 20000,
    rank: 2,
    gradePoint: 1000,
  },
  {
    money: 50000,
    rank: 3,
    gradePoint: 2500,
  },
  {
    money: 20000,
    rank: 4,
    gradePoint: 6000,
  },
  {
    money: 100000,
    rank: 5,
    gradePoint: 10000,
  },
];
