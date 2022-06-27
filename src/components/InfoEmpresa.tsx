import { Button, Collapse, HStack, Skeleton, Spacer, Stack, Text, useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { CotacaoContext } from '../context/CotacaoContext';
import { InfoEmpresaContext } from '../context/InfoEmpresaContext';
import { UrlContext } from '../context/UrlContext';
import { useCotacao } from '../hooks/useCotacao';
import { Empresa } from '../lib/types';

export const InfoEmpresa = () => {
	const [empresa, setEmpresa] = useState<Empresa | null>();

	const [isLargerThan600] = useMediaQuery('(min-width: 4080px)');


	const dadosUrl = useContext(UrlContext);
	const price = useContext(CotacaoContext)

	const dadosEmpresa = useContext(InfoEmpresaContext)
	const { isOpen, onToggle } = useDisclosure()

	const dadosCotacao = useCotacao();
	const [codCotacao, setCodCotacao] = useState();

	useEffect(() => {
		console.log("tamanho: " + JSON.stringify(dadosCotacao?.dadosTyped?.itens.length))
		//const data: UrlData = JSON.parse(localStorage.getItem('urlData') as string);

		setEmpresa(dadosEmpresa?.data?.data)

		if (price !== undefined) {
			setCodCotacao(price.numeroCotacao)

		}

	}, [dadosEmpresa, price, dadosCotacao])

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
				:
				<VStack w="full" alignItems={"start"}>
					<HStack w="full">
						<Button onClick={onToggle}>{!isOpen ? "Mais detalhes do Solicitante" : "Menos detalhes do Solicitante"}</Button>
						<Spacer />
						<Text fontWeight={"bold"} fontSize={"lg"}>{dadosCotacao?.dadosTyped?.itens.length} itens</Text>
					</HStack>

					<Collapse style={{ width: "100%" }} in={isOpen} animateOpacity>
						<VStack borderRadius={"10px"} p="10px" w="full" bg="gray.100" alignItems={"start"}>
							<HStack>
								<Text fontSize={"md"}>CNPJ:</Text>
								<Text fontSize={"md"}>{empresa?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</Text>
							</HStack>
							<HStack>
								<Text fontSize={"md"}>Cidade:</Text>
								<Text fontSize={"md"}>{empresa?.cidade}</Text>
							</HStack>
							<HStack>
								<Text fontSize={"md"}>Vencimento:</Text>
								<Text fontSize={"md"}> {dadosUrl?.dataMoment?.format('llll').toLowerCase()}</Text>
							</HStack>
						</VStack>
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