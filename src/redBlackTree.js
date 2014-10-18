//http://web.cse.ohio-state.edu/~gurari/course/cis680/cis680Ch11.html#QQ1-43-75

// root is black
// all paths from root to leaf hit the same number of black nodes
// no path can contain 2 consecutive red nodes
// if a node is red, then both its children are black
// insert: color the node red

//discrepancy from parent and child having same color
  //get color of grandparent
  //get color of parent's sibling ('uncle')
  //if uncle is red, then changes colors
  //if uncle is black or null, then rotate

var Tree = function(key, obj) {
  this.key = key || null;
  this.val = obj || 'obj';
  this.left;
  this.right;
  this.color = 'red';
};

Tree.prototype.build = function(arr) {
  for(var i = 0; i < arr.length; i++) {
    this.insert(null, arr[i]);
  }
};

Tree.prototype.insert = function(newTree, key, obj) {
  obj = obj || 'obj';
  newTree = newTree || new Tree(key, obj);
  if( !this.key ) {
    this.key = key;
    this.val = obj;
    this.color = 'black'
    return;
  }
  if (key < this.key) {
    if( !this.left ) {
      this.left = newTree;
    } else {
      this.left.insert(newTree);
    }
  } else {
    if( !this.right ) {
      this.right = newTree;
    } else {
      this.right.insert(newTree);
    }
  }
  //TODO: check colors of ancestors
};

Tree.prototype.check = function() {

};

Tree.prototype.inOrderTraverse = function(result) {
  var result = [];
  function recur(tree) {
    var added = false;
    if( tree.left ) {
      recur(tree.left)
    }
    result.push(tree.key)
    if( tree.right ) {
      recur(tree.right);
    }
  }
  recur(this);
  return result.join(', ');
};
