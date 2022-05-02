import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Prop = {
	onClose: () => void
}

export const ListaMenu = (props: Prop) => {

	const abrirLink = (path: string) => {
		navigate(path);
		props.onClose();
	}

	const navigate = useNavigate();

	return (
		<>
			<Accordion allowToggle >
				<AccordionItem >
					<h2>
						<AccordionButton _focus={{ boxShadow: "none" }}>
							<Box flex="1" textAlign="left">
								<Text my={3}>Cotações</Text>
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pl={3} pb={4}>
						<Button onClick={() => { abrirLink('cotacoes-abertas') }} textAlign="right" w="full" fontWeight={10} colorScheme="azul" variant="ghost">Cotações Abertas</Button>
						<Divider pt={3} orientation="horizontal" />
						<Button onClick={() => { abrirLink('/painel/cotacoes-fechadas') }} textAlign="right" w="full" fontWeight={10} colorScheme="azul" variant="ghost">Cotações Fechadas</Button>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton _focus={{ boxShadow: "none" }}>
							<Box flex="1" textAlign="left">
								<Text my={3}>Relatório</Text>
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pl={3} pb={4}>
						<VStack alignItems="flex-start">
							<Button onClick={() => { abrirLink('visualizar-relatorios') }} textAlign="right" w="full" fontWeight={10} colorScheme="azul" variant="ghost">Visualizar relatórios</Button>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
				<Button onClick={() => { abrirLink('home') }} textAlign="right" w="full" fontWeight={10} colorScheme="azul" variant="ghost">Home</Button>
			</Accordion>
		</>
	);
}