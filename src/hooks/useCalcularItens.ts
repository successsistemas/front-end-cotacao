import { apiPostCalcularItens } from "../lib/api";
import { CotacaoTDOPayload } from "../lib/types";
export const useCalcularItens = () => {

	function calcular(payload: CotacaoTDOPayload) {
		apiPostCalcularItens(payload)
	}

	return {
		calcular: calcular
	}
}