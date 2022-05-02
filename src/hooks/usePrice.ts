import { useContext } from "react";
import useSWR from "swr";
import { UrlContext } from "../context/UrlContext";
import { apiGetCotacao } from "../lib/api";
import { ItemCotacaoTDO } from "../lib/types";

export const usePrice = () => {

	const dadosUrl = useContext(UrlContext);


	const { data, error, mutate, isValidating } = useSWR(dadosUrl?.numeroCotacao + '/' + dadosUrl?.codigoFornecedor + '/' + dadosUrl?.contratoEmpresa + '/' + dadosUrl?.numeroEmpresa, apiGetCotacao, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});

	const items: [ItemCotacaoTDO] = {
		...data,
		status: false,
	};
	const loading = !data && !error;


	return {
		cotacoes: data?.data[0][0],
		dadosTyped: items,
		total: data?.data[1][0].total,
		totalDesconto: data?.data[2][0].totalDesconto,
		totalFrete: data?.data[3][0].totalFrete,
		isReady: data?.data[4][0].isReady,
		formaPagamento: data?.data[5][0].formaPagamento,
		numeroCotacao: data?.data[6][0].numeroCotacao,
		error,
		mutate,
		loading,
		isValidating
	}
}