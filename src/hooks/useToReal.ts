export const useToReal = () => {
	const toReal = (value: string) => {
		return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
	}
	return { toReal: toReal };
}