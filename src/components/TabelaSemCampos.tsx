import React from "react";
import { Table, Input, Text, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, VStack, Center, HStack } from "@chakra-ui/react";
import { Paginacao } from "./Paginacao";
import { CotacaoData } from '../generated/index';
import { RiFileWarningFill } from 'react-icons/ri';
import { ImCheckboxChecked } from 'react-icons/im';
type Prop = {
	cotacoes: Array<CotacaoData>,
	isAberta: boolean,
	currentPage: number,
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>

}

export const TabelaSemCampos = (props: Prop) => {
	return (
		<>
			<VStack border={"2px"} borderColor={"gray.200"} borderRadius={3} p={3} w={"full"} bg={"gray.100"} alignItems="flex-start">
				<Table w="full" color={'gray'} variant="unstyled" colorScheme="azul">
					<TableCaption></TableCaption>
					<Thead>
						<Tr >
							<Th><Text color={'gray'}><Text>Código</Text></Text></Th>
							<Th><Text color={'gray'}>Produto</Text></Th>
							<Th isNumeric><Text color={'gray'}>Quantidade</Text></Th>
							<Th><Text color={'gray'}>Sua oferta</Text></Th>
							<Th><Text color={'gray'}>IPI/ST</Text></Th>
							<Th><Text color={'gray'}>Observações</Text></Th>
							<Th>Estado</Th>
						</Tr>
					</Thead>
					<Tbody>
						{
							props.cotacoes?.map((cotacao: CotacaoData) => (
								<Tr>
									<Td>{cotacao.codigo}</Td>
									<Td>{cotacao.produto}</Td>
									<Td isNumeric>{cotacao.quantidade}</Td>
									<Td><Input variant={"unstyled"} placeholder={"R$ " + cotacao.suaOferta} /></Td>
									<Td><Input variant={"unstyled"} placeholder={cotacao.ipiSt} /></Td>
									<Td><Input variant={"unstyled"} placeholder={cotacao.observacao} /></Td>
									{
										props.isAberta ?
											<Td><HStack><RiFileWarningFill color="#F1A25C" /><Text>Pendente</Text></HStack></Td>
											: <Td><HStack><ImCheckboxChecked color="#7DCD63" /><Text>Finalizada</Text></HStack></Td>
									}
								</Tr>
							)).reverse()
						}
					</Tbody>
					<Tfoot>
					</Tfoot>
				</Table >
			</VStack>
			<Center>
				<Paginacao currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} totalItens={50} quantidadePorPagina={10} />
			</Center>
		</>
	);
}