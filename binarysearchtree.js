// binarysearchtree.js

/* note:
 * sort array
 * before converting to BST
 *
 * be sure to always remove duplicate values
 * or check for an existing value before inserting
 */

// Node class
/* should have an attribute for the data it stores
 * as well as its left and right children
 */
class Node {
  constructor() {
    //code
  }
}

// Tree class
/* which accepts an array when initialized
 * should have a root attribute
 * which uses the return value of buildTree
 */
class Tree {
  constructor() {
    //code
  }
}

// buildTree function
/* that takes array of data
 * (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
 * and turns it into a balanced binary tree of Node objects
 * appropriately placed
 * (don't forget to sort and remove duplicates)
 * should return the level-0 root node
 */
function buildTree(array) {
  // code
}

// insert function
// to insert given value
function insert(value) {
  // code
}

// deleteItem function
// to delete given value
function deleteItem(value) {
  // code
}

// find function
// returns the node with given value
function find(value) {
  // code
}

// levelOrder function
/* that accepts callback as parameter
 * should traverse tree in breadth-first level order
 * and call the callback on each node as it traverses
 * passing the whole node as an argument
 * can be implemented using iteration or recursion
 * if no callback is provided, throw error
 */
function levelOrder(callback) {
  // code
}

// inOrder function
/* that accepts callback as parameter
 * should traverse tree in respective depth-first order
 * and pass each node to the provided callback
 * if no callback is provided, throw error
 */
function inOrder(callback) {
  // code
}

// preOrder function
/* that accepts callback as parameter
 * should traverse tree in respective depth-first order
 * and pass each node to the provided callback
 * if no callback is provided, throw error
 */
function preOrder(callback) {
  // code
}

// postOrder function
/* that accepts callback as parameter
 * should traverse tree in respective depth-first order
 * and pass each node to the provided callback
 * if no callback is provided, throw error
 */
function postOrder(callback) {
  // code
}

// height function
/* that returns the height of the node
 * containing the given value
 */
function height(value) {
  // code
}

// depth function
/* that returns the depth of the node
 * containing the given value
 */
function depth(value) {
  // code
}

// isBalanced function
// to check if tree is balanced
function isBalanced() {
  // code
}

// rebalance function
// to rebalance an unbalanced tree
function rebalance() {
  // code
}

// driver script
/* 1. creates a binary search tree from array of random numbers < 100
 * 2. confirm the tree is balanced by calling isBalanced
 * 3. print out all elements in level, pre, post, and in order
 * 4. unbalance tree by adding several numbers > 100
 * 5. confirm tree is unbalanced by calling isBalanced
 * 6. balance tree by calling rebalance
 * 7. confirm tree is balanced by calling isBalanced
 * 8. print out all elements in level, pre, post, and in order
 */
