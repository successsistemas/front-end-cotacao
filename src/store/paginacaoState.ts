import { atom, selector } from 'recoil'

export const paginacaoState = atom({
  key: 'paginacao',
  default: {
    current: 1,
    pageSize: 20,
    total: 0,
  },
})

export const totalState = selector({
  key: 'total',
  get: ({ get }) => get(paginacaoState).total,
})

export const sortState = atom<{ coluna: string; desc: boolean } | null>({
  key: 'sort',
  default: null,
})
