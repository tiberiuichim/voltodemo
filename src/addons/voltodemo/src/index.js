import tableSVG from '@plone/volto/icons/table.svg';

import { ObjectBrowserWidgetMode } from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';
import { DataTableView, DataTableEdit } from './DataTable';
import { rawdata } from './reducers';
import { TextAlign } from './widgets';

import { ProgressCellRenderer, TextTemplateRenderer } from './CellRenderer';


export const demoContent = (config) => {
  return config;
};

export default (config) => {
  if (!config.widgets.widget.pick_object)
    config.widgets.widget.pick_object = ObjectBrowserWidgetMode('link');

  if (!config.widgets.widget.text_align)
      config.widgets.widget.text_align = TextAlign;

  config.blocks.blocksConfig.dataTable = {
    id: 'dataTable',
    title: 'Data Table',
    icon: tableSVG,
    group: 'common',
    view: DataTableView,
    edit: DataTableEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    cellRenderers: {
      textTemplate: {
        id: 'textTemplate',
        title: 'Text Template',
        view: TextTemplateRenderer,
        schemaExtender: TextTemplateRenderer.schemaExtender,
      },
      progress: {
        id: 'progress',
        title: 'Progress',
        view: ProgressCellRenderer,
      },
    },
  };

  config.addonReducers.rawdata = rawdata;
  return config;
};
