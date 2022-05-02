import useSWR from "swr";
import { apiGetCotacoes } from "../lib/api";
export const useCotacoes = () => {
	const { data, error, mutate, isValidating } = useSWR('all', apiGetCotacoes);

	const loading = !data && !error;
	return {
		cotacoes: data,
		error,
		mutate,
		loading,
		isValidating
	}
}