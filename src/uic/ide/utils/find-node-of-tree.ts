export function findNodeOfTree(tree, id) {
  if (!tree) {
    return {}
  }
  for (let i = 0; i < tree.length; i++) {
    if (tree[i]._id === id) {
      return tree[i]
    } else if (tree[i].props.children && tree[i].props.children.length > 0) {
      const a = findNodeOfTree(tree[i].props.children, id);
      if (a != null) {
        return a;
      }
    }
  }
}
