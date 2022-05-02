import { useContext } from "react";
import useSWR from "swr";
import { UrlContext } from "../context/UrlContext";
import { apiGetCotacao } from "../lib/api";
import { ItemCotacaoTDO } from "../lib/types";

export const useCotacao = () => {

	const dadosUrl = useContext(UrlContext);


	const { data, error, mutate, isValidating } = useSWR(dadosUrl?.numeroCotacao + '/' + dadosUrl?.codigoFornecedor + '/' + dadosUrl?.contratoEmpresa + '/' + dadosUrl?.numeroEmpresa, apiGetCotacao, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});

	const items: [ItemCotacaoTDO] = {
		...data,
		status: false,
	};
	const loading = !data && !error;

	return {
		cotacoes: { data: data?.data[0][0] },
		dadosTyped: items,
		total: { data: data?.data[1] },
		totalDesconto: { data: data?.data[2] },
		totalFrete: { data: data?.data[3] },
		isReady: { data: data?.data[4] },
		error,
		mutate,
		loading,
		isValidating
	}
}