import { apiPutDescontoAll } from "../lib/api";
import { DescontoGeral } from "../lib/types";

export const useDesconto = () => {

	const desconto = async (descontoGeral: DescontoGeral | null) => {
		const result = await apiPutDescontoAll(descontoGeral);
		return result?.request?.status;
	}
	return {
		desconto
	}
}