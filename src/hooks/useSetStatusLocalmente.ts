import { useContext, useState } from "react";
import { UrlContext } from "../context/UrlContext";
import { apiPostFlag } from "../lib/api";
import { CotacaoTDOPayload } from "../lib/types";

export const useSetStatusLocalmente = () => {

	const [isEnviado, setEnviado] = useState(false);

	const urlData = useContext(UrlContext);


	async function statusLocalmente() {
		// const payload: CotacaoTDOPayload = {
		// 	codigo: "1ECFFA7D7D9E7A05AAEE",
		// 	fornecedor: "A6D7FA7D7D9E798E",
		// 	flag: ".",
		// 	contratoEmpresa: "1EDFFA7D75A6",
		// 	codigoEmpresa: ""
		// }

		const payload: CotacaoTDOPayload = {
			codigo: urlData?.numeroCotacao,
			fornecedor: urlData?.codigoFornecedor,
			flag: "xx",
			contratoEmpresa: urlData?.contratoEmpresa,
			codigoEmpresa: urlData?.numeroEmpresa
		}

		const response = await apiPostFlag(payload);


		for (let i = 0; i < response.data.length; i++) {
			if (response.data[i].fornvenc6 !== 'P') {
				setEnviado(false)
				return;
			} else {
				setEnviado(true)

			}
			//console.log(response.data[i].flag6 !== 'P', response.data[i].flag6)
		}
		localStorage.setItem(`@App:enviado`, JSON.stringify(isEnviado));
		//	const item = localStorage.getItem(`@App:${record.item}`) as string;
	}

	return {
		statusLocalmente,
		isEnviado,
		setEnviado
	}
}			