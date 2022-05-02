import { useContext } from "react";
import useSWR from "swr";
import { UrlContext } from "../context/UrlContext";
import { apiGetEmpresa } from "../lib/api";

export const useFornecedorInfo = () => {

	const dadosUrl = useContext(UrlContext);


	const url = 'empresa/fornecedor/' + dadosUrl.contratoEmpresa + '/' + dadosUrl.codigoFornecedor + '/' + dadosUrl.numeroEmpresa

	const { data, error, isValidating } = useSWR(url, apiGetEmpresa, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});

	return {
		data,
		error,
		isValidating
	}

}