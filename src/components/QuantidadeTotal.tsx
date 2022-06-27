import { Flex, HStack, Spacer, Text, useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import { Button } from '@mantine/core';
import { Tooltip } from 'antd';
import { motion } from 'framer-motion';
import moment from "moment";
import React, { useContext } from "react";
import { CgEyeAlt } from 'react-icons/cg';
import { KeyedMutator } from 'swr';
import { CotacaoContext } from '../context/CotacaoContext';
import { ModalDesconto } from '../pages/ModalDesconto';
type Props = {
	total: number,
	totalDesconto: number,
	totalFrete: number,
	mutate: KeyedMutator<any>
}
//app 
moment.locale();
export const QuantidadeTotal = (props: Props) => {


	const [isLargerThan600] = useMediaQuery('(min-width: 722px)');

	const { isOpen: isOpenDesconto, onOpen: onOpenDesconto, onClose: onCloseDesconto } = useDisclosure();

	const price = useContext(CotacaoContext);
	console.log(price?.dadosTyped?.data?.total)





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
					<motion.div
						style={{ paddingLeft: 3, paddingRight: 3 }}
						whileHover={{ scale: 1.2, color: "red" }}
					>
						<Tooltip title={"Mais informações"}>
							<Button style={{ boxShadow: "none" }} variant='subtle' onClick={onOpenDesconto}>
								<CgEyeAlt color='gray' />
							</Button>
						</Tooltip>
					</motion.div>


				</HStack>
				:
				<VStack w="full" mb={5}>
					<Flex w={"full"}>
						<Text fontSize={"lg"} fontFamily={"Roboto"} style={{ fontWeight: 500 }}>
							Subtotal dos Itens
						</Text>
						<Spacer />
						<Text fontSize={"lg"} fontFamily={"Roboto"} style={{ fontWeight: 500 }}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.total)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text fontSize={"lg"} fontFamily={"Roboto"} style={{ fontWeight: 500 }}>
							Frete
						</Text>
						<Spacer />
						<Text fontSize={"lg"} fontFamily={"Roboto"} style={{ fontWeight: 500 }}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.frete)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text fontSize={"lg"} fontFamily={"Roboto"} style={{ fontWeight: 500 }}>
							Desconto
						</Text>
						<Spacer />
						<Text fontSize={"lg"} fontFamily={"Roboto"} style={{ fontWeight: 500 }}>
							{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price?.dadosTyped?.data?.totalDesconto)}
						</Text>
					</Flex>

					<Flex w={"full"}>
						<Text fontSize={"lg"} fontFamily={"Roboto"} style={{ fontWeight: 500 }}>
							Total Geral
						</Text>
						<Spacer />
						<Text fontSize={"lg"} fontFamily={"Roboto"} style={{ fontWeight: 500 }}>
							{(price?.dadosTyped?.data?.total + price?.dadosTyped?.data?.frete - price?.dadosTyped?.data?.totalDesconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
						</Text>
					</Flex>

					<Button variant='subtle' onClick={onOpenDesconto}  >Ver mais detalhes</Button>
				</VStack>
			}

			<ModalDesconto mutate={props.mutate} isOpen={isOpenDesconto} onClose={onCloseDesconto} onOpen={onOpenDesconto} total={props.total} totalDesconto={props.totalDesconto} totalFrete={props.totalFrete} />
		</HStack>
	);
}
QuantidadeTotal.whyDidYouRender = true;