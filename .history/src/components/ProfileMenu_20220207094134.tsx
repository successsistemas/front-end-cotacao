import { CaretDownOutlined } from '@ant-design/icons';
import {
	Box, FormControl,
	HStack, Link, Modal,
	ModalBody,
	ModalCloseButton, ModalContent,
	ModalFooter, ModalHeader, ModalOverlay, Skeleton, useDisclosure, VStack
} from "@chakra-ui/react";
import { Button, Checkbox, Input, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { BsInfoCircleFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { urlDataState } from '../context/atom';
import { apiGetEmpresa } from '../lib/api';

const { Text } = Typography;

export const ProfileMenu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [fornecedor, setFornecedor] = useState<any>();
	const data = useRecoilValue(urlDataState)

	//	const { logout } = useVendedor();

	useEffect(() => {

		//const data: UrlData = JSON.parse(localStorage.getItem('urlData') as string);

		const url = 'empresa/fornecedor/' + data[0]?.contratoEmpresa + '/' + data[0]?.codigoFornecedor + '/' + data[0]?.numeroEmpresa
		const result = apiGetEmpresa(url)
		result.then((result) => {
			setFornecedor(result.data)
		}).catch(error => {
		})
	}, [data])

	return (
		<>
			<Box px={3} display="flex" alignItems="center" alignContent="center" minH="full">

				{fornecedor ?
					<HStack borderRadius={5} p={1}>
						<HStack><Text>Nome:</Text><Text strong>{fornecedor?.nome.toLowerCase()}</Text></HStack>
						<HStack><Text>CNPJ:</Text><Text strong>{fornecedor?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</Text></HStack>
						<BsInfoCircleFill color='#538EC6' cursor={"pointer"} />

						<Button onClick={onOpen} type={"primary"} icon={<CaretDownOutlined />}>Ver detalhes</Button>
					</HStack>
					:
					<HStack>
						<Skeleton height='20px' w="170px" />
						<Skeleton height='20px' w="180px" />
						<Skeleton height='30px' w="100px" />
					</HStack>
				}
			</Box>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader alignItems="center" fontSi fontWeight="normal" >
						<Text>Identificação do vendedor</Text>
					</ModalHeader>
					<ModalCloseButton _focus={{ boxShadow: 'none' }} />
					<ModalBody >


						<VStack>
							<FormControl>
								<VStack alignItems={"flex-start"}>
									<Text>Nome</Text>
									<Input onChange={(e) => { }} placeholder="ex: João" />
									<Text>CNPJ</Text>
									<Input onChange={(e) => { }} placeholder="ex: 58.613.915/0001-52" />

									<Checkbox onChange={() => { }}>Li e concordo com os <Link>termos e condições.</Link></Checkbox>

								</VStack>



							</FormControl>
						</VStack>

					</ModalBody>

					<ModalFooter>
						<Space>
							<Button loading={false} onClick={() => { }} >
								Salvar
							</Button>
							<Button type={"primary"} onClick={onClose}>Cancelar</Button>
						</Space>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}