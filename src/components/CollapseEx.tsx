import { Button, Collapse, HStack, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
export const CollapseEx = () => {
	const { isOpen, onToggle } = useDisclosure()

	return (
		<VStack w="full" alignItems={"start"}>
			<HStack w="full">
				<Button onClick={onToggle}>{!isOpen ? "Mais detalhes do Solicitante" : "Menos detalhes do Solicitante"}</Button>
				<Spacer />
				<Text fontWeight={"bold"} fontSize={"lg"}>12 itens</Text>
			</HStack>

			<Collapse style={{ width: "100%" }} in={isOpen} animateOpacity>
				<VStack borderRadius={"10px"} p="10px" w="full" bg="gray.100" alignItems={"start"}>
					<HStack>
						<Text fontSize={"md"}>CNPJ:</Text>
						<Text fontSize={"md"}>14.600.56-36-11</Text>
					</HStack>
					<HStack>
						<Text fontSize={"md"}>Cidade:</Text>
						<Text fontSize={"md"}>Paracatu</Text>
					</HStack>
					<HStack>
						<Text fontSize={"md"}>Vencimento:</Text>
						<Text fontSize={"md"}>QUIN agosto</Text>
					</HStack>
				</VStack>
			</Collapse>
		</VStack>
	)
}