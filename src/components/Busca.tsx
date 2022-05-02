import { Text } from "@chakra-ui/layout";
import { Input, Select, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
//hello
//sd
export const Busca = () => {
	return (
		<VStack border={"2px"} borderColor={"gray.200"} borderRadius={3} p={3} w={"full"} bg={"gray.100"} alignItems="flex-start">
			<Text>Buscar orçamento</Text>
			<SimpleGrid spacing={4} w="full" columns={{ base: 2, sm: 1, md: 2, lg: 2 }}>
				<Select w="full" placeholder="Filtrar por" _focus={{ boxShadow: 'none' }} bg={"white"} >
					<option value="option1">Código</option>
					<option value="option2">Produto</option>
				</Select>
				<Input w="full" bg={"white"} />
			</SimpleGrid>
		</VStack>
	);
	//sdsds
}