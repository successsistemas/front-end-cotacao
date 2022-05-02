import { api } from "./api";

export const apiFornecedorLogin = async (email: string, senha: string) => {
	const result = await api.post('/fornecedor/login', {
		email,
		senha
	});
	return result;
}

export const apiFornecedorVerificarEmail = async (email: string) => {
	const result = await api.post('/fornecedor/get', {
		email
	});
	return result;
}
export const apiFornecedorVerificarCredenciais = async (email: string) => {
	const result = await api.post('/fornecedor/verificarCredenciais', {
		email
	})
	return result;
}
