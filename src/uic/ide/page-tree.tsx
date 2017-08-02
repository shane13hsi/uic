import * as React from 'react';
import { Tree } from '../antd/antd';
import { bind } from 'decko';
import { Scroll } from './components/scroll';
import { observer } from 'mobx-react';
import { lazyInject } from '../core/ioc';
import { $PageTree } from './models/$page-tree';
import { toJS } from 'mobx';
import { GLApp } from './gl-app';

const TreeNode = Tree.TreeNode;

@observer
export class PageTree extends React.Component<{}, {}> {

  @lazyInject($PageTree)
  private _$pageTree: $PageTree;


  componentDidMount() {
    this._$pageTree.load();
  }

  @bind
  private _handleSelect(selectedKeys: any[], e: { selected: boolean, selectedNodes, node, event }) {
    if (e.node.props.isLeaf) {
      const { eventKey, title } = e.node.props;
      GLApp.instance.setActiveCanvasTab(eventKey, title);
    }
  }

  @bind
  private _treeNodeRenderer(treeList) {
    return treeList.map(item => {
      if (Array.isArray(item.children)) {
        return (
          <TreeNode title={item.title}
                    key={item.id}>
            {this._treeNodeRenderer(item.children)}
          </TreeNode>
        )
      } else {
        return <TreeNode isLeaf={true} title={item.title} key={item.id}/>
      }
    });
  }

  public render() {
    return (
      <Scroll>
        <Tree showLine
              onSelect={this._handleSelect}>
          {this._treeNodeRenderer(toJS(this._$pageTree.pageTree))}
        </Tree>
      </Scroll>
    );
  }
}
