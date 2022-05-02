import { atom } from "recoil";
import { UrlData } from "../lib/types";

export const urlDataState = atom<UrlData[]>({
	key: 'urlDataState',
	default: [],
});

export const percentual = atom<any>({
	key: 'percentual',
	default: null,
})