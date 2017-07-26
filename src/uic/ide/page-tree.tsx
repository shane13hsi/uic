import * as React from 'react';
import { Tree } from '../antd/antd';
import { bind } from 'decko';
import { Scroll } from './components/scroll';
import { observer } from 'mobx-react';
import { lazyInject } from '../core/ioc';
import { $PageTree } from './models/$page-tree';
import { toJS } from 'mobx';
import { GLApp } from './gl-app';

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
  handleSelect(selectedKeys: any[], e: { selected: boolean, selectedNodes, node, event }) {
    if (e.node.props.isLeaf) {
      const { eventKey, title } = e.node.props;
      // 新建标签
      GLApp.instance.addOrSetActiveWithinCanvas(eventKey, title);

    }
  }

  @bind
  treeNodeRender(treeList) {
    return treeList.map(item => {
      if (Array.isArray(item.children)) {
        return (
          <TreeNode title={item.title}
                    key={item.id}>
            {this.treeNodeRender(item.children)}
          </TreeNode>
        )
      } else {
        return <TreeNode isLeaf={true} title={item.title} key={item.id}/>
      }
    });
  }

  render() {
    return (
      <Scroll>
        <Tree showLine
              onSelect={this.handleSelect}>
          {this.treeNodeRender(toJS(this.$pageTree.pageTree))}
        </Tree>
      </Scroll>
    );
  }
}
