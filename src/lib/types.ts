import moment from "moment"

export type Login = {
	email: string,
	senha: string
}
export type DescontoTDO = {
	percentual: number;
	item: ItemCotacaoTDO,
	dados: CotacaoTDOPayload

}
export type CotacaoTDO = {
	codigo: string;
	item: string
	produto: string;
	descricao: string;
	marca: string;
	quantidade: number;
	valordoproduto: number;
	frete: number;
	st: number;
	icms: number;
	formaPagamento: string;
	ipi: number;
	status: boolean;
	mva: number;
	codbarras: string;
	desconto: number;
	observacao: string;
	prazo: number;

}
export type CotacaoTDOPayload = {
	codigo: string | undefined;
	fornecedor: string | undefined;
	codigoEmpresa: string | undefined;
	flag: string | undefined;
	contratoEmpresa: string | undefined;

}
export type ItemCotacaoTDO = {
	codigoEmpresa: string;
	contratoEmpresa: string;
	codigo: string | undefined;
	item: string | undefined;
	codigoInterno: string | undefined;
	descricao: string | undefined;
	marca: string | undefined;
	quantidade: number | undefined;
	valorProduto: number | undefined;
	observacao: string | undefined;
	frete: number | undefined;
	st: number | undefined;
	icms: number | undefined;
	formaPagamento: number | undefined;
	fornecedor: string | undefined;
	ipi: number | undefined;
	status: boolean;
	mva: number;
	data: string;
	codbarras: string | undefined;
	desconto: number | undefined;
	prazo: number | undefined;
}
export type Fornecedor = {
	email: string;
	cnpj: string;
	razaoSocial: string;
	cnpjClienteSuccess: string;
	razaoSocialClienteSuccess: string;
	numeroContratoClienteSuccess: string;
	cotacaoHabilitado: number
}
export type FornecedorCredencials = {
	email: string,
	senha: string
}
export type LoginTDOEmail = {
	email: string;
}
export type LoginTDOSenha = {
	senha: string;
}
export type Cotacao = {
	codigo: string;
	data: string;
}
export type Empresa = {
	codigo: string
	razao: string
	empresa: string
	cnpj: string
	cidade: string
}
export type HistoricoProdutosTDO = {
	icms: number;
	st: number;
	ipi: number;
	mva: number;
	fornecedor: string;
	produto6: string;
}
export type HistoricoProdutosTDOBoolean = {
	icms: boolean;
	st: boolean;
	ipi: boolean;
	mva: boolean;
}
export type HistoricoProdutosParametro = {
	fornecedor: string;
	produto6: string;
	contratoEmpresa: string;
	numeroEmpresa: string;
}
export type Flag = {
	melcot16: string;
	codigo6: string;
	item6: string;
	flag6: string;
}

export type UrlData = {
	contratoEmpresa: string,
	numeroEmpresa: string,
	numeroCotacao: string,
	cnpjFornecedor: string,
	codigoFornecedor: string,
	parametroUrl: string | undefined;
	dataValidade: string;
	dataMoment: moment.Moment | null;
	isVencido: boolean | false;
}

export type DescontoGeral = {
	percentual: number;
	frete: number;
	tipo: number;
	formaPagamento: number;
	dados: {
		codigo: string | undefined;
		codigoEmpresa: string | undefined;
		fornecedor: string | undefined;
		contratoEmpresa: string | undefined;
	}
}