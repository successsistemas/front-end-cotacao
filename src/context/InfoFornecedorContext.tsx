import React, { createContext, ReactNode } from "react";
import { useFornecedorInfo } from "../hooks/useFornecedorInfo";


export const InfoFornecedorContext = createContext<any>(null);

interface InfoFornecedorProviderProps {
	children: ReactNode
}

export function InfoFornecedorInfoProvider({ children }: InfoFornecedorProviderProps) {

	const infoFornecedor = useFornecedorInfo();

	return (
		<InfoFornecedorContext.Provider value={infoFornecedor}>
			{children}
		</InfoFornecedorContext.Provider>
	);
}