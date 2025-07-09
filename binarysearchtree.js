// binarysearchtree.js

// array of data for testing
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// Node class
class Node {
  constructor(data) {
    // attribute for the data it stores
    this.data = data;
    // and its left and right children, initialized to null
    this.left = null;
    this.right = null;
  }
}

// Tree class
class Tree {
  // accepts an array when initialized
  constructor(array) {
    // has root attribute which uses return value of buildTree
    this.root = buildTree(array);
  }

  // insert function
  // to insert given value
  insert(value) {
    // if tree is empty
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    // find node that is going to have new node temp as its child
    let parent = null;
    let curr = this.root;
    while (curr !== null) {
      parent = curr;
      if (value < curr.data) {
        curr = curr.left;
      } else if (curr.data < value) {
        curr = curr.right;
      } else {
        return; // value already exists, no insertion needed
      }
    }

    const newNode = new Node(value);

    // if value is smaller, make it left child, else right child
    if (value < parent.data) parent.left = newNode;
    else parent.right = newNode;
  }

  // deleteItem function
  // to delete given value
  deleteItem(value) {
    function deleteNode(node, value) {
      if (node === null) return null;
      // if value to be deleted is smaller than
      // root's value, then it lies in left subtree
      if (value < node.data) {
        node.left = deleteNode(node.left, value);
        return node;
        // if value to be deleted is greater than
        // root's value, then it lies in right subtree
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
        return node;
      } else {
        // if value is same as root's value
        // then this is node to be deleted
        // node with only one child or no child
        if (node.left === null) return node.right;
        else if (node.right === null) return node.left;
        // node with two children
        // get the inorder successor
        // (smallest in right subtree)
        let succ = node.right;
        while (succ.left !== null) {
          succ = succ.left;
        }
        // copy inorder successor's content to this node
        node.data = succ.data;
        // delete inorder successor in right subtree
        node.right = deleteNode(node.right, succ.data);
        return node;
      }
    }
    this.root = deleteNode(this.root, value);
  }

  // find function
  // returns the node with given value
  find(value) {
    function search(node, value) {
      if (node === null || node.data === value) return node;
      if (value < node.data) return search(node.left, value);
      return search(node.right, value);
    }
    return search(this.root, value);
  }

  // levelOrder function
  // traverses tree in breadth-first level order
  levelOrder(callback) {
    if (this.root === null) {
      return; // return nothing if tree is empty
    }
    // if no callback provided
    if (typeof callback !== "function") {
      throw new Error("Callback is required and must be a function!");
    }
    // queue data structure to hold nodes
    let queue = [this.root]; // queue initialized with root node

    // while traversing the tree and there are still
    // child nodes in the queue
    while (queue.length > 0) {
      let currentNode = queue.shift(); // dequeue the first node
      // enqueue left and right children if they exist
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      // perform callback argument on node's value
      callback(currentNode);
    }
  }

  // inOrder function
  // left, visit, right
  inOrder(callback) {
    if (this.root === null) {
      return null; // nothing to traverse
    }
    // if no callback provided
    if (typeof callback !== "function") {
      throw new Error("Callback is required and must be a function!");
    }
    // helper recursive function to traverse from any node
    function traverse(node) {
      if (node === null) return;
      traverse(node.left); // traverse left subtree
      callback(node); // visit node
      traverse(node.right); // traverse right subtree
    }
    // start traversal from root
    traverse(this.root);
  }

  // preOrder function
  // visit, left, right
  preOrder(callback) {
    if (this.root === null) {
      return null; // nothing to traverse
    }
    // if no callback provided
    if (typeof callback !== "function") {
      throw new Error("Callback is required and must be a function!");
    }
    // helper recursive function to traverse from any node
    function traverse(node) {
      if (node === null) return;
      callback(node); // visit node
      traverse(node.left); // traverse left subtree
      traverse(node.right); // traverse right subtree
    }
    // start traversal from root
    traverse(this.root);
  }

  // postOrder function
  // left, right, visit
  postOrder(callback) {
    if (this.root === null) {
      return null; // nothing to traverse
    }
    // if no callback provided
    if (typeof callback !== "function") {
      throw new Error("Callback is required and must be a function!");
    }
    // helper recursive function to traverse from any node
    function traverse(node) {
      if (node === null) return;
      traverse(node.left); // traverse left subtree
      traverse(node.right); // traverse right subtree
      callback(node); // visit node
    }
    // start traversal from root
    traverse(this.root);
  }

  // height function
  // that returns the height of the node
  // containing the given value
  height(value) {
    // find the node containing the value
    let node = this.find(value);
    if (node === null) {
      return null; // value not found in tree
    }
    // recursive helper to compute height of a node
    function heightHelper(node) {
      if (node === null) {
        return -1; // base case: empty subtree height is -1
      }
      const leftHeight = heightHelper(node.left);
      const rightHeight = heightHelper(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
    return heightHelper(node);
  }

  // depth function
  // that returns the depth of the node
  // containing the given value
  depth(value) {
    // helper to compute the depth of the given value's node
    function depthHelper(node, value, level) {
      if (node === null) return -1; // base case
      if (node.data === value) return level; // value found
      if (value < node.data) {
        // search left subtree
        return depthHelper(node.left, value, level + 1);
      } else {
        // if not found in left, search right subtree
        return depthHelper(node.right, value, level + 1);
      }
    }
    return depthHelper(this.root, value, 0);
  }

  // isBalanced function
  // to check if tree is balanced
  // returns height if balanced, otherwise returns -1
  isBalanced() {
    function checkHeight(node) {
      // base case: height of empty tree is 0
      if (node === null) return 0;
      let left = checkHeight(node.left);
      let right = checkHeight(node.right);
      // if either subtrees are unbalanced
      // or absolute difference of heights is greater than 1
      if (left === -1 || right === -1 || Math.abs(left - right) > 1)
        // return -1
        return -1;
      // return height of the tree
      return Math.max(left, right) + 1;
    }
    return checkHeight(this.root) > -1;
  }

  // rebalance function
  // to rebalance an unbalanced tree
  rebalance() {
    // helper function for inorder traversal to
    // store elements of tree in sorted order
    function storeInorder(root, nodes) {
      if (root === null) return;
      // traverse left subtree
      storeInorder(root.left, nodes);
      // store node data
      nodes.push(root.data);
      // traverse right subtree
      storeInorder(root.right, nodes);
    }
    // helper function to build balanced BST from sorted array
    function buildBalancedTree(nodes, start, end) {
      // base case
      if (start > end) return null;
      // get middle element and make it the root
      let mid = Math.floor((start + end) / 2);
      let root = new Node(nodes[mid]);
      // recursively build left and right subtrees
      root.left = buildBalancedTree(nodes, start, mid - 1);
      root.right = buildBalancedTree(nodes, mid + 1, end);
      return root;
    }
    // helper function to balance BST
    function balanceBST(root) {
      let nodes = [];
      // store nodes in sorted order
      storeInorder(root, nodes);
      // build balanced tree from sorted nodes
      return buildBalancedTree(nodes, 0, nodes.length - 1);
    }
    // update this.root with balanced version
    this.root = balanceBST(this.root);
  }
}

// buildTree function
// to take array of data and turn it into balanced BST
function buildTree(array) {
  // sort and create new array without duplicates
  const uniqueArray = [...new Set(array)].sort((a, b) => a - b);
  // helper function to handle recursion
  function balanceTree(uniqueArray, start, end) {
    if (start > end) return null;
    // find middle element
    let mid = start + Math.floor((end - start) / 2);
    // create root node
    let root = new Node(uniqueArray[mid]);
    // create left subtree
    root.left = balanceTree(uniqueArray, start, mid - 1);
    // create right subtree
    root.right = balanceTree(uniqueArray, mid + 1, end);
    // return level-0 root node
    return root;
  }
  return balanceTree(uniqueArray, 0, uniqueArray.length - 1);
}

// driver script
// create binary search tree from array of random numbers < 100
const tree = new Tree(array);
// confirm the tree is balanced by calling isBalanced
console.log("Tree balanced? ", tree.isBalanced()); // logs true or false
// print out all elements in...
// level order
console.log("Level order traversal:");
tree.levelOrder((node) => console.log(node.data));
// pre order
console.log("Pre-order traversal:");
tree.preOrder((node) => console.log(node.data));
// post order
console.log("Post-order traversal:");
tree.postOrder((node) => console.log(node.data));
// in order
console.log("In-order traversal:");
tree.inOrder((node) => console.log(node.data));
// unbalance tree by adding several numbers > 100
[101, 150, 200, 300].forEach((num) => tree.insert(num));
// confirm tree is unbalanced by calling isBalanced
console.log("Tree balanced after inserting large numbers? ", tree.isBalanced());
// re-balance tree by calling rebalance
tree.rebalance();
console.log("Tree balanced after rebalancing? ", tree.isBalanced());
// after re-balancing print out all elements in...
// level order
console.log("Level order traversal after rebalance:");
tree.levelOrder((node) => console.log(node.data));
// pre order
console.log("Pre-order traversal after rebalance:");
tree.preOrder((node) => console.log(node.data));
// post order
console.log("Post-order traversal after rebalance:");
tree.postOrder((node) => console.log(node.data));
// in order
console.log("In-order traversal after rebalance:");
tree.inOrder((node) => console.log(node.data));
