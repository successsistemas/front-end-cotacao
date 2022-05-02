import { useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { urlDataState } from "../context/atom";
import { apiGetCotacao } from "../lib/api";
import { ItemCotacaoTDO } from "../lib/types";

export const useCotacao = () => {

	const [codigoFornecedor, setCodigoFornecedor] = useState('');
	const [codigoCotacao, setcodigoCotacao] = useState('');
	const [codigoContratoEmpresa, setCodigoContratoEmpresa] = useState('');
	const [codigoEmpresa, setCodigoEmpresa] = useState('');

	const dados = useRecoilValue(urlDataState);
	console.log(dados)

	const { data, error, mutate, isValidating } = useSWR(dados[0]?.numeroCotacao + '/' + dados[0]?.codigoFornecedor + '/' + dados[0]?.contratoEmpresa + '/' + dados[0]?.numeroEmpresa, apiGetCotacao, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});

	const setFornecedorCode = (code: string) => {
		setCodigoFornecedor(code)
	}
	const setCotacaoCode = (code: string) => {
		setcodigoCotacao(code)
	}
	const setEmpresaContratoCode = (code: string) => {
		setCodigoContratoEmpresa(code)
	}
	const setEmpresaCode = (code: string) => {
		setCodigoEmpresa(code)
	}
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
		error,
		mutate,
		loading,
		isValidating,
		setFornecedorCode,
		setCotacaoCode,
		setEmpresaContratoCode,
		setEmpresaCode
	}
}