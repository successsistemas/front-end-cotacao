import {
	FormControl,
	HStack, Link, Modal,
	ModalBody,
	ModalCloseButton, ModalContent,
	ModalFooter, ModalHeader, ModalOverlay, Skeleton, useDisclosure, useMediaQuery, VStack
} from "@chakra-ui/react";
import { Button } from '@mantine/core';
import { Checkbox, Input, Space, Typography } from "antd";
import React, { memo, useContext, useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { InfoFornecedorContext } from "../context/InfoFornecedorContext";
import { styles } from '../style/style';
const { Text } = Typography;

const ProfileMenuComponent = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [fornecedor, setFornecedor] = useState<any>();

	const [isLargerThan600] = useMediaQuery('(min-width: 722px)');



	const infoFornecedor = useContext(InfoFornecedorContext);

	console.log("Fornedor", infoFornecedor.data)

	const firstLetterUpperCase = (word: string) => {
		return word.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
			return a.toUpperCase();
		});
	}


	useEffect(() => {
		if (infoFornecedor?.data?.data) {
			setFornecedor(infoFornecedor?.data?.data)
		}
	}, [infoFornecedor])

	return (
		<>
			<VStack>

				{fornecedor ?
					isLargerThan600 ?

						<HStack borderRadius={5} marginRight={2} >
							<HStack><Text style={styles.Profile} >Razão social:</Text><Text style={styles.Profile} >{firstLetterUpperCase(fornecedor?.nome.trim().toLowerCase())}</Text></HStack>
							<HStack><Text style={styles.Profile}>CNPJ:</Text><Text style={styles.Profile} >{fornecedor?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</Text></HStack>
							{/* <BsInfoCircleFill color='#538EC6' cursor={"pointer"} /> */}

							<Button leftIcon={<MdExpandMore />} style={{ boxShadow: "none" }} variant='gradient' onClick={onOpen} >Ver detalhes</Button>
						</HStack>
						:
						<></>
					:
					<HStack>
						<Skeleton height='20px' w="170px" />
						<Skeleton height='20px' w="180px" />
						<Skeleton height='30px' w="100px" />
					</HStack>
				}
			</VStack>
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
							<Button variant='outline' onClick={onClose}>Cancelar</Button>
						</Space>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export const ProfileMenu = memo(ProfileMenuComponent)