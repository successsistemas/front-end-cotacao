import axios from "axios";
import { CotacaoTDO, CotacaoTDOPayload, DescontoGeral } from "./types";

export const apiEndPoint = 'http://localhost:3000';

export const api = axios.create({
	baseURL: apiEndPoint,

});


api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('@App:token');
		if (token) {

			config.headers['Authorization'] = `Bearer ${token}`
		}

		return config;
	}
)
export const apiPostUsuario = async () => {
	try {
		const res = await api.post('/auth/user');
		return res;
	} catch (e: any) {

		if (e && e.response && e.reponse.status === 401)
			return { data: null, error: e };
		else {
			throw e;
		}
	}
}
export const apiGetCotacoes = async (codigo: string) => {
	try {
		const res = await api.get('cotacao/all');
		return res;
	} catch (e: any) {

		if (e && e.response && e.reponse.status === 401)
			return { data: null, error: e };
		else {
			throw e;
		}
	}
}
export const apiGetCotacao = async (url: string): Promise<CotacaoTDO | any> => {
	//codigoCotacao + '/' + codigoFornecedor + '/' + codigoContratoEmpresa + '/' + codigoEmpresa


	try {
		const res: CotacaoTDO = await api.get('/price/findby/' + url);
		return res;
	} catch (e: any) {

		if (e && e.response && e.reponse.status === 401)
			return { data: null, error: e };
		else {
			throw e;
		}
	}
}
export const apiPostFlag = async (cotacaoTDOPayload: CotacaoTDOPayload): Promise<any> => {
	try {
		const res: CotacaoTDO = await api.post('flag/verificar-flags', cotacaoTDOPayload);
		return res;
	} catch (e: any) {

		if (e && e.response && e.reponse?.status === 401)
			return { data: null, error: e };
		else {
			throw e;
		}
	}
}
export const apiPutDescontoAll = async (descontoTO: DescontoGeral | null): Promise<any> => {
	const res = await api.put('desconto/dev', descontoTO);
	return res;
}
export const apiGetEmpresa = async (numero: string) => {
	try {
		const res = await api.get(numero);
		return res;
	} catch (e: any) {

		if (e && e.response && e.reponse.status === 401)
			return { data: null, error: e };
		else {
			throw e;
		}
	}
}
export const apiPostVerificarFlagFornecedor = async (cotacaoTDOPayload: CotacaoTDOPayload) => {
	try {
		const res = await api.post('cotacao/verificar-flags/', cotacaoTDOPayload);
		return res;
	} catch (e: any) {
		return { data: 201, error: e };
	}
}
export const apiPostCalcularItens = async (cotacaoTDOPayload: CotacaoTDOPayload) => {
	try {
		const res = await api.post('cotacao/calcular-total', cotacaoTDOPayload);
		return res;
	} catch (e: any) {
		return { data: 201, error: e };
	}
}
