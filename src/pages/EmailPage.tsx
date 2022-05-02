import React from "react";
import { VStack, Image } from '@chakra-ui/react';
import LogoMenor from '../assets/logo-icon-48x48.png';
import { Typography } from 'antd'

const { Text } = Typography;

export const EmailPage = () => {
	return (
		<VStack padding={10} bg={"gray.100"} h="100vh" w="full">
			<VStack borderRadius={5} bg={"white"} h="100vh" w="full">
				<Image mt={5} src={LogoMenor} />
				<Text style={{ fontSize: "16px", fontFamily: "Inter", lineHeight: "normal", letterSpacing: "normal", opacity: "80%" }}>
					Acesso portal cotações
				</Text>
				<VStack alignItems={"start"}>
					<Text style={{ fontSize: "30px", fontFamily: "Inter", lineHeight: "25px", letterSpacing: "normal", margin: "20px" }}>
						Olá, Lucas!
					</Text>
					<Text style={{ fontSize: "20px", fontFamily: "Inter", lineHeight: "normal", letterSpacing: "normal", margin: "20px" }}>
						A empresa DINIZ E PINHEIRO LTDA , solicita ao fornecedor AGRISTAR DO BRASIL LTDA, o preenchimento da Cotação de Preço disponível para acesso no link a baixo.
					</Text>
				</VStack>
			</VStack>
		</VStack >
	);
}