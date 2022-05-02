/* eslint-disable react-hooks/exhaustive-deps */
import {
	HStack, Modal,
	ModalBody,
	ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useMediaQuery
} from "@chakra-ui/react";
import { Button, Modal as ModalMantine } from '@mantine/core';
import { message, Space, Typography } from "antd";
import React, { useContext, useState } from "react";
import { KeyedMutator } from "swr";
import { UrlContext } from "../context/UrlContext";
import { Flag } from "../enuns/enuns";
import { useFlagFornecedor } from '../hooks/useFlagFornecedor';
import { CotacaoTDOPayload } from "../lib/types";
import { ModalDesconto } from '../pages/ModalDesconto';
import { styles } from "../style/style";


const { Text } = Typography;
type Props = {
	setAllPreenchido: React.Dispatch<React.SetStateAction<boolean>>,
	loading: boolean,
	setEnviado: React.Dispatch<React.SetStateAction<boolean>>,
	mutate: KeyedMutator<any>,
	readyToSend: boolean

}
export const FinalizarCotacao = (props: Props) => {

	const [isLargerThan600] = useMediaQuery('(min-width: 600px)');

	//const { dados } = useCotacaoFlag(payload);

	const [opened, setOpened] = useState(false);

	const success = () => {
		message.success('Dados enviados com sucesso!');

	};
	const error = () => {
		message.error('Fornecedor não foi encontrado na base de dados', 1);
	};
	const msgErro = (text: string, duration: number) => {
		message.error(text, duration);

	};

	const { isOpen, onOpen, onClose } = useDisclosure()

	const [isLoading, setIsLoading] = useState(false);

	const { apiPostFlagFornecedor, apiPostOfferInfo } = useFlagFornecedor();



	const dadosUrl = useContext(UrlContext);



	const { isOpen: isOpenDesconto, onOpen: onOpenDesconto, onClose: onCloseDesconto } = useDisclosure()




	function salvar() {
		onOpen();
	}


	async function updateFlagFornecedor() {
		setIsLoading(true)

		const payLoad: CotacaoTDOPayload = {
			codigo: dadosUrl?.numeroCotacao,
			fornecedor: dadosUrl?.codigoFornecedor,
			flag: Flag.PREENCHIDO,
			contratoEmpresa: dadosUrl?.contratoEmpresa,
			codigoEmpresa: dadosUrl?.numeroEmpresa
		}

		const result = await apiPostFlagFornecedor(payLoad)
		if (result.data.data === 201) {

			//*Criar o objeto e passar ele como parameteo na função apiPostOfferInfo */

			const data = {
				...payLoad,
				dados: {
					observacao: "something here",
					tempoEntrega: 12
				}
			}

			await apiPostOfferInfo(data).then((result: any) => {
				if (result?.error) {
					msgErro("Ocorreu um erro ao salvar a observação; " + result.error, 3)
				}
			})
			setOpened(true)
			onClose();
			success();
			setIsLoading(false)
			props.setAllPreenchido(true);
			props.setEnviado(true)
			//localStorage.clear();
		}
		else if (result.data.data === 400) {
			msgErro('Ocorreu um erro na payload:', 2);
		}
		else {
			onClose();
			setIsLoading(false)
			error();
		}
	}

	return <>
		{/* <Alert status='info' my={4}>
			<AlertIcon />
			<Text style={{ color: "#228BE6	" }}>	Antes de efetuar o envio, certifique-se de preencher todos os itens da tabela.</Text>
		</Alert> */}
		<Button style={{ boxShadow: "none", width: isLargerThan600 ? "" : "100%" }} disabled={false} onClick={() => { salvar() }}>
			Finalizar cotação
		</Button>

		<Space />

		<Modal
			isOpen={isOpen}
			onClose={onClose}>

			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontWeight="normal">
					<HStack>
						<Text style={{ fontWeight: 500, fontSize: 16 }}>Confirmação de envio</Text>
					</HStack>
				</ModalHeader>
				<ModalCloseButton _focus={{ boxShadow: "none" }} />
				<ModalBody>
					<Text style={styles.Font16}>Após a confirmação a cotação não poderá mais ser editada.</Text>
					{/* <Textarea
						value={note}
						onChange={(e) => setNote(e.target.value)}
						mt={5}
						placeholder="Observação"
						label="Deixe aqui sua observação"
						autosize
						minRows={2}
					/>

					<Input value={deliveryTime} onChange={(e: any) => setDeliveryTime(e.target.value)} mt={5} variant="default" placeholder="Prazo entrega em dias" /> */}

				</ModalBody>

				<ModalFooter>
					<Space>
						<Button loading={isLoading} onClick={() => { updateFlagFornecedor() }} >
							Confirmar
						</Button>

						<Button variant="outline" onClick={onClose}>Cancelar</Button>
					</Space>
				</ModalFooter>
			</ModalContent>
		</Modal>

		{/*EDITAR AQUI*/}

		<ModalDesconto mutate={props.mutate} isOpen={isOpenDesconto} onClose={onCloseDesconto} onOpen={onOpenDesconto} total={0} totalDesconto={0} totalFrete={0} />

		<ModalMantine
			opened={opened}
			onClose={() => setOpened(false)}
			title="Introduce yourself!"
		>
			{/* Modal content */}
		</ModalMantine>
	</>
}