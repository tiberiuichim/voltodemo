import React from 'react';
import {
  SidebarPortal,
  InlineForm,
} from '@plone/volto/components';
import tableSVG from '@plone/volto/icons/table.svg';
import { TableSchema } from './schema';

import DataTableView from './DataTableView';
import { withBlockDataSource } from '@plone-collective/voltodemo/hocs';

import './datatable-edit.less';

const DataTableEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = TableSchema(props);

  return (
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

export default withBlockDataSource({
  icon: tableSVG,
  title: 'Data table',
  getFilePath: ({ data: { file_path } }) => file_path,
})(DataTableEdit);