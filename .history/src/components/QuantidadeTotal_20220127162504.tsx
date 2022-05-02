import { Row, Statistic } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { percentual } from "../context/atom";

type Props = {
	total: number,
	totalDesconto: number,
}
//app 
moment.locale();
export const QuantidadeTotal = (props: Props) => {


	const dataDesconto = useRecoilValue(percentual);

	const [isLoading] = useState(false);

	useEffect(() => {
	}, [])

	return (
		<>
			<Row gutter={16}>
				{
					props.totalDesconto > 0 ? <Statistic loading={isLoading} style={{ margin: "10px" }} title="Total Geral" value={(props.totalDesconto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} /> : <></>
				}
				<Statistic loading={isLoading} style={{ margin: "10px" }} title="Subtotal" value={(props.total).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} />
			</Row>
		</>
	);
}
QuantidadeTotal.whyDidYouRender = true;