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

export const DataTableView = (props) => {
  const { file_data } = props;

  const fields = file_data?.meta?.fields || [];

  return file_data ? (
    <Table {...format(props.data)}>
      <Table.Header>
        <Table.Row>
          {fields.map((f) => (
            <Table.Cell key={f}>{f}</Table.Cell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {file_data.data.map((o, i) => (
          <Table.Row key={i}>
            {fields.map((f) => (
              <Table.Cell>{o[f]}</Table.Cell>
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
