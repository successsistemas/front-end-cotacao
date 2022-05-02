import { format, parse } from 'date-fns'

export const dataToString = (data: Date) => {
  return format(data, 'yyyyMMdd')
}

export const stringToData = (data: string) => {
  return parse(data, 'yyyyMMdd', new Date())
}

