import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRawContent } from '@plone-collective/voltodemo/actions';
import csv from 'papaparse';

import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field, Icon } from '@plone/volto/components';

export const withFileData = (getFilePath) => (WrappedComponent) => {
  return (props) => {
    const file_path = getFilePath(props);

    const id = file_path?.[0]?.['@id'];

    const path = id ? `${id}/@@download` : null;

    const dispatch = useDispatch();
    const request = useSelector((state) => state.rawdata?.[path]);

    const content = request?.data;

    const hasData = !!content;

    React.useEffect(() => {
      if (path && !hasData) dispatch(getRawContent(path));
    }, [dispatch, path, hasData]);

    const file_data = React.useMemo(() => {
      if (content) {
        const res = csv.parse(content, { header: true });
        return res;
      }
    }, [content]);

    return <WrappedComponent {...props} file_data={file_data} />;
  };
};

export const withBlockDataSource = (opts) => (WrappedComponent) => {
  const { icon, title, getFilePath } = opts;

  return (props) => {
    const { data, selected, onChangeBlock, block } = props;
    const file_path = getFilePath(props);

    return (
      <div className={`${data['@type']}-edit`}>
        {!file_path ? (
          <>
            <div className="no-value">
              <Form>
                <Icon name={icon} size="100px" color="#b8c6c8" />
                <Field
                  id="file_path"
                  widget="pick_object"
                  title="Pick a file"
                  value={file_path || []}
                  onChange={(id, value) => {
                    onChangeBlock(block, {
                      ...data,
                      [id]: value,
                    });
                  }}
                />
              </Form>
            </div>

            <SidebarPortal selected={selected}>
              <Segment.Group raised>
                <header className="header pulled">
                  <h2>{title}</h2>
                </header>
                <Segment className="sidebar-metadata-container" secondary>
                  No file selected
                  <Icon name={icon} size="100px" color="#b8c6c8" />
                </Segment>
              </Segment.Group>
            </SidebarPortal>
          </>
        ) : (
          <WrappedComponent {...props} />
        )}
      </div>
    );
  };
};