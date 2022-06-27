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

	const items = {
		...data,
		status: false,
	};
	const loading = !data && !error;



	return {
		cotacoes: data?.itens,
		dadosTyped: items,
		total: data?.total,
		totalDesconto: data?.totalDesconto,
		totalFrete: data?.totalFrete,
		isReady: data?.isReady,
		formaPagamento: data?.formaPagamento,
		numeroCotacao: data?.numeroCotacao,
		error,
		mutate,
		loading,
		isValidating
	}
}