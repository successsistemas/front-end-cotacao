import { useNavigate } from 'react-router-dom';
import useSWR from "swr";
import { apiPostUsuario } from "../lib/api";

export const useVendedor = () => {
	const { data, error, mutate, isValidating } = useSWR('auth-vendedor', apiPostUsuario, { shouldRetryOnError: false });

	const loading = !data && !error;
	const navigate = useNavigate();

	const logout = async () => {
		localStorage.removeItem('@App:token');
		mutate();
		navigate('/')
	}
	///hdhdhhhsdsd
	return {
		vendedor: data,
		error,
		mutate,
		logout,
		loading,
		isValidating
	}
}