export enum FormaPagamento {
	NENHUM = -1,
	BOLETO_BANCARIO = 0,
	CARTAO_CREDITO = 1,
	DINHEIRO = 2,
	CHEQUE = 3,
	OUTROS = 4,
	PIX = 5,
	CARTAO_DEBITO = 6,

}
export enum TipoDesconto {
	VALOR = 0,
	PERCENTUAL = 1
}

export enum UrlVazioEnum {
	VAZIO = "-1"
}
export enum UrlDataPosition {
	CONTRATO_EMPRESA = 0,
	NUMERO_EMPRESA = 1,
	NUMERO_COTACAO = 2,
	CNPJ_FORNECEDOR = 3,
	CODIGO_FORNECEDOR = 4,
	DATA_VALIDADE = 5
}

export enum Flag {
	PREENCHIDO = "P"
}
