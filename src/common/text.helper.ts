import { ApiProperty } from '@nestjs/swagger';

export function radomText(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function radomNumber(length: number): string {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function createPagination<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number,
) {
  return {
    total: total,
    records: data,
    currentPage: page,
    pageSize: pageSize,
  };
}
export class ResPaginationDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  pageSize: number;
}

export function getDateFormatSMS(dateTime: number) {
  const date_ob = new Date(dateTime);

  // adjust 0 before single digit date
  const date = ('0' + date_ob.getDate()).slice(-2);

  // current month
  const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  const year = date_ob.getFullYear();

  // current hours

  const hours = ('0' + date_ob.getHours()).slice(-2);

  // current minutes
  const minutes = ('0' + date_ob.getMinutes()).slice(-2);

  // current seconds
  const seconds = ('0' + date_ob.getSeconds()).slice(-2);

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  return (
    year +
    '-' +
    month +
    '-' +
    date +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds
  );
}
