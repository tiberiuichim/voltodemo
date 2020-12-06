import React from 'react';
import { Table } from 'semantic-ui-react';
import { withFileData } from './../hocs';

const format = (data) => {
  return {
    fixed: data.fixed,
    compact: data.compact,
    basic: data.basic ? 'very' : undefined,
    celled: data.celled,
    inverted: data.inverted,
    striped: data.striped,
  };
};

const DataTableView = ({ file_data, data }) => {
  const columns =
    data.columns?.length > 0
      ? data.columns
      : file_data?.meta?.fields?.map((n) => ({
          column: n,
        }));

  return file_data ? (
    <Table {...format(data)}>
      <Table.Header>
        <Table.Row>
          {columns.map((col, i) => (
            <Table.HeaderCell key={i} textAlign={col.textAlign}>
              {col.title || col.column}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {file_data.data.map((o, i) => (
          <Table.Row key={i}>
            {columns.map((col, y) => (
              <Table.Cell textAlign={col.textAlign}>
                {col.textTemplate
                  ? col.textTemplate.replace('{}', o[col.column])
                  : o[col.column]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ) : (
    <div>No data</div>
  );
};

export default withFileData(({ data: { file_path } }) => file_path)(
  DataTableView,
);
