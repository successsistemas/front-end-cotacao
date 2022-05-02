import { Box, Divider, Flex, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useCotacoes } from "../hooks/useCotacoes";
import { Cotacao } from "../lib/types";
import { stringToData } from "../lib/utils";
import { CotacaoItem } from "./CotacaoItem";
export const ListaEmpresa = () => {
	//const { params } = useParams();
	const { cotacoes } = useCotacoes();
	return (

		<>
			<Heading fontWeight={"medium"} marginY={5}>Meus Clientes</Heading>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				px='2'
				my='1'
			>
				<VStack alignItems={"flex-start"} w="full">

					<Divider />
					<Flex w="full">
						<Box minWidth='250px' fontWeight='medium' color='blue.400'>
							<VStack alignItems={"flex-start"}>
								<Text as='span' color='blue.400' mr={2} flex={0} fontWeight='normal'>
									CLÁUDIA E HENRY CASA NOTURNA LTDA
								</Text>

								<Box fontWeight='medium'>
									<HStack>
										<Text fontSize={"sm"} color='gray.500'>
											CNPJ: 21.630.965/0001-38
										</Text>{' '}
										<Text fontSize={"sm"} color='gray.500'>
											CIDADE: UNAÍ
										</Text>
										<Spacer />
									</HStack>
								</Box>
							</VStack>
						</Box>
						<Spacer />
					</Flex>
					{
						console.log(cotacoes?.data)
					}
					{
						cotacoes?.data.map((res: Cotacao) => (
							<CotacaoItem nome={res.codigo} data={stringToData(res.data).toLocaleDateString('pt-br')} status={"STATUS DA COTAÇÃO"} codigo={res.codigo} />
						)).reverse()
					}

					<Divider />
				</VStack>
			</Flex>

		</>
	);
}