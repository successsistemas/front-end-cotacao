import { Button, Flex, HStack, Spacer, Text, useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import { useNotifications } from '@mantine/notifications';
import moment from "moment";
import React, { useContext } from "react";
import { HiOutlinePrinter } from 'react-icons/hi';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { KeyedMutator } from 'swr';
import { CotacaoContext } from '../context/CotacaoContext';
import { InfoEmpresaContext } from '../context/InfoEmpresaContext';
import { imprimir } from '../lib/printer';
import { ModalDesconto } from '../pages/ModalDesconto';



type Props = {
	total: number,
	totalDesconto: number,
	totalFrete: number,
	mutate: KeyedMutator<any>
}
//app 
moment.locale();
export const QuantidadeTotalCotacaoFinalizada = (props: Props) => {

	const notifications = useNotifications();

	const [isLargerThan600] = useMediaQuery('(min-width: 722px)');

	const { isOpen: isOpenDesconto, onOpen: onOpenDesconto, onClose: onCloseDesconto } = useDisclosure();

	const price = useContext(CotacaoContext);


	const dadosEmpresa = useContext(InfoEmpresaContext)


	const onGenerateReport = () => {
		notifications.showNotification({
			loading: false,
			title: 'Relatório',
			message: 'Seu relatório foi gerado! 🙂',
			color: 'green'
		})

		console.log(price)
		imprimir(price?.dadosTyped?.data?.itens, false, price?.dadosTyped?.data?.total, price?.dadosTyped?.data?.totalDesconto, price?.dadosTyped?.data?.frete, price?.dadosTyped?.data?.formaPagamento, dadosEmpresa?.data?.data)

	}


	return (
		<HStack w="full">
			{isLargerThan600 ?
				<HStack w="full">

					<VStack px={3} alignItems={"start"} >
						<Text fontSize={"lg"} color={"gray.500"}>Subtotal</Text>
						<Text fontSize={"lg"} mr={3} fontWeight={"semibold"}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.total)}</Text>
					</VStack>

					<VStack px={3} alignItems={"start"} >
						<Text fontSize={"lg"} color={"gray.500"}>Frete</Text>
						<Text fontSize={"lg"} fontWeight={"semibold"}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.frete)}</Text>
					</VStack>

					<VStack px={3} alignItems={"start"} >
						<Text fontSize={"lg"} color={"gray.500"}>Desconto</Text>
						<Text fontSize={"lg"} fontWeight={"semibold"}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.totalDesconto)}</Text>
					</VStack>
					<VStack alignItems={"start"}>
						<Text fontSize={"lg"} color={"gray.500"}>Total geral</Text>
						<Text fontSize={"lg"} fontWeight={"semibold"}>{(price?.dadosTyped?.data?.total + price?.dadosTyped?.data?.frete - price?.dadosTyped?.data?.totalDesconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
					</VStack>
					<Spacer />
					<Button colorScheme={"whatsapp"} leftIcon={<HiOutlinePrinter />} style={{ boxShadow: "none", width: isLargerThan600 ? "" : "100%" }} disabled={false} onClick={onGenerateReport}>
						Gerar relatório
					</Button>

					{
						// props.totalDesconto > 0 ?
						// 	<VStack alignItems={"start"}>
						// 		<Text color={"gray.500"}>Total geral</Text>
						// 		<Text fontWeight={"semibold"}>{(total + frete - totalDesconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
						// 	</VStack>
						// 	: <></>
					}



				</HStack>
				:
				<VStack w="full" mb={10}>
					<Flex w={"full"}>
						<Text fontSize={"lg"} fontWeight={"semibold"}>
							Subtotal
						</Text>
						<Spacer />
						<Text fontSize={"lg"} fontWeight={"semibold"}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.total)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text fontSize={"lg"} fontWeight={"semibold"}>
							Frete
						</Text>
						<Spacer />
						<Text fontSize={"lg"} fontWeight={"semibold"}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.frete)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text fontSize={"lg"} fontWeight={"semibold"}>
							Desconto
						</Text>
						<Spacer />
						<Text fontSize={"lg"} fontWeight={"semibold"}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.totalDesconto)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text fontSize={"lg"} fontWeight={"semibold"}>
							Total Geral
						</Text>
						<Spacer />
						<Text fontSize={"lg"} fontWeight={"semibold"}>
							{(price?.dadosTyped?.data?.total + price?.dadosTyped?.data?.frete - price?.dadosTyped?.data?.totalDesconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
						</Text>
					</Flex>

					<Button colorScheme={"whatsapp"} leftIcon={<HiOutlinePrinter />} style={{ boxShadow: "none", width: isLargerThan600 ? "" : "100%" }} disabled={false} onClick={onGenerateReport}>
						Gerar relatório
					</Button>
				</VStack>
			}

			<ModalDesconto mutate={props.mutate} isOpen={isOpenDesconto} onClose={onCloseDesconto} onOpen={onOpenDesconto} total={props.total} totalDesconto={props.totalDesconto} totalFrete={props.totalFrete} />
		</HStack >
	);
}
