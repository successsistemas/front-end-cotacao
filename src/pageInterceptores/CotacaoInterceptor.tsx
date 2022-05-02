import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import { UrlProvider } from "../context/UrlContext";
import { VerificarData } from "./VerificarData";

export const CotacaoInterceptor = () => {
	return (
		<NotificationsProvider>
			<UrlProvider>
				<VerificarData />
			</UrlProvider>
		</NotificationsProvider>

	);
}