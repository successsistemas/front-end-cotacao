import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaRedoAlt } from 'react-icons/fa';
import { FcHighPriority } from 'react-icons/fc';

export type PropContratoNaoExiste = {
	texto: any;
}

export const ContradoNaoExiste = (props: PropContratoNaoExiste) => {


	return (
		<Center display="flex" alignContent="center" alignItems="center" w="full" h="100vh">
			<VStack>
				<FcHighPriority size="100px" />
				<Text pt={5} fontSize="lg">Lamentamos que isso tenha ocorrido :(</Text>
				{/* <Text color={"gray"}>Dados de conexão com o banco de dados do cliente não encontrados!.</Text> */}
				<Text color={"gray"}>{props.texto ? (props.texto.toString()) : "Erro desconhecido"}</Text>
				<HStack pt={5}>
					<Button onClick={() => {
						// eslint-disable-next-line no-restricted-globals
						location.reload();
						return false;
					}} leftIcon={<FaRedoAlt />} fontWeight={0} colorScheme="azul">Recarregar a página</Button>
				</HStack>
			</VStack>
		</Center>
	);
}