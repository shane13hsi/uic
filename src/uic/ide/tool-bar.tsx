import * as React from 'react';
import { CommandBar, IContextualMenuItem } from 'office-ui-fabric-react';

const items: IContextualMenuItem[] = [
  {
    name: 'TestText 1',
    key: 'TestKey1',
    items: [
      {
        name: 'SubmenuText 1',
        key: 'SubmenuKey1',
        className: 'SubMenuClass'
      }
    ]
  },
];

export class ToolBar extends React.Component<{}, {}> {
  render() {
    return (
      <CommandBar
        items={ items }
      />
    )
  }
}
