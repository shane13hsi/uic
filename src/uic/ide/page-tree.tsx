import * as React from 'react';
import { Tree } from '../antd/antd';
import { bind } from 'decko';
import { Scroll } from './components/scroll';
import { observer } from 'mobx-react';
import { lazyInject } from '../core/ioc';
import { $PageTree } from './models/$page-tree';
import { toJS } from 'mobx';

// dao
// model
// page-list -> PageTree observer
// preview-tabs -> addTab

const TreeNode = Tree.TreeNode;

@observer
export class PageTree extends React.Component<{}, {}> {

  @lazyInject($PageTree)
  private $pageTree: $PageTree;

  componentDidMount() {
    this.$pageTree.loadPageTree('pageList');
  }

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
          {this.treeNodeRender(toJS(this.$pageTree.pageTree))}
        </Tree>
      </Scroll>
    );
  }
}
