import { Alert, AlertIcon, FormControl, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { Button } from '@mantine/core';
import { Input, message, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { KeyedMutator } from "swr";
import { CotacaoContext } from "../context/CotacaoContext";
import { UrlContext } from "../context/UrlContext";
import { FormaPagamento, TipoDesconto } from "../enuns/enuns";
import { useDesconto } from "../hooks/useDesconto";
import { DescontoGeral } from "../lib/types";
import { styles } from "../style/style";




type Props = {
	isOpen: boolean,
	onClose: () => void,
	onOpen: () => void,
	mutate: KeyedMutator<any>,
	total: number,
	totalDesconto: number,
	totalFrete: number,
}


type MensagemType = {
	title: string,
	campo: string;

}

export const ModalDesconto = (props: Props) => {

	const dadosUrl = useContext(UrlContext);


	const [isLargerThan600] = useMediaQuery('(min-width: 722px)');


	const [, setIsLoading] = useState(false);

	const off = useDesconto();

	const [, setMensagemErro] = useState<MensagemType>();

	const [isCampoNegativo, setCampoNegative] = useState(false);

	const [tipoValor, setTipoValor] = useState<number>(TipoDesconto.VALOR);
	const [descontoEmPercentual, setDescontoEmPercentual] = useState<string>("0");
	const [formaPagamento, setFormaPagamento] = useState(FormaPagamento.BOLETO_BANCARIO);
	//const { } = useDesconto()
	const [desconto, setDesconto] = useState<number>(0);
	const [frete, setFrete] = useState<number>(0);
	const [, setTotal] = useState<number>(0);

	const price = useContext(CotacaoContext);


	//price?.dadosTyped?.data?.total
	useEffect(() => {
		if (price?.dadosTyped?.data?.total !== undefined && price?.dadosTyped?.data?.frete !== undefined && price?.dadosTyped?.data?.totalDesconto !== undefined) {
			setFrete(price?.dadosTyped?.data?.frete)
			setDesconto(price?.dadosTyped?.data?.totalDesconto)
			setFormaPagamento(price?.dadosTyped?.data?.formaPagamento)
			setTotal(price?.dadosTyped?.data?.total)
		}
	}, [price])

	async function salvarDesconto() {
		//setDesconto(desconto);
		const data: DescontoGeral = {
			percentual: prepararDesconto(),
			dados: {
				codigo: dadosUrl?.numeroCotacao,
				codigoEmpresa: dadosUrl?.numeroEmpresa,
				fornecedor: dadosUrl?.codigoFornecedor,
				contratoEmpresa: dadosUrl?.contratoEmpresa
			},
			frete: Number.parseFloat(frete.toString()),
			tipo: tipoValor,
			formaPagamento: formaPagamento
		}

		setIsLoading(true);
		const status = await off.desconto(data);

		if (status === 201) {
			message.success(`Os dados foram atualizados`);
		} else if (status === 401) {
			message.warn('Ocorreu um erro ao aplicar o desconto!');
		}
		else {
			message.warn('Ocorreu um erro ao atualizar o item!');
		}
		setIsLoading(false);
		props.mutate();
		props.onClose();
	}

	function prepararDesconto() {
		if (tipoValor === TipoDesconto.VALOR) {
			const valorDesconto = Number.parseFloat(desconto.toString());
			console.log("preparando desconto:");
			console.log("valor desconto", desconto)
			return valorDesconto;
		} else {
			// const valorTotalItens = total;
			// const percentual = Number.parseFloat(descontoEmPercentual) / 100;
			// const valorFinal = percentual * valorTotalItens;
			// console.log(valorFinal, total)

			const valorDesconto = Number.parseFloat(descontoEmPercentual.toString());
			return valorDesconto;
		}
	}
	function validadarCampos() {
		console.log(frete, typeof (frete))
		console.log(descontoEmPercentual, typeof (descontoEmPercentual))
		console.log(desconto, typeof (desconto))
		const isVazio = Number.parseFloat(descontoEmPercentual) ? false : true;
		if (frete >= 0) {
			if (desconto >= 0) {
				if (Number.parseFloat(descontoEmPercentual) >= 0 || !isVazio) {
					setCampoNegative(false);
					salvarDesconto();
				} else {
					setErrorNegativeInputs("Campo com número negativo", "O campo desconto precisa ser maior ou igual a 0 (zero).")
				}
			} else {
				setErrorNegativeInputs("Campo com número negativo", "O campo desconto em percentual precisa ser maior ou igual a 0 (zero).")
			}
		} else {
			setErrorNegativeInputs("Campo com número negativo", "O campo frete precisa ser maior ou igual a 0 (zero).")
		}
	}

	function setErrorNegativeInputs(msg: string, campo: string) {
		setCampoNegative(true);
		setMensagemErro({ campo: campo, title: msg });
	}


	return (
		<>
			<Modal
				isOpen={props.isOpen}
				onClose={props.onClose}>
				size={isLargerThan600 ? "xl" : "xs"}

				<ModalOverlay />
				<ModalContent margin={10}>
					<ModalHeader fontWeight="normal">
						<HStack>
							<Text>Editar</Text>
						</HStack>
					</ModalHeader>
					<ModalCloseButton _focus={{ boxShadow: "none" }} />
					<ModalBody pb={6} >
						<SimpleGrid columns={[1, 2, 2]} spacing='10px'>
							<FormControl mt={4}>
								<FormLabel fontSize={"16px"}>Alguma coisa aqui</FormLabel>
								<Select fontSize={styles.Font16.width} defaultValue={tipoValor} _focus={{ boxShadow: "none" }} onChange={(event: any) => {
									setTipoValor(Number.parseInt(event.target.value))
									const descontoVazio = desconto ? false : true;
									if (descontoVazio) {
										console.log("Esse é um campo vazio")
									}

								}} size="sm">
									<option value={TipoDesconto.VALOR}>R$</option>
									<option value={TipoDesconto.PERCENTUAL}>%</option>
								</Select>
							</FormControl>
							{
								tipoValor === TipoDesconto.VALOR
									?
									<FormControl mt={4}>
										<FormLabel fontSize={"16px"}>Desconto</FormLabel>
										<CurrencyInput
											style={{ fontSize: "16px" }}
											className="ant-input"
											id="input-custo-produtosddsds"
											name="input-name"
											allowNegativeValue={true}
											placeholder="Vazio 0 (zero)."
											defaultValue={desconto}
											prefix="R$"
											decimalScale={2}
											onValueChange={(value: any, name: any, float: any) => {

												console.log("numero é vazio ou não")
												console.log(float, typeof (float))
												if (float.float === null) {
													console.log("campo é null")

													setDesconto(0)
												}
												setDesconto(float?.float ? (float.float).toString() : (0).toString())
												float?.float === null ? setDesconto(props.totalDesconto) : setDesconto(float?.float ? (float.float).toString() : (0).toString())
												console.log("set preço do desconto, alo sobre controle financeiro.")
												console.log(desconto);

											}}
										/>



									</FormControl>
									:
									<VStack mt={4}>
										<FormControl>
											<FormLabel fontSize={styles.Font16.width}>ex: 0,34</FormLabel>
											<Input style={styles.Font16} type={"number"} value={descontoEmPercentual} step="0.01" onChange={(e) => {
												setDescontoEmPercentual(e.target.value);
												console.log(descontoEmPercentual)

												console.log("desconto percentual é vazio ou não")
												const isVazio = e.target.value ? false : true;

												console.log("zero", e.target.value === "0");
												if (!isVazio) {
													const valor = Number.parseFloat(e.target.value);
													if (valor < 0) {
														console.log(typeof (valor), valor, "ok")
														const valorPositivo = (valor * (-1)).toString();
														console.log("valor positivo", valorPositivo);
														setDescontoEmPercentual(valorPositivo)
													}
												}
												if (isVazio) {
													console.log("campo é null")

													setDescontoEmPercentual("0")
												}
											}} />
										</FormControl>
									</VStack>
							}


						</SimpleGrid>
						<FormControl mt={4}>
							<FormLabel fontSize={styles.Font16.width}>Pagamento</FormLabel>
							<Select fontSize={"16px"} defaultValue={formaPagamento} _focus={{ boxShadow: "none" }} onChange={(event: any) => { setFormaPagamento(Number.parseInt(event.target.value)) }} size="sm">
								<option value={FormaPagamento.BOLETO_BANCARIO}>Boleto Bancário</option>
								<option value={FormaPagamento.DINHEIRO}>Dinheiro</option>
								<option value={FormaPagamento.CHEQUE}>Cheque</option>
								<option value={FormaPagamento.CARTAO_CREDITO}>Cartão de Crédito</option>
								<option value={FormaPagamento.CARTAO_DEBITO}>Cartão de débito</option>
								<option value={FormaPagamento.PIX}>PIX</option>
								<option value={FormaPagamento.OUTROS}>Outros</option>
								<option value={FormaPagamento.NENHUM}>Nenhum</option>
							</Select>
						</FormControl>


						<FormControl mt={4}>
							<FormLabel fontSize={"16px"}>Frete</FormLabel>
							{/* <Text style={{ fontSize: "10px", color: "gray" }}>{toReal(props.valorProduto)}</Text> */}
							<CurrencyInput
								style={styles.Font16}
								className="ant-input"
								id="input-custo-produto"
								name="input-name"
								placeholder="Please enter a number"
								defaultValue={Number(frete)}
								allowNegativeValue={true}

								prefix="R$"
								decimalScale={2}
								onValueChange={(value: any, name: any, float: any) => {
									setFrete(float?.float ? (float.float).toString() : (0).toString())
								}}
							/>

						</FormControl>

						{
							isCampoNegativo &&
							<Alert status='warning' my={4}>
								<AlertIcon />
								<Text style={styles.Font16}>Todos campos numéricos devem ser maior ou igual a 0 (zero).</Text>
							</Alert>
						}
					</ModalBody>

					<ModalFooter>
						<Space>
							<Button style={styles.Font16} onClick={() => { validadarCampos() }} loading={false} >
								Salvar
							</Button>

							<Button variant="outline" style={styles.Font16} onClick={() => { props.onClose(); }} >Cancelar</Button>
						</Space>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}