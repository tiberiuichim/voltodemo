import React from 'react';
import { compose } from 'redux';
import { Segment, Form } from 'semantic-ui-react';
import {
  SidebarPortal,
  Field,
  Icon,
  InlineForm,
} from '@plone/volto/components';
import tableSVG from '@plone/volto/icons/table.svg';
import { TableSchema } from './schema';

import {
  withBlockDataSource,
  withFileData,
} from '@plone-collective/voltodemo/hocs';

import DataTableView from './DataTableView';

import './datatable-edit.less';

const DataTableEdit = (props) => {
  const { selected, onChangeBlock, block, data, file_data } = props;
  const schema = TableSchema(props);
  const choices = (file_data?.meta?.fields || []).sort().map((n) => [n, n]);
  schema.properties.columns.schema.properties.column.choices = choices;

  return (
    // <> represents a React Fragment see https://reactjs.org/docs/fragments.html#short-syntax for more details
    <>
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
      <DataTableView {...props} />
    </>
  );
};

const getFilePath = ({ data: { file_path } }) => file_path;

export default compose(
  withFileData(getFilePath),
  withBlockDataSource({
    getFilePath,
    icon: tableSVG,
    title: 'Data table',
  }),
)(DataTableEdit);

