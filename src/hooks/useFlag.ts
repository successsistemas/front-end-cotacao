import useSWR from "swr";
import { apiPostFlag } from "../lib/api";
import { CotacaoTDOPayload } from "../lib/types";

export const useCotacaoFlag = (props: CotacaoTDOPayload) => {
	const { data, error, mutate, isValidating } = useSWR('cotacao/verificar-flags', () => { apiPostFlag(props) });

	const loading = !data && !error;

	return {
		dados: data,
		error,
		mutate,
		loading,
		isValidating
	}
}