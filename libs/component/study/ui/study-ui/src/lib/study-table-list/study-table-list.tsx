import { Table, TableProps } from 'antd';
import { ResizeableTitle } from '../shared/ResizeableTitle';
import { SyntheticEvent, useEffect, useState } from 'react';
import { ColumnType } from 'antd/es/table';
import { ResizeCallbackData } from 'react-resizable';
import { ListViewTableStyles } from '../shared/ui';

type ColumnTypeResize = ColumnType<Record<string, any>>;
export interface StudyTableListProps extends TableProps {
  onTableResize?: (column: ColumnTypeResize, width: string | number) => void;
}

export function StudyTableList(props: StudyTableListProps) {
  const {
    components: _components,
    columns,
    onTableResize = () => void {},
    pagination,
    ...otherProps
  } = props;

  const [headerColumns, setHeaderColumns] = useState(columns);
  const handleResize =
    (index: number, col: ColumnTypeResize) =>
    (e: SyntheticEvent, { size }: ResizeCallbackData) => {
      e.stopPropagation();
      setHeaderColumns((headerColumns) => {
        const nextColumns: ColumnTypeResize[] = [];
        headerColumns?.forEach((item) => {
          if (col.key === item.key) {
            item.width = size.width;
          }
          nextColumns.push(item);
        });
        return nextColumns;
      });
      // setHeaderColumns(nextColumns);
      onTableResize(col, size.width);
    };
  useEffect(() => {
    const s = columns?.map((col, index) => ({
      ...col,
      onHeaderCell: (column: ColumnTypeResize) => ({
        width: column.width,
        onResize: handleResize(index, col) as any,
      }),
    }));
    setHeaderColumns(s);
  }, [columns]);

  const components = {
    header: {
      cell: ResizeableTitle,
    },
  };
  return (
    <Table
      rowSelection={{ type: 'checkbox' }}
      bordered={true}
      className={ListViewTableStyles``}
      columns={headerColumns}
      components={components}
      pagination={{
        showTotal: (total) => `总共${total}条`,
        ...pagination,
      }}
      {...otherProps}
    />
  );
}

export default StudyTableList;
