import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

interface AuthContextData {
	logado: boolean,
	Login(email: string, senha: string): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [usuario, setUsuario] = useState<object | null>();

	useEffect(() => {
		const storageUser = localStorage.getItem('@App:user');
		const storageToken = localStorage.getItem('@App:token');
		if (storageToken && storageUser) {
			setUsuario(JSON.parse(storageUser));
		}
	}, []);

	async function Login(email: string, senha: string) {
		const response = await api.post('/auth/login', {
			email,
			senha
		});
		if (response.data.access_token !== undefined) {
			setUsuario(response.data.user);
			localStorage.setItem('@App:token', response.data.access_token);
		}
		return response.data.access_token;
	}
	return (
		<AuthContext.Provider value={{ logado: Boolean(usuario), Login: Login }}>
			{children}
		</AuthContext.Provider>
	);
};
export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}
export default AuthContext;

