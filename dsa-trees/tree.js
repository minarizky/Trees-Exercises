/** TreeNode: node for a general tree. */
class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    const dfs = (node) => {
      if (!node) return 0;
      return node.val + node.children.reduce((sum, child) => sum + dfs(child), 0);
    };

    return dfs(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    const dfs = (node) => {
      if (!node) return 0;
      const count = node.val % 2 === 0 ? 1 : 0;
      return count + node.children.reduce((total, child) => total + dfs(child), 0);
    };

    return dfs(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    const dfs = (node) => {
      if (!node) return 0;
      const count = node.val > lowerBound ? 1 : 0;
      return count + node.children.reduce((total, child) => total + dfs(child), 0);
    };

    return dfs(this.root);
  }
}

module.exports = { Tree, TreeNode };
pl