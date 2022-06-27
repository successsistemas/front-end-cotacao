import {
	FormControl,
	HStack, Link, Modal,
	ModalBody,
	ModalCloseButton, ModalContent,
	ModalFooter, ModalHeader, ModalOverlay, Text as TextChakra, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Skeleton, useDisclosure, useMediaQuery, VStack, Divider
} from "@chakra-ui/react";
import { Button } from '@mantine/core';
import { Checkbox, Input, Space, Typography } from "antd";
import React, { memo, useContext, useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { CotacaoContext } from "../context/CotacaoContext";
import { InfoEmpresaContext } from "../context/InfoEmpresaContext";
import { InfoFornecedorContext } from "../context/InfoFornecedorContext";
import { UrlContext } from "../context/UrlContext";
import { Empresa } from "../lib/types";
import { styles } from '../style/style';
const { Text } = Typography;

const ProfileMenuComponent = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [fornecedor, setFornecedor] = useState<any>();

	const [isLargerThan600] = useMediaQuery('(min-width: 722px)');
	const [empresa, setEmpresa] = useState<Empresa | null>();



	const dadosUrl = useContext(UrlContext);
	const price = useContext(CotacaoContext)

	const dadosEmpresa = useContext(InfoEmpresaContext)


	const infoFornecedor = useContext(InfoFornecedorContext);

	const [codCotacao, setCodCotacao] = useState();

	const firstLetterUpperCase = (word: string) => {
		return word.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
			return a.toUpperCase();
		});
	}


	useEffect(() => {
		setEmpresa(dadosEmpresa?.data?.data)

		if (price !== undefined) {
			setCodCotacao(price.numeroCotacao)

		}
		if (infoFornecedor?.data?.data) {
			setFornecedor(infoFornecedor?.data?.data)
		}
	}, [infoFornecedor, dadosEmpresa, price])

	return (
		<>
			<VStack>

				{fornecedor ?
					isLargerThan600 ?

						<HStack borderRadius={5} marginRight={2} >
							<HStack><Text style={styles.Profile} >Razão social:</Text><Text style={styles.Profile} >{firstLetterUpperCase(fornecedor?.nome.trim().toLowerCase())}</Text></HStack>
							<HStack><Text style={styles.Profile}>CNPJ:</Text><Text style={styles.Profile} >{fornecedor?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</Text></HStack>
							{/* <BsInfoCircleFill color='#538EC6' cursor={"pointer"} /> */}


							<Popover autoFocus={false}>
								<PopoverTrigger>
									<Button leftIcon={<MdExpandMore />} style={{ boxShadow: "none" }} variant='gradient' onClick={() => { }} >Meu perfil</Button>
								</PopoverTrigger>
								<Portal>
									<PopoverContent>
										<PopoverArrow />
										<PopoverHeader><TextChakra fontSize={"lg"}>Dados do usuário</TextChakra></PopoverHeader>
										<PopoverCloseButton />
										<PopoverBody>
											<HStack>
												<TextChakra fontWeight={"600"} fontSize={"md"}>Razão social:</TextChakra>
												<TextChakra fontSize={"md"}>{firstLetterUpperCase(fornecedor?.nome.trim().toLowerCase())}</TextChakra>
											</HStack>
											<HStack>
												<TextChakra fontWeight={"600"} fontSize={"md"}>CNPJ:</TextChakra>
												<TextChakra fontSize={"md"}>{fornecedor?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</TextChakra>
											</HStack>
											<Divider />
											<HStack mt={5}>
												<TextChakra fontSize={"lg"}>Empresa solicitante:</TextChakra>

											</HStack>
											<HStack>
												<TextChakra fontWeight={"600"} fontSize={"md"}>Razão social:</TextChakra>
												<TextChakra fontSize={"md"}>{empresa?.razao}</TextChakra>
											</HStack>
										</PopoverBody>
										<PopoverFooter>This is the footer</PopoverFooter>
									</PopoverContent>
								</Portal>
							</Popover>
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