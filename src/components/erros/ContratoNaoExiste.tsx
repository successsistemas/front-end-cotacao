import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaRedoAlt } from 'react-icons/fa';
import { FcHighPriority } from 'react-icons/fc';

export const ContradoNaoExiste = () => {
	return (
		<Center display="flex" alignContent="center" alignItems="center" w="full" h="100vh">
			<VStack>
				<FcHighPriority size="100px" />
				<Text pt={5} fontSize="lg">Desculpe, dados de conexão não encontrado:(</Text>
				<Text color={"gray"}>Dados de conexão com o banco de dados do cliente não encontrados!.</Text>
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