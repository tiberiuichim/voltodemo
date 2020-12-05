import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import {
  SidebarPortal,
  Field,
  Icon,
  InlineForm,
} from '@plone/volto/components';
import tableSVG from '@plone/volto/icons/table.svg';
import { TableSchema } from './schema';

import DataTableView from './DataTableView';

import './datatable-edit.less';

const DataTableEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  console.log(props);
  const schema = TableSchema(props);

  return (
    <div className="dataTable-edit">
      <SidebarPortal selected={selected}>
        {!data.file_path?.length ? (
          <Segment.Group raised>
            <header className="header pulled">
              <h2>Data table</h2>
            </header>
            <Segment className="sidebar-metadata-container" secondary>
              No file selected
              <Icon name={tableSVG} size="100px" color="#b8c6c8" />
            </Segment>
          </Segment.Group>
        ) : (
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
        )}
      </SidebarPortal>

      {data.file_path?.length ? (
        <DataTableView {...props} />
      ) : (
        <div className="no-value">
          <Form>
            <Icon name={tableSVG} size="100px" color="#b8c6c8" />
            <Field
              id="file_path"
              widget="pick_object"
              title="Pick a file"
              value={data.file_path || []}
              onChange={(id, value) => {
                onChangeBlock(block, {
                  ...data,
                  [id]: value,
                });
              }}
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default DataTableEdit;
