import { Badge, Button, Flex, HStack, Spacer, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

type Props = {
	nome: string;
	data: string;
	status: string;
	codigo: string;
}

export const CotacaoItem = (props: Props) => {
	const navigate = useNavigate();
	return (
		<HStack w={"full"}>
			<Flex
				justifyContent={"center"}
				alignItems={"center"}
				w={"full"}
				cursor='pointer'
				onClick={() => { }}
				_hover={{
					shadow: 'sm',
					boxShadow: 'outline',
				}}
			>
				<Text color='blue.400' mr={2} fontWeight='normal'>
					{props.nome}
				</Text>
				<Spacer />
				<Text marginX={10} h="20px" fontSize={"sm"} color='gray.500'>{props.data}</Text>
				<Badge size={"sm"} h="20px" colorScheme="yellow" marginX={10}>status da cotação</Badge>
				<HStack>
					<Tooltip label="Acessar cotação">
						<Button onClick={() => { navigate('/painel/lista/' + props.codigo + '/codigoDoFornecedor') }} colorScheme={"blue"} variant={"ghost"}><AiFillEye color="blue.300" /></Button>
					</Tooltip>
				</HStack>
			</Flex>
		</HStack>
	);
}