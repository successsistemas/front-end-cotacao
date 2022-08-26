import React, { createContext, ReactNode } from "react";
import { usePrice } from "../hooks/usePrice";
import { ContradoNaoExiste } from "../components/erros/ContratoNaoExiste";


export const CotacaoContext = createContext<any>(null);

interface CotacaoProviderProps {
	children: ReactNode
}

export function CotacaoProvider({ children }: CotacaoProviderProps) {

	const cotacao = usePrice();

	console.log(cotacao?.error?.response?.data?.message)

	return (
		<CotacaoContext.Provider value={cotacao}>
			{cotacao?.error ? <ContradoNaoExiste texto={cotacao?.error?.response?.data?.message} /> : children}
		</CotacaoContext.Provider>
	);
}