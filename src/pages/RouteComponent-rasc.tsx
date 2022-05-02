import React from "react";
import { Route, Routes } from 'react-router-dom';
import { DashVendedor } from "../components/DashVendedor";
import { PaginaInfo } from "../components/PaginaInfo";
import { TesteLayout } from "./TesteLayout";
import { CotacoesAberta } from "./CotacoesAberta";
import { CotacoesFechada } from "./CotacoesFechadas";
import { Login } from "./Login";
import { Relatorios } from "./Relatorios";

export const RouteComponent = () => {
	return (
		<Routes>
			<Route path="/painel" element={<DashVendedor />}>
				<Route path=":idDocumento" element={<TesteLayout />} />
				<Route path="cotacoes-abertas" element={<CotacoesAberta />}>

				</Route>
				<Route path="home" element={<PaginaInfo />} />

				<Route path="cotacoes-fechadas" element={<CotacoesFechada />} />
				<Route path="visualizar-relatorios" element={<Relatorios />} />
				<Route index element={<CotacoesAberta />} />
			</Route>
			<Route index element={<Login />} />
			<Route path={"teste"} element={<TesteLayout />} />
		</Routes>

	);
}