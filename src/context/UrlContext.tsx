import React, { createContext, ReactNode } from "react";
import { decode, encode } from "base-64";
import { useParams } from "react-router-dom";
import { UrlDataPosition, UrlVazioEnum } from "../enuns/enuns";
import { UrlData } from "../lib/types";
import moment from 'moment';
import 'moment/locale/pt-br';


export const UrlContext = createContext<UrlData | Partial<UrlData>>({});

interface UrlProviderProps {
	children: ReactNode
}


function isVencido(vencimento: moment.Moment) {
	//const dataAtual = moment('28/09/2022', 'DD/MM/YYYY').format('L');

	const now: moment.Moment = moment();

	var diffDays = moment.duration(vencimento.diff(now))
	if (diffDays.asHours() < 0) {
		return true;
	}
	return false;
}


export function UrlProvider({ children }: UrlProviderProps) {

	const { url } = useParams();

	const data: any = url?.split(encode('-success'));

	const urlData: UrlData = {
		contratoEmpresa: data[UrlDataPosition.CONTRATO_EMPRESA],
		numeroEmpresa: data[UrlDataPosition.NUMERO_EMPRESA],
		numeroCotacao: data[UrlDataPosition.NUMERO_COTACAO],
		cnpjFornecedor: data[UrlDataPosition.CNPJ_FORNECEDOR],
		codigoFornecedor: data[UrlDataPosition.CODIGO_FORNECEDOR],
		parametroUrl: url,
		dataValidade: data[UrlDataPosition.DATA_VALIDADE],
		isVencido: false,
		dataMoment: null
	}


	const vencimento = moment(decode(urlData.dataValidade));
	urlData.dataMoment = vencimento;
	urlData.isVencido = isVencido(vencimento)




	const empty: Partial<UrlData> = { contratoEmpresa: UrlVazioEnum.VAZIO }

	return (
		<UrlContext.Provider value={urlData ? urlData : empty}>
			{children}
		</UrlContext.Provider>
	);
}