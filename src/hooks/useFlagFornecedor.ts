import { api } from "../lib/api";
import { CotacaoTDOPayload } from "../lib/types";
export const useFlagFornecedor = () => {

	const apiPostFlagFornecedor = async (cotacaoTDOPayload: CotacaoTDOPayload) => {
		try {
			const res = await api.post('flag/finalizar-cotacao', cotacaoTDOPayload);
			return res;
		} catch (e: any) {
			return { data: 201, error: e };
		}
	}

	const apiPostOfferInfo = async (dados: any) => {
		try {
			const res = await api.post('cotacaoinfo/', dados);
			return res;
		} catch (e: any) {
			return { data: 201, error: e };
		}
	}

	const apiPostVerificarFlagFornecedor = async (cotacaoTDOPayload: CotacaoTDOPayload) => {
		try {
			const res = await api.post('flag/verificar-flags/', cotacaoTDOPayload);
			return res;
		} catch (e: any) {
			return { data: 201, error: e };
		}
	}

	return {
		apiPostFlagFornecedor: apiPostFlagFornecedor,
		apiPostVerificarFlagFornecedor: apiPostVerificarFlagFornecedor,
		apiPostOfferInfo
	}
}