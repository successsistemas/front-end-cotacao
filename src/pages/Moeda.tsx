import React, { useState } from "react";
import CurrencyInput from 'react-currency-input-field';
export const Moeda = () => {

	const [valorProduto, setValorProduto] = useState('100.23');

	return (
		<>
			<CurrencyInput
				className="ant-input"
				id="input-example"
				name="input-name"
				placeholder="Please enter a number"
				defaultValue={Number(valorProduto)}
				prefix="R$"
				decimalScale={2}
				onValueChange={(value, name, float) => {
					setValorProduto(float?.float ? (float.float).toString() : (0).toString())
					console.log(value, name, float)
				}}
			/>
		</>
	);
}