import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRawContent } from '@plone-collective/voltodemo/actions';
import csv from 'papaparse';

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
