import { Center } from "@chakra-ui/react";
import { Button, Result } from "antd";
import React from "react";

export const CotacaoVencida = () => {
	return (
		<Center display="flex" alignContent="center" alignItems="center" w="full">
			<Result
				status="warning"
				title="Data de validade vencida!"
				subTitle="Não é possível preencher ou visualizar esta cotação pois a data de validade está vencida."
				extra={[

					<Button key="buy">Mais detalhes</Button>,
				]}
			/>
		</Center>
	);
}