import { Text } from "@chakra-ui/layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack } from "@chakra-ui/react";
import React from "react";

type Prop = {
	caminhoMain: string,
	caminhoAtual: string | undefined,
}

export const Caminho = (props: Prop) => {
	return (
		<VStack mb={5} alignItems="flex-start" w="full">
			<Breadcrumb color={"gray"}>
				<BreadcrumbItem>
					<BreadcrumbLink href="#"><Text>{props.caminhoMain}</Text></BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href="/cotacoes-fechadas"><Text>{props.caminhoAtual}</Text></BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

		</VStack>
	);
}