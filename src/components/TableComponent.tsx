import { Table } from 'antd';
import React, { memo } from 'react'

const TableComponentt = ({ data, isEnviado, columnsEnviado, columns }: { data: any, isEnviado: boolean, columnsEnviado: any[], columns: any[] }) => {
	return (
		<Table
			onRow={(record, rowIndex) => {
				return {
					onClick: event => { console.log(record) }, // click row
				};
			}}
			rowKey={"item"}
			rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
			className="tabela"
			size={'small'}
			loading={data ? false : true}
			dataSource={data}
			columns={isEnviado ? columnsEnviado : columns}
			pagination={{ pageSize: 10 }}
			scroll={{ y: "200px", x: 1500 }}
		/>
	)
}

export const TableComponent = memo(TableComponentt)
