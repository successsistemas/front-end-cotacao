import { api } from "../lib/api";
import { HistoricoProdutosParametro } from "../lib/types";
export const useHistorico = () => {

	const apiPostHistoricoTributos = async (historicoTributosTdo: HistoricoProdutosParametro) => {
		try {
			const res = await api.post('historico-tributos/', historicoTributosTdo);
			return res;
		} catch (e: any) {

			if (e && e?.response && e.reponse?.status === 401)
				return { data: null, error: e };
			else {
				throw e;
			}
		}
	}

	return {
		verificarHistoricoTributos: apiPostHistoricoTributos
	}
}