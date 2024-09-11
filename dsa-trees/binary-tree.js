/** BinaryTreeNode: node for a general tree. */
class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    if (!this.root) return 0;

    const bfs = (node) => {
      const queue = [[node, 1]]; // [node, depth]
      while (queue.length) {
        const [current, depth] = queue.shift();
        if (!current.left && !current.right) return depth;
        if (current.left) queue.push([current.left, depth + 1]);
        if (current.right) queue.push([current.right, depth + 1]);
      }
    };

    return bfs(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    const dfs = (node) => {
      if (!node) return 0;
      const leftDepth = dfs(node.left);
      const rightDepth = dfs(node.right);
      return Math.max(leftDepth, rightDepth) + 1;
    };

    return dfs(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    let maxSum = -Infinity;

    const dfs = (node) => {
      if (!node) return 0;

      const leftSum = Math.max(dfs(node.left), 0);
      const rightSum = Math.max(dfs(node.right), 0);

      maxSum = Math.max(maxSum, node.val + leftSum + rightSum);

      return node.val + Math.max(leftSum, rightSum);
    };

    dfs(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    let result = null;

    const dfs = (node) => {
      if (!node) return;

      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;
        }
      }

      dfs(node.left);
      dfs(node.right);
    };

    dfs(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */
  areCousins(node1, node2) {
    if (!this.root) return false;

    const bfs = (root, node1, node2) => {
      const queue = [[root, null, 0]]; // [node, parent, level]
      let node1Info = null;
      let node2Info = null;

      while (queue.length) {
        const [node, parent, level] = queue.shift();

        if (node === node1) node1Info = { parent, level };
        if (node === node2) node2Info = { parent, level };

        if (node.left) queue.push([node.left, node, level + 1]);
        if (node.right) queue.push([node.right, node, level + 1]);

        if (node1Info && node2Info) {
          return node1Info.level === node2Info.level && node1Info.parent !== node2Info.parent;
        }
      }

      return false;
    };

    return bfs(this.root, node1, node2);
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    if (!tree.root) return "[]";

    const result = [];
    const queue = [tree.root];

    while (queue.length) {
      const node = queue.shift();
      if (node) {
        result.push(node.val);
        queue.push(node.left, node.right);
      } else {
        result.push(null);
      }
    }

    // Remove trailing nulls
    while (result[result.length - 1] === null) {
      result.pop();
    }

    return JSON.stringify(result);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(stringTree) {
    const data = JSON.parse(stringTree);
    if (!data.length) return new BinaryTree();

    const root = new BinaryTreeNode(data[0]);
    const queue = [root];
    let i = 1;

    while (queue.length && i < data.length) {
      const node = queue.shift();
      if (data[i] !== null) {
        node.left = new BinaryTreeNode(data[i]);
        queue.push(node.left);
      }
      i++;
      if (i < data.length && data[i] !== null) {
        node.right = new BinaryTreeNode(data[i]);
        queue.push(node.right);
      }
      i++;
    }

    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    const findLCA = (node, p, q) => {
      if (!node) return null;
      if (node === p || node === q) return node;

      const left = findLCA(node.left, p, q);
      const right = findLCA(node.right, p, q);

      if (left && right) return node;
      return left || right;
    };

    return findLCA(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
