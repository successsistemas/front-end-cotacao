import React, { createContext, ReactNode } from "react";
import { useInfoEmpresa } from "../hooks/useInfoEmpresa";


export const InfoEmpresaContext = createContext<any>(null);

interface InfoEmpresaProviderProps {
	children: ReactNode
}

export function InfoEmpresaProvider({ children }: InfoEmpresaProviderProps) {

	const infoEmpresa = useInfoEmpresa();

	return (
		<InfoEmpresaContext.Provider value={infoEmpresa}>
			{children}
		</InfoEmpresaContext.Provider>
	);
}