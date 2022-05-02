import { Editable, EditableInput, EditablePreview, Text } from '@chakra-ui/react'
import { Tooltip } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import {
  Key,
  SorterResult,
  TableCurrentDataSource
} from 'antd/lib/table/interface'
import React, { useCallback, useMemo } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Cotacao } from '../lib/types'
import { paginacaoState, sortState } from '../store/paginacaoState'


export const useTabela = <T extends Cotacao>() => {

  const colunas: ColumnsType<T> = useMemo(
    () => [
      {
        title: 'Código',
        dataIndex: 'codigo',
        key: 'codigointerno',
        shouldCellUpdate: () => false,
        width: '14%',
        render: (value: string, record: any) => {
          return <Text fontSize={"12px"}>{value}</Text>
        },
      },
      {
        title: 'Item',
        dataIndex: 'item',
        key: 'codigobarras',
        shouldCellUpdate: () => false,
        width: '10%',
        render: (value: string, record: any) => {
          return <Text fontSize={"12px"}>{value}</Text>
        },
      },
      {
        title: 'Código interno',
        dataIndex: 'produto',
        key: 'produto',
        shouldCellUpdate: () => false,
        width: '10%',
        render: (value: string, record: any) => {
          return <Text fontSize={"12px"}>{value}</Text>
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
            <Text fontSize={"12px"}>{value}</Text>
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
          return <Tooltip title={value}>
            {value}
          </Tooltip>
        },
      },
      {
        title: 'Valor do Produto',
        dataIndex: 'valordoproduto',
        key: 'valordoproduto',
        shouldCellUpdate: () => false,
        width: '10%',
        render: (value: string, record: any) => {
          return <Text fontSize={"12px"}>{value}</Text>
        },
      },
      {
        title: 'Frete',
        dataIndex: 'frete',
        key: 'frete',
        shouldCellUpdate: () => false,
        width: '8%',
        render: (value: string, record: any) => {
          return <Editable fontSize={"12px"} defaultValue='0'>
            <EditablePreview />
            <EditableInput />
          </Editable>;
        },
      },
      {
        title: '% ST',
        dataIndex: 'st',
        key: 'st',
        shouldCellUpdate: () => false,
        width: '8%',
        render: (value: string, record: any) => {
          return <Editable fontSize={"12px"} defaultValue='0'>
            <EditablePreview />
            <EditableInput />
          </Editable>;
        },
      },
      {
        title: 'ICMS',
        dataIndex: 'icms',
        key: 'icms',
        shouldCellUpdate: () => false,
        width: '8%',
        render: (value: string, record: any) => {
          return <Editable fontSize={"12px"} defaultValue='0'>
            <EditablePreview />
            <EditableInput />
          </Editable>;
        },
      },
      {
        title: '% IPI',
        dataIndex: 'ipi',
        key: 'ipi',
        shouldCellUpdate: () => false,
        width: '8%',
        render: (value: string, record: any) => {
          return <Editable fontSize={"12px"} defaultValue='0'>
            <EditablePreview />
            <EditableInput />
          </Editable>;
        },
      },

    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )



  const [paginacao, setPaginacao] = useRecoilState(paginacaoState)
  const setSort = useSetRecoilState(sortState)

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      _filters: Record<string, (Key | boolean)[] | null>,
      sorter: SorterResult<T> | SorterResult<T>[],
      extra: TableCurrentDataSource<T>
    ) => {
      const { current = 1, total = 0, pageSize = 7 } = pagination
      setPaginacao({ current, total, pageSize })
      if (extra.action === 'sort') {
        const { column, field, order } = sorter as SorterResult<T>
        if (column) {
          const desc = order === 'descend'
          setSort({ coluna: field?.toString() || '', desc })
        } else {
          setSort(null)
        }
      }
    },
    [setPaginacao, setSort]
  )

  return { handleTableChange, paginacao, colunas }
}

