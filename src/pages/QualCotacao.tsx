import { Text, VStack } from "@chakra-ui/layout";
import { Divider, Select } from "@chakra-ui/react";
import React from "react";
export const QualCotacao = () => {
	return (
		<VStack border={"2px"} borderColor={"gray.200"} borderRadius={3} p={3} w={"full"} bg={"gray.100"} alignItems="flex-start">
			<Divider />
			<Text fontSize={"sm"} paddingY={3}>
				Escolha qual cotação você deseja gerar.
			</Text>
			<Select fontSize={"sm"} _focus={{ boxShadow: 'none' }} bg={"white"} w={{ base: "100%", md: "50%", sm: "100%", lg: "30%" }}>
				<option value="option1">Cotações abertas</option>
				<option value="option2">Cotações fechadas</option>
			</Select>
		</VStack>
	);
}