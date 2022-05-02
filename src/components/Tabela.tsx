import {
	Button, Center, HStack, Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent, ModalFooter,
	ModalHeader,
	ModalOverlay, Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure, VStack
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { object, string } from 'yup';
import { CotacaoTDO } from '../lib/types';
import { CampoBuscar } from "./CampoBuscar";
import { SubmitButton, TextField } from "./Form";
import { Paginacao } from "./Paginacao";


type Prop = {
	cotacoes: Array<CotacaoTDO>,
	isAberta: boolean,
	currentPage: number,
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	titulo: string

}



export const Tabela = (props: Prop) => {
	const [produtoAtual, setProdutoAtual] = useState<CotacaoTDO | null>(null)

	const abrirModal = (cotacao: CotacaoTDO) => {
		setProdutoAtual(cotacao);
		modal.onOpen();
	}

	const fecharModal = () => {
		setProdutoAtual(null);
		modal.onClose();
	}
	const newGoalSchema = object().shape({
		oferta: string().required('Esse campo é obrigatório').min(3),
		quantidade: string().required('Esse campo é obrigatório')

	})
	const modal = useDisclosure();
	return (
		<>
			<VStack overflowX="auto" overflowY="auto" h="400px" border={"2px"} borderColor={"gray.200"} borderRadius={3} p={3} w={"100%"} bg={"gray.100"} alignItems="flex-start">
				<CampoBuscar titulo={props.titulo} />
				<Table color={'gray'} variant="unstyled" colorScheme="azul">
					<TableCaption></TableCaption>
					<Thead>
						<Tr >
							<Th w="10%"><Text color={'gray'}><Text>Código</Text></Text></Th>
							<Th w="20%"><Text color={'gray'}>Produto</Text></Th>
							<Th w="5%" isNumeric><Text color={'gray'}>Quantidade</Text></Th>
							<Th w="10%"><Text color={'gray'}>Sua oferta</Text></Th>
							<Th w="10%"><Text color={'gray'}>IPI/ST</Text></Th>
							<Th w="30%"><Text color={'gray'}>Observações</Text></Th>
							<Th w="5%">Estado</Th>
							<Th w="5%">Ação</Th>
						</Tr>
					</Thead>
					<Tbody>
						{
							props.cotacoes?.map((cotacao: CotacaoTDO) => (
								<Tr fontSize={"sm"} bg="white" color={"black"}>
									<Td >{cotacao.codigo}</Td>
									<Td>{cotacao.produto}</Td>
									<Td isNumeric>{cotacao.quantidade}</Td>
									<Td>{"R$ " + cotacao.suaOferta}</Td>
									<Td>{cotacao.ipiSt}</Td>
									<Td>{cotacao.observacao}</Td>
									{
										props.isAberta ?
											<Td><HStack><BsCircleFill size={"8px"} color="#F1A25C" /><Text>Pendente</Text></HStack></Td>
											: <Td><HStack><BsCircleFill size={"8px"} color="#7DCD63" /><Text>Finalizada</Text></HStack></Td>
									}
									{
										props.isAberta ?
											<Td><Button onClick={() => { abrirModal(cotacao) }}><FiEdit /></Button></Td>
											:
											<Td><Button onClick={() => { }}><AiOutlineInfoCircle /></Button></Td>
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


			<Modal isOpen={modal.isOpen} onClose={fecharModal}>
				<ModalOverlay />
				<Formik
					initialValues={{ oferta: '', quantidade: '' }}
					validationSchema={newGoalSchema}
					onSubmit={() => { }}
				>
					<Form>
						<ModalContent>
							<ModalHeader>{produtoAtual?.produto}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<TextField name='oferta' placeholder='Sua oferta' />
								<TextField name='quantidade' placeholder='Quantidade' />

							</ModalBody>
							<ModalFooter>
								<Button variant='ghost' mr={3} onClick={modal.onClose}>
									Cancelar
								</Button>
								<SubmitButton onClick={() => { console.log(produtoAtual) }} colorScheme='blue'>Salvar</SubmitButton>
							</ModalFooter>
						</ModalContent>
					</Form>
				</Formik>
			</Modal>

		</>
	);
}