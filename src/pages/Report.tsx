/* eslint-disable react-hooks/exhaustive-deps */
import {
	Alert,
	AlertIcon, Center, Divider, Editable, EditableInput, EditablePreview, Flex, Spacer, Spinner, VStack
} from "@chakra-ui/react";
import { Button, message, Result, Table, Tag, Tooltip, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { jsPDF } from "jspdf";
import React, { useEffect, useMemo, useState } from "react";
import { Caminho } from "../components/CaminhoIndicador";
import { InfoEmpresa } from "../components/InfoEmpresa";
import { useCotacao } from "../hooks/useCotacao";
import { useFlagFornecedor } from "../hooks/useFlagFornecedor";
import { CotacaoTDO, CotacaoTDOPayload } from "../lib/types";

const { Text } = Typography;



export const Report = () => {


	const [isLoadingPage, setIsLoadingPage] = useState(false);



	const success = () => {
		message.success('Baixando relatório!');
	};
	const { cotacoes } = useCotacao();
	const [isGerando, setIsGerando] = useState(false);
	const [isEnviado, setEnviado] = useState(false);
	const { apiPostVerificarFlagFornecedor } = useFlagFornecedor();


	async function teste() {
		const payload: CotacaoTDOPayload = {
			codigo: "0000000001",
			fornecedor: "AG000002",
			flag: ".",
			codigoEmpresa: "",
			contratoEmpresa: ""
		}
		setIsLoadingPage(true)
		const response = await apiPostVerificarFlagFornecedor(payload);
		setIsLoadingPage(false)

		for (let i = 0; i < response.data.length; i++) {
			if (response.data[i].fornvenc6 !== 'P') {
				setEnviado(false)
				return;
			} else {
				setEnviado(true)

			}
			//console.log(response.data[i].flag6 !== 'P', response.data[i].flag6)
		}
		localStorage.setItem(`@App:enviado`, JSON.stringify(isEnviado));
		//	const item = localStorage.getItem(`@App:${record.item}`) as string;
	}


	useEffect(() => {
		teste();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	var generateData = function (amount: number) {

		const itens: Array<CotacaoTDO> = [
			...cotacoes.data
		]
		console.log(itens)
		console.log(cotacoes.data.length)
		var result = [];
		var data = {
			item: "dd",
			codigo_barras: "codigo_barras",
			codigo_interno: "codigo_interno",
			descricao: "descricao",
			marca: "marca",
			quantidade: "quantidade",
			custo: "custo",
			frete: "frete",
			st: "st",
			icms: "icms",
			forma_pagamento: "forma_pagamento",
			ipi: "ipi",
			mva: "mva"
		};
		for (var i = 0; i < cotacoes.data.length; i += 1) {
			data.item = itens[i].item ? itens[i].item : "x-x-x";
			data.quantidade = itens[i].quantidade ? itens[i].quantidade.toString() : "0";
			data.codigo_barras = itens[i].codbarras ? itens[i].codbarras : "0";
			data.codigo_interno = itens[i].codigo ? itens[i].codigo : "0";
			data.descricao = itens[i].descricao ? itens[i].descricao : "x-x-x-x-x";
			data.marca = itens[i].marca ? itens[i].marca : "x-x-x-x-x";
			data.custo = itens[i].valordoproduto ? itens[i].valordoproduto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : "x-x-x-x-x";
			data.frete = itens[i].frete ? itens[i].frete.toString() : "x-x-x-x-x";
			data.st = itens[i].st ? itens[i].st.toString() : "x-x-x-x-x";
			data.icms = itens[i].icms ? itens[i].icms.toString() : "x-x-x-x-x";
			data.forma_pagamento = itens[i].formaPagamento ? itens[i].formaPagamento.toString() : "x-x-x-x-x";
			data.ipi = itens[i].ipi ? itens[i].ipi.toString() : "x-x-x-x-x";
			data.mva = itens[i].mva ? itens[i].mva.toString() : "x-x-x-x-x";
			result.push(Object.assign({}, data));
		}
		return result;
	};

	function createHeaders(keys: any) {
		var result = [];
		for (var i = 0; i < keys.length; i += 1) {
			result.push({
				id: keys[i],
				name: keys[i],
				prompt: keys[i],
				width: 65,
				align: "center",
				padding: 0
			});
		}
		return result;
	}

	var headers: any = createHeaders([
		"item",
		"codigo_barras",
		"codigo_interno",
		"descricao",
		"marca",
		"quantidade",
		"custo",
		"frete",
		"st",
		"icms",
		"forma_pagamento",
		"ipi",
		"mva"
	]);








	function gerarRelatorio() {
		success();
		setIsGerando(true)
		var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });

		doc.table(3, 3, generateData(20), headers, { autoSize: true, fontSize: 8 }).save('relatório');
		setIsGerando(false)
		// doc.html(element ? element : '', {
		// 	callback: function (doc) {
		// 		doc.save("a4.pdf");
		// 	},
		// 	x: 10,
		// 	y: 10
		// })

		//dd

	}
	//
	const columns: ColumnType<any>[] = useMemo(
		() => [
			{
				title: 'status',
				dataIndex: 'status',
				key: 'status',
				align: "center",
				shouldCellUpdate: () => true,
				width: '100px',
				render: (value: boolean, record: CotacaoTDO) => {
					return (
						<Tag style={{ fontSize: "12px" }} color="success">
							PREENCHIDO
						</Tag>
					);

				},
			},

			{
				title: 'Item',
				dataIndex: 'item',
				key: 'item',
				width: '50px',
				align: "center",
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value}>
							<Text style={{ fontSize: "12px" }}>{value}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Código/barras',
				dataIndex: 'codbarras',
				key: 'codbarras',
				width: '100px',
				align: "center",
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value}>
							<Text style={{ fontSize: "12px" }}>{value ? value : 0}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Código interno',
				dataIndex: 'produto',
				key: 'produto',
				width: '100px',
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value}>
							<Text style={{ fontSize: "12px" }}>{value}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Descrição',
				dataIndex: 'descricao',
				key: 'descricao',
				width: '150px',
				shouldCellUpdate: () => false,
				ellipsis: {
					showTitle: false
				},
				render: (value: string, record: any) => {
					return <Tooltip title={value}>
						<Text style={{ fontSize: "12px" }}>{value}</Text>
					</Tooltip>
				},

			},
			{
				title: 'marca',
				dataIndex: 'marca',
				key: 'marca',
				width: '10%',
				shouldCellUpdate: () => false,
				ellipsis: {
					showTitle: false
				},
				render: (value: string, record: any) => {
					return <Tooltip style={{ fontSize: "12px" }} title={value}>
						{value}
					</Tooltip>
				},
			},
			{
				title: 'quantidade',
				dataIndex: 'quantidade',
				key: 'quantidade',
				align: 'center',
				width: '50px',
				shouldCellUpdate: () => true,
				ellipsis: {
					showTitle: false
				},
				render: (value: string, record: any) => {
					return <Tooltip title={value}>
						<Editable fontSize={"12px"}>
							<EditablePreview />
							{value}
							<EditableInput />
						</Editable>
					</Tooltip>
				},
			},

			{
				title: 'Custo',
				dataIndex: 'valordoproduto',
				key: 'valordoproduto',
				align: 'right',
				shouldCellUpdate: () => true,
				width: '100px',
				render: (value: string, record: any) => {
					return <Editable fontSize={"12px"} >
						{Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: 'Frete',
				dataIndex: 'frete',
				align: 'right',
				key: 'frete',
				width: '100px',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={"12px"}>
						<EditablePreview />
						{value}
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: '% ST',
				dataIndex: 'st',
				key: 'st',
				align: 'center',
				width: '8%',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={"12px"}>
						{value}
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: 'ICMS',
				dataIndex: 'icms',
				key: 'icms',
				align: 'center',
				width: '8%',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={"12px"} >
						{value}
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: 'Forma de pagamento',
				dataIndex: 'formapagamento',
				align: 'center',
				key: 'formapagamento',
				shouldCellUpdate: () => true,
				width: '20%',
				render: (value: string, record: any) => {
					return <Editable fontSize={"12px"} defaultValue='BOLETO BANCARIO'>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: '% IPI',
				dataIndex: 'ipi',
				align: 'center',
				key: 'ipi',
				shouldCellUpdate: () => true,
				width: '8%',
				render: (value: string, record: any) => {
					return <Editable fontSize={"12px"}>
						{value}
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: '% MVA',
				dataIndex: 'mva',
				align: 'center',
				key: 'mva',
				shouldCellUpdate: () => true,
				width: '8%',
				render: (value: string, record: any) => {
					return <Editable fontSize={"12px"}>
						{value}
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},

		], []
	)
	return (
		<>
			{isLoadingPage ?
				<>
					<Center w="full" h="100vh">
						<VStack>
							<Spinner color='blue' />
							<Text>Carregando...</Text>
						</VStack>
					</Center>
				</>
				:
				<>
					<Flex mb={3}>
						<VStack>
							<InfoEmpresa />
							<Caminho caminhoMain={"Cotação"} caminhoAtual={"00000001"} />
						</VStack>
						<Spacer />
						{/*<QuantidadeTotal total={total.data === undefined ? 0 : total?.data[0]?.total} />*/}
					</Flex>
					<Divider />
					{
						isEnviado ?
							<>
								<Table
									rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
									id="tabela"
									size={'small'}
									dataSource={cotacoes?.data}
									columns={columns}
									pagination={{ pageSize: 10 }}
									scroll={{ y: "200px", x: 1500 }}
								/>

								<Alert id="alerta" status='info' my={2}>
									<AlertIcon />
									Essa é uma tabela apenas de vizualização. Após confirmar o envio é impossível editar.
								</Alert>
								<Button loading={isGerando} onClick={gerarRelatorio} type="primary">Gerar relatório</Button>
							</> :
							<Result
								status="info"
								icon={" "}
								title="Nenhum histórico disponível!"
								subTitle="Só será possível vizualizar e imprimir um relatório após concluir o envio de todos os itens."
								extra={[
									<Button onClick={() => { }} type="primary" key="console">
										Vizualizar tabela
									</Button>,
									<Button key="buy">Relatório</Button>,
								]}
							/>
					}
				</>

			}
		</>
	)
}


