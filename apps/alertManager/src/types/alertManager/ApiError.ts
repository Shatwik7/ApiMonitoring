// Original file: proto/alert.proto

export const ApiError = {
  TIMEOUT: 'TIMEOUT',
  DNS: 'DNS',
  STATUS: 'STATUS',
} as const;

export type ApiError =
  | 'TIMEOUT'
  | 1
  | 'DNS'
  | 2
  | 'STATUS'
  | 3

export type ApiError__Output = typeof ApiError[keyof typeof ApiError]
