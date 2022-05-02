import { HStack, Skeleton, Spacer, Stack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { Collapse } from 'antd';
import React, { useContext, useEffect, useState } from "react";
import { CotacaoContext } from '../context/CotacaoContext';
import { InfoEmpresaContext } from '../context/InfoEmpresaContext';
import { UrlContext } from '../context/UrlContext';
import { Empresa } from "../lib/types";


const { Panel } = Collapse;


export const InfoEmpresa = () => {
	const [empresa, setEmpresa] = useState<Empresa | null>();

	const [isLargerThan600] = useMediaQuery('(min-width: 4080px)');


	const dadosUrl = useContext(UrlContext);
	const price = useContext(CotacaoContext)

	const dadosEmpresa = useContext(InfoEmpresaContext)



	const [codCotacao, setCodCotacao] = useState();

	useEffect(() => {

		//const data: UrlData = JSON.parse(localStorage.getItem('urlData') as string);

		setEmpresa(dadosEmpresa?.data?.data)

		if (price !== undefined) {
			setCodCotacao(price.numeroCotacao)

		}

	}, [dadosEmpresa, price])

	const firstLetterUpperCase = (word: string) => {
		return word.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
			return a.toUpperCase();
		});
	}



	return (
		empresa ?
			isLargerThan600 ?

				<>

					<HStack>

						<Text fontSize={"16px"} fontFamily={"Roboto"} style={{ fontWeight: 500 }} as='span' color='blue.300' fontWeight='normal'>
							{firstLetterUpperCase(empresa?.razao)}
						</Text>
						<Text fontSize={"16px"} fontFamily={"Roboto"} style={{ fontWeight: 500 }} color='gray.500'>
							CNPJ: {empresa?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
						</Text>
						<Text fontSize={"16px"} fontFamily={"Roboto"} style={{ fontWeight: 500 }} color='gray.500'>
							cidade: {empresa?.cidade}
						</Text>
						<Text fontSize={"16px"} fontFamily={"Roboto"} style={{ fontWeight: 500 }} color='gray.500'>
							ctação: {codCotacao}
						</Text>
						<Spacer />
						<Text fontSize={"16px"} fontFamily={"Roboto"} style={{ fontWeight: 500 }} color='gray.500'>
							vencimento: {dadosUrl?.dataMoment?.format('llll').toLowerCase()}
						</Text>
					</HStack>

				</>
				: <VStack w={"100%"} alignItems={"start"}>

					<Collapse style={{ width: "100%" }} collapsible="header" defaultActiveKey={['0']}>
						<Panel header={firstLetterUpperCase(empresa?.razao)} key="1">
							<Text fontSize={"sm"} color='gray.500'>
								CNPJ: {empresa?.cnpj}
							</Text>
							<Text fontSize={"sm"} color='gray.500'>
								CIDADE: {empresa?.cidade}
							</Text>
							<Text fontSize={"sm"} color='gray.500'>
								COTAÇÃO: {codCotacao}
							</Text>
							<Spacer />
							<Text fontSize={"sm"} color='gray.500'>
								VENCIMENTO: {dadosUrl?.dataMoment?.format('llll').toUpperCase()}
							</Text>
						</Panel>
					</Collapse>
				</VStack>
			:
			<Stack >
				<Skeleton height='20px' w="170px" />
				<Skeleton height='20px' w="400px" />
				<Skeleton height='20px' w="180px" />
			</Stack>
	);
}