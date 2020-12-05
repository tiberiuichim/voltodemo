import tableSVG from '@plone/volto/icons/table.svg';

import { ObjectBrowserWidgetMode } from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';
import { DataTableView, DataTableEdit } from './DataTable';
import { rawdata } from './reducers';

export const demoContent = (config) => {
  return config;
};

export default (config) => {
  if (!config.widgets.widget.pick_object)
    config.widgets.widget.pick_object = ObjectBrowserWidgetMode('link');

  config.blocks.blocksConfig.dataTable = {
    id: 'dataTable',
    title: 'Demo Table',
    icon: tableSVG,
    group: 'common',
    view: DataTableView,
    edit: DataTableEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  config.addonReducers.rawdata = rawdata;
  return config;
};
