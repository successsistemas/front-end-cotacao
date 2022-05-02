import useSWR from "swr";
import { apiPostVerificarFlagFornecedor } from "../lib/api";
import { CotacaoTDOPayload } from "../lib/types";

export const useStatusEnvio = () => {
	const payload: CotacaoTDOPayload = {
		codigo: "0000000001",
		fornecedor: "AG000002",
		flag: "."
	}
	const { data, error, mutate, isValidating } = useSWR('auth-vendedor', () => { apiPostVerificarFlagFornecedor(payload) }, {
		revalidateOnFocus: false,
		revalidateOnMount: false,
		revalidateOnReconnect: false,
		refreshWhenOffline: false,
		refreshWhenHidden: false,
		refreshInterval: 0
	});

	const loading = !data && !error;
	return {
		vendedor: data,
		error,
		mutate,
		loading,
		isValidating
	}
}