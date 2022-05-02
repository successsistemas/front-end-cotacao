import { Flex, HStack, Spacer, Text, useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import { Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { HiOutlinePrinter } from 'react-icons/hi';
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BiPrinter } from 'react-icons/bi';
import { KeyedMutator } from 'swr';
import { CotacaoContext } from '../context/CotacaoContext';
import { ModalDesconto } from '../pages/ModalDesconto';
import { imprimir } from '../lib/printer'
import { InfoEmpresaContext } from '../context/InfoEmpresaContext';
import { styles } from '../style/style';



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



	const [total, setTotal] = useState<number>(0);
	const [frete, setFrete] = useState<number>(0);
	const [totalDesconto, setTotalDesconto] = useState<number>(0);

	const dadosEmpresa = useContext(InfoEmpresaContext)

	useEffect(() => {

		if (price.total !== undefined && price.totalFrete !== undefined && price.totalDesconto !== undefined) {
			setTotal(price.total);
			setFrete(price.totalFrete)
			setTotalDesconto(price.totalDesconto)
		}
	}, [price])

	const onGenerateReport = () => {
		notifications.showNotification({
			loading: false,
			title: 'Relatório',
			message: 'Seu relatório foi gerado! 🙂',
			color: 'green'
		})

		console.log(price)
		imprimir(price.cotacoes, false, price.total, price.totalDesconto, price.totalFrete, price.formaPagamento, dadosEmpresa?.data?.data)

	}


	return (
		<HStack w="full">
			{isLargerThan600 ?
				<HStack w="full">

					<VStack px={3} alignItems={"start"} >
						<Text color={"gray.500"}>Subtotal</Text>
						<Text mr={3} fontWeight={"semibold"}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(total)}</Text>
					</VStack>

					<VStack px={3} alignItems={"start"} >
						<Text color={"gray.500"}>Frete</Text>
						<Text fontWeight={"semibold"}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(frete)}</Text>
					</VStack>

					<VStack px={3} alignItems={"start"} >
						<Text color={"gray.500"}>Desconto</Text>
						<Text fontWeight={"semibold"}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalDesconto)}</Text>
					</VStack>
					<VStack alignItems={"start"}>
						<Text color={"gray.500"}>Total geral</Text>
						<Text fontWeight={"semibold"}>{(total + frete - totalDesconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
					</VStack>
					<Spacer />
					<Button leftIcon={<HiOutlinePrinter />} style={{ boxShadow: "none", width: isLargerThan600 ? "" : "100%" }} disabled={false} onClick={onGenerateReport}>
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
						<Text style={styles.font14Apple}>
							Subtotal
						</Text>
						<Spacer />
						<Text style={styles.font14Apple}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(total)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text style={styles.font14Apple}>
							Frete
						</Text>
						<Spacer />
						<Text style={styles.font14Apple}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(frete)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text style={styles.font14Apple}>
							Desconto
						</Text>
						<Spacer />
						<Text style={styles.font14Apple}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalDesconto)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text style={styles.font14Apple}>
							Total Geral
						</Text>
						<Spacer />
						<Text style={styles.font14Apple}>
							{(total + frete - totalDesconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
						</Text>
					</Flex>

					<Button leftIcon={<HiOutlinePrinter />} style={{ boxShadow: "none", width: isLargerThan600 ? "" : "100%" }} disabled={false} onClick={onGenerateReport}>
						Gerar relatório
					</Button>
				</VStack>
			}

			<ModalDesconto mutate={props.mutate} isOpen={isOpenDesconto} onClose={onCloseDesconto} onOpen={onOpenDesconto} total={props.total} totalDesconto={props.totalDesconto} totalFrete={props.totalFrete} />
		</HStack >
	);
}
