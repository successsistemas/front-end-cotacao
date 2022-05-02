import { Button, Divider, Text, VStack } from "@chakra-ui/react";
import React from "react";
export const Pronto = () => {
	return (
		<VStack border={"2px"} borderColor={"gray.200"} borderRadius={3} p={3} w={"full"} bg={"gray.100"} alignItems="flex-start">
			<Divider />
			<Text fontSize={"sm"} color={"gray.600"} >
				Tudo pronto!
			</Text>
			<Text fontSize={"sm"} paddingY={3}>
				Já coletamos as informações que precisávamos e seu relatório está pronto para ser gerado.
			</Text>
			<Button size={'sm'} fontWeight={10} colorScheme="azul">Gerar relatório</Button>
		</VStack>
	);
}