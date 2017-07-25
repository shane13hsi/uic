import * as React from 'react';
import { Tree } from '../antd/antd';
import { bind } from 'decko';
import { Scroll } from './components/scroll';

const pageTree = [
  {
    id: '0-0',
    title: 'parent 1',
    children: [
      {
        id: '0-0-0',
        title: 'parent 1-0',
        children: [
          {
            id: '0-0-0-0',
            title: 'leaf',
          },
          {
            id: '0-0-0-1',
            title: 'leaf',
          },
          {
            id: '0-0-0-2',
            title: 'leaf',
          }
        ]
      },
      {
        id: '0-0-1',
        title: 'parent 1-1',
        children: [
          {
            id: '0-0-1-0',
            title: 'leaf',
          }
        ]
      },
      {
        id: '0-0-2',
        title: 'parent 1-2',
        children: [
          {
            id: '0-0-2-0',
            title: 'leaf',
          },
          {
            id: '0-0-2-1',
            title: 'leaf',
          }
        ]
      }
    ]
  }
];

// dao
// model
// page-list -> PageTree observer
// preview-tabs -> addTab

const TreeNode = Tree.TreeNode;

export class PageTree extends React.Component<{}, {}> {

  @bind
  treeNodeRender(treeList) {
    return treeList.map(item => {
      if (Array.isArray(item.children)) {
        return (
          <TreeNode title={item.title} key={item.id}>
            {this.treeNodeRender(item.children)}
          </TreeNode>
        )
      } else {
        return <TreeNode title={item.title} key={item.id}/>
      }
    });
  }

  render() {
    return (
      <Scroll>
        <Tree showLine>
          {this.treeNodeRender(pageTree)}
        </Tree>
      </Scroll>
    );
  }
}
