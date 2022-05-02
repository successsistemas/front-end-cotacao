import { FormControl, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
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

export const ModalDesconto = (props: Props) => {

	const dadosUrl = useContext(UrlContext);


	const [isLargerThan600] = useMediaQuery('(min-width: 722px)');


	const [, setIsLoading] = useState(false);

	const off = useDesconto();


	const [tipoValor, setTipoValor] = useState<number>(TipoDesconto.VALOR);
	const [descontoEmPercentual, setDescontoEmPercentual] = useState<string>("0");
	const [formaPagamento, setFormaPagamento] = useState(FormaPagamento.BOLETO_BANCARIO);
	//const { } = useDesconto()
	const [desconto, setDesconto] = useState<number>(0);
	const [frete, setFrete] = useState<number>(0);
	const [, setTotal] = useState<number>(0);

	const price = useContext(CotacaoContext);


	useEffect(() => {
		if (price.total !== undefined && price.totalFrete !== undefined && price.totalDesconto !== undefined) {
			setFrete(price.totalFrete)
			setDesconto(price.totalDesconto)
			setFormaPagamento(price.formaPagamento)
			setTotal(price.total)
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
								<FormLabel fontSize={"16px"}>Tipo desconto</FormLabel>
								<Select fontSize={styles.Font16.width} defaultValue={tipoValor} _focus={{ boxShadow: "none" }} onChange={(event: any) => { setTipoValor(Number.parseInt(event.target.value)) }} size="sm">
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
											placeholder="Please enter a number"
											defaultValue={desconto}
											prefix="R$"
											decimalScale={2}
											onValueChange={(value: any, name: any, float: any) => {
												setDesconto(float?.float ? (float.float).toString() : (0).toString())
												float?.float === 0 ? setDesconto(props.totalDesconto) : setDesconto(float?.float ? (float.float).toString() : (0).toString())

											}}
										/>



									</FormControl>
									:
									<FormControl>
										<FormLabel fontSize={styles.Font16.width}>ex: 0,34</FormLabel>
										<Input style={styles.Font16} type={"number"} value={descontoEmPercentual} step="0.01" onChange={(e) => { setDescontoEmPercentual(e.target.value); console.log(descontoEmPercentual) }} />
									</FormControl>
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
								prefix="R$"
								decimalScale={2}
								onValueChange={(value: any, name: any, float: any) => {
									setFrete(float?.float ? (float.float).toString() : (0).toString())
								}}
							/>

						</FormControl>

						{/* <Alert status='warning' my={4}>
							<AlertIcon />
							<Text style={styles.Font16}>É necessário preencher todos os campos.</Text>
						</Alert> */}
					</ModalBody>

					<ModalFooter>
						<Space>
							<Button style={styles.Font16} onClick={() => { salvarDesconto() }} loading={false} >
								Salvar
							</Button>

							<Button variant="outline" style={styles.Font16} onClick={() => { props.onClose(); }} >Cancelar</Button>
						</Space>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}