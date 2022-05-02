import React from "react";
import { Outlet } from "react-router-dom";
import { CheckVendedor } from "./CheckVendedor";
export const DashVendedor = () => {
	return (
		<CheckVendedor>
			<Outlet />
		</CheckVendedor>
	);
}