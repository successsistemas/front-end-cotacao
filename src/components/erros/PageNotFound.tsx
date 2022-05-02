import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaRedoAlt } from 'react-icons/fa';
import { FcHighPriority } from 'react-icons/fc';

export const NotFoundPage = () => {
	return (
		<Center display="flex" alignContent="center" alignItems="center" w="full" h="100vh">
			<VStack>
				<FcHighPriority size="100px" />
				<Text pt={5} fontSize="lg">Desculpe, essa página não existe :(</Text>
				<Text color={"gray"}>Por favor, tente acessar uma página válida ou volte para o menu inicial.</Text>
				<HStack pt={5}>
					<Button onClick={() => { }} leftIcon={<FaRedoAlt />} fontWeight={0} colorScheme="azul">Voltar</Button>
				</HStack>
			</VStack>
		</Center>
	);
}