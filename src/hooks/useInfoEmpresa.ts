import { useContext } from "react";
import useSWR from "swr";
import { UrlContext } from "../context/UrlContext";
import { apiGetEmpresa } from "../lib/api";

export const useInfoEmpresa = () => {

	const dadosUrl = useContext(UrlContext);




	const { data, error, mutate, isValidating } = useSWR('empresa/' + dadosUrl?.contratoEmpresa + '/' + dadosUrl?.codigoFornecedor + '/' + dadosUrl?.numeroEmpresa, apiGetEmpresa, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});

	const loading = !data && !error;


	return {
		data,
		error,
		mutate,
		loading,
		isValidating
	}
}