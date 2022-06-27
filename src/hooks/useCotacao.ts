import { useContext } from "react";
import useSWR from "swr";
import { UrlContext } from "../context/UrlContext";
import { apiGetCotacao } from "../lib/api";

export const useCotacao = () => {

	const dadosUrl = useContext(UrlContext);


	const { data, error, mutate, isValidating } = useSWR(dadosUrl?.numeroCotacao + '/' + dadosUrl?.codigoFornecedor + '/' + dadosUrl?.contratoEmpresa + '/' + dadosUrl?.numeroEmpresa, apiGetCotacao, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});

	const items = {
		...data,
		status: false,
	};
	const loading = !data && !error;

	return {
		dadosTyped: items?.data,
		error,
		mutate,
		loading,
		isValidating
	}
}