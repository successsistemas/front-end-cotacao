import React from "react";
import { Center, Text, VStack, Button, HStack } from "@chakra-ui/react";
import { FcHighPriority } from 'react-icons/fc'
import { FaRedoAlt } from 'react-icons/fa';
type Prop = {
	onClick: () => void,
	isValidating: boolean,
}

export const Result = (props: Prop) => {
	return (
		<Center display="flex" alignContent="center" alignItems="center" w="full" h="100vh">
			<VStack>
				<FcHighPriority size="100px" />
				<Text pt={5} fontSize="lg">Erro ao se conectar ao servidor</Text>
				<Text color={"gray"}>Por favor, verifique a sua conexão á internet e tente novamente.</Text>
				<HStack pt={5}>
					<Button onClick={() => { props.onClick() }} isLoading={props.isValidating} leftIcon={<FaRedoAlt />} fontWeight={0} colorScheme="azul">Tentar novamente</Button>
				</HStack>
			</VStack>
		</Center>
	);
}