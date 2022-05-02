import React from "react";
import { AiFillUnlock, AiFillLock } from 'react-icons/ai';
import { Box, Tooltip, Flex, Button, Text, Heading, VStack, Divider, HStack, Spacer, Badge, Center } from "@chakra-ui/react";

export const ListaUsuarios = () => {
	return (
		<>
			<Heading fontWeight={"medium"} marginY={5}>Usuários/Vendedores</Heading>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				px='2'
				my='1'
				cursor='pointer'
				onClick={() => { }}
				_hover={{
					shadow: 'sm',
					boxShadow: 'outline',
				}}
			>
				<VStack alignItems={"flex-start"} w="full">

					<Divider />
					<Flex w="full">
						<Box minWidth='250px' fontWeight='medium' color='blue.400'>
							<VStack alignItems={"flex-start"}>
								<Text as='span' color='blue.300' mr={2} flex={0} fontWeight='normal'>
									FELIPE EDUARDO MARCIAL
								</Text>

								<Box fontWeight='medium'>
									<HStack>
										<Text fontSize={"sm"} color='gray.500'>
											CPF: 21.630.965/0001-38
										</Text>{' '}
										<Text fontSize={"sm"} color='gray.500'>
											CIDADE: PARACATU
										</Text>
										<Spacer />
									</HStack>
								</Box>
							</VStack>
						</Box>
						<Spacer />
						<HStack>
							<Center>
								<Badge size={"sm"} h="20px" colorScheme="red" marginX={10}>bloqueado</Badge>
								<Text marginX={10} h="20px" fontSize={"sm"} color='gray.500'>Bloqueado por: 1344455333</Text>
								<Tooltip label="desbloquear usuário">
									<Button colorScheme={"blue"} variant={"ghost"}><AiFillLock color="red" /></Button>
								</Tooltip>
							</Center>
						</HStack>
					</Flex>
					<Divider />
				</VStack>
			</Flex>

			<Flex
				direction={{ base: 'column', sm: 'row' }}
				px='2'
				my='1'
				cursor='pointer'
				onClick={() => { }}
				_hover={{
					shadow: 'sm',
					boxShadow: 'outline',
				}}
			>
				<VStack alignItems={"flex-start"} w="full">

					<Divider />
					<Flex w="full">
						<Box minWidth='250px' fontWeight='medium' color='blue.400'>
							<VStack alignItems={"flex-start"}>
								<Text as='span' color='blue.300' mr={2} flex={0} fontWeight='normal'>
									MATEUS AMARAL
								</Text>

								<Box fontWeight='medium'>
									<HStack>
										<Text fontSize={"sm"} color='gray.500'>
											CPF: 51.430.965/0001-38
										</Text>{' '}
										<Text fontSize={"sm"} color='gray.500'>
											CIDADE: PARACATU
										</Text>
										<Spacer />
									</HStack>
								</Box>
							</VStack>
						</Box>
						<Spacer />
						<HStack>
							<Center>
								<Badge size={"sm"} h="20px" colorScheme="green" marginX={10}>desbloqueado</Badge>
								<Text marginX={10} h="20px" fontSize={"sm"} color='gray.500'>Este usuário não está bloqueado</Text>
								<Tooltip label="bloquear usuário">
									<Button colorScheme={"blue"} variant={"ghost"}><AiFillUnlock color="green" /></Button>
								</Tooltip>
							</Center>
						</HStack>
					</Flex>
					<Divider />
				</VStack>
			</Flex>
		</>
	);
}