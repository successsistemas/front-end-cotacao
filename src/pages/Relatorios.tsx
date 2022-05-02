import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { Caminho } from "../components/CaminhoIndicador";
import { Pronto } from "./Pronto";
import { QualCotacao } from "./QualCotacao";
import { TipoRelatorio } from "./TipoDeRelatorio";

type Prop = {
}

export const Relatorios = (props: Prop) => {
	return (
		<Box ml={3} mt={2}>
			<Caminho caminhoMain={"Menu"} caminhoAtual={"relatorios"} />
			<Tabs variant="enclosed" colorScheme="green">
				<TabList >
					<Tab fontSize={"sm"} _focus={{ boxShadow: 'none' }}>Tipo de relatório</Tab>
					<Tab fontSize={"sm"} _focus={{ boxShadow: 'none' }}>Qual contação</Tab>
					<Tab fontSize={"sm"} _focus={{ boxShadow: 'none' }}>Pronto</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<TipoRelatorio />
					</TabPanel>
					<TabPanel>
						<QualCotacao />
					</TabPanel>
					<TabPanel>
						<Pronto />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
}
