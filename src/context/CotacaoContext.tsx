import React, { createContext, ReactNode } from "react";
import { usePrice } from "../hooks/usePrice";
import { ContradoNaoExiste } from "../components/erros/ContratoNaoExiste";


export const CotacaoContext = createContext<any>(null);

interface CotacaoProviderProps {
	children: ReactNode
}

export function CotacaoProvider({ children }: CotacaoProviderProps) {

	const cotacao = usePrice();

	return (
		<CotacaoContext.Provider value={cotacao}>
			{cotacao?.error ? <ContradoNaoExiste /> : children}
		</CotacaoContext.Provider>
	);
}