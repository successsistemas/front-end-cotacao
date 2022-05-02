import { Row, Statistic } from "antd";
import moment from "moment";
import React from "react";
export default class QuantidadeTotalRasc extends React.Component {

	constructor(props: any) {
		super(props);
		this.state = {
			total: 0
		}
	}
	shouldComponentUpdate(prevProps: any, prevState: any) {
		console.log(prevProps)
		return false;
	}
	render() {
		return (
			<>
				{console.log("Class")}
				{this.setState({ total: 4 })}
				<Row gutter={16}>
					{console.log(moment(Date()).format('YYYYMMDDHHmm'))}
					<Statistic loading={false} style={{ margin: "10px" }} title="Valor total" value={(0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} prefix="R$" />
				</Row>
			</>
		);
	}
}