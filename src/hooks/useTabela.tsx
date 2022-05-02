import { Button, Editable, EditableInput, EditablePreview, Tag, Tooltip, useDisclosure } from "@chakra-ui/react";
import { ColumnType } from "antd/lib/table";
import React, { useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CotacaoTDO } from "../lib/types";
export const useTabela = () => {

	const [quantidade, setQuantidade] = useState('');
	const [valorProduto, setValorProduto] = useState('');
	const [frete, setFrete] = useState('');
	const [st, setSt] = useState('');
	const [icms, setIcms] = useState('');
	const [mva, setMva] = useState('')
	//const [formaPagamento, setFormaPagamento] = useState('');
	const [ipi, setIpi] = useState('');
	const [quantidadeItensPreenchidos, setQuantidadeItensPreenchidos] = useState(0);
	const [cotacao, setCotacao] = useState<CotacaoTDO>();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const columns: ColumnType<any>[] = useMemo(
		() => [
			{
				title: 'Ações',
				dataIndex: 'acoes',
				key: 'acoes',
				shouldCellUpdate: () => false,
				width: '15%',
				render: (value: string, record: any) => {
					return (
						<Tooltip title={"Editar"}>
							<Button color={"red"} size="small" onClick={() => abrirModal(record, value)}><BiEdit color="gray" /></Button>
						</Tooltip>
					)
				},
			},
			{
				title: 'status',
				dataIndex: 'status',
				key: 'status',
				align: "center",
				shouldCellUpdate: () => true,
				width: '18%',
				render: (value: boolean, record: CotacaoTDO) => {
					const item = localStorage.getItem(`@App:${record.item}`) as string;
					const result: CotacaoTDO = JSON.parse(item);
					if (item) {
						if (result.item === record.item) {
							// let quant: number = Number(localStorage.getItem(`@App:count`));
							// localStorage.setItem(`@App:count`, (quant + 1).toString());
							// quant = Number(localStorage.getItem(`@App:count`));
							setQuantidadeItensPreenchidos(quantidadeItensPreenchidos + 1);
							return <>
								<Tag style={{ fontSize: "12px" }} color="success">
									editado
								</Tag>
							</>
						}
					} else {
						return <>
							<Tag style={{ fontSize: "12px" }} color="orange">
								aguardando
							</Tag>
						</>
					}


				},
			},

			{
				title: 'Item',
				dataIndex: 'item',
				key: 'item',
				width: '15%',
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
				width: '20%',
				align: "center",
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value}>
							<Text style={{ fontSize: "12px" }}>{value ? value : "XXX-XXX"}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Código interno',
				dataIndex: 'produto',
				key: 'produto',
				width: '200px',
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
				width: '30%',
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
				width: '15%',
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
				align: 'center',
				shouldCellUpdate: () => true,
				width: '15%',
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
				align: 'center',
				key: 'frete',
				width: '15%',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={"12px"}>
						<EditablePreview />
						{toReal(value)}
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
	function abrirModal(cotacao: CotacaoTDO, value: string) {



		setCotacao(cotacao)
		setIpi(cotacao.ipi !== null ? cotacao?.ipi.toString() : '')
		setIcms(cotacao.icms !== null ? cotacao?.icms.toString() : '')
		setMva(cotacao.mva !== null ? cotacao?.mva.toString() : '')
		setSt(cotacao.st !== null ? cotacao?.st.toString() : '');
		setValorProduto(cotacao.valordoproduto !== null ? cotacao?.valordoproduto.toString() : '')
		setFrete(cotacao.frete !== null ? cotacao.frete.toString() : '')
		onOpen()
	}

	return (<></>);
}