import React, { useEffect, useState } from "react";
import { Box, VStack, Text, HStack, Spacer, Stack, Skeleton } from '@chakra-ui/react';
import { apiGetEmpresa } from "../lib/api";
import { Empresa, UrlData } from "../lib/types";
import { useRecoilValue } from "recoil";
import { urlDataState } from "../context/atom";
export const InfoEmpresa = () => {
	const [empresa, setEmpresa] = useState<Empresa | null>();

	const data = useRecoilValue(urlDataState)


	useEffect(() => {

		//const data: UrlData = JSON.parse(localStorage.getItem('urlData') as string);

		const url = 'empresa/' + data[0]?.contratoEmpresa + '/' + data[0]?.codigoFornecedor + '/' + data[0]?.numeroEmpresa
		const result = apiGetEmpresa(url)
		result.then((result) => {
			setEmpresa(result.data);
		}).catch(error => {
		})
	}, [data])
	return (
		empresa ?
			<Box minWidth='250px' fontWeight='medium' color='blue.400' mb={5}>
				<VStack alignItems={"flex-start"}>
					<Text as='span' color='blue.300' mr={2} flex={0} fontWeight='normal'>
						{empresa?.razao}
					</Text>
					<Box fontWeight='medium'>
						<HStack>
							<Text fontSize={"sm"} color='gray.500'>
								CNPJ: {empresa?.cnpj}
							</Text>{' '}
							<Text fontSize={"sm"} color='gray.500'>
								CIDADE: {empresa?.cidade}
							</Text>
							<Spacer />
						</HStack>
					</Box>
				</VStack>
			</Box>
			:
			<Stack >
				<Skeleton height='20px' w="170px" />
				<Skeleton height='20px' w="400px" />
				<Skeleton height='20px' w="180px" />
			</Stack>
	);
}