import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVendedor } from "../hooks/useVendedor";
import { Loading } from "./Loading";
import { MenuBar } from "./Menu";
import { Result } from "./Result";
export const CheckVendedor: FC = ({ children }) => {

	const navigate = useNavigate();
	const {
		vendedor,
		error,
		loading,
		isValidating,
		mutate
	} = useVendedor();

	useEffect(() => {

		if (vendedor?.data === null) navigate('/')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendedor])

	if (loading) {
		return (<Loading />);
	}
	let isConnectionError = error && Object.entries(error).length === 0;
	let isErrorUndefined = error === undefined;

	if (!isConnectionError && !isErrorUndefined) return <Result onClick={mutate} isValidating={isValidating} />

	return (
		<>
			<MenuBar />
			{children}
		</>
	)
}