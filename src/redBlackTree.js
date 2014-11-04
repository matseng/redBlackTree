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
var RedBlackTree = function() {
  this.root;
};

RedBlackTree.prototype.insert = function(key, obj) {
  this.root = this.root || new Tree();
  return this.root.insert(key, obj, null, this);
};

RedBlackTree.prototype.build = function(arr) {
  if(typeof arr[0] === 'number') {
    for(var i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  } else {
    throw "Objects not yet supported"
  }
};

RedBlackTree.prototype.inOrderTraversal = function() {
  return this.root.inOrderTraversal();
};

var Tree = function(key, obj) {
  // this.key = key || null;  // remember this line causes a bug if key equals 0
  this.key = (key != null) ? key : null;  // same as this.key = (key !== null && key !== undefined) ? key : null;
  this.val = obj || 'obj';
  this.left = null;
  this.right = null;
  this.parent = null;
  this.color = 'red';
};

Tree.prototype.build = function(arr) {
  for(var i = 0; i < arr.length; i++) {
    this.insert(arr[i]);
  }
};

Tree.prototype.insert = function(key, obj, newTree, rbt) {
  obj = obj || 'obj';
  newTree = newTree || new Tree(key, obj);
  if( this.key === null) {
    this.key = key;
    this.val = obj;
    this.color = 'black'
    return this;
  }
  if (newTree.key < this.key) {
    if( !this.left ) {
      this.left = newTree;
      newTree.parent = this;
      newTree.check(rbt);
      return newTree;
    } else {
      return this.left.insert(null, null, newTree, rbt);
    }
  } else {
    if( !this.right ) {
      this.right = newTree;
      newTree.parent = this;
      newTree.check(rbt);
      return newTree;
    } else {
      return this.right.insert(null, null, newTree, rbt);
    }
  }
};

Tree.prototype.check = function(rbt) {
  if(this.color === 'red' && this.parent && this.parent.color === 'red' && this.parent.parent) {
    if(this.getUncleColor() === 'black') {
      this._rotate(rbt);
    } else {  // uncle is red
      this.parent.color = 'black';
      this.parent.parent.color = 'red';
      this.getUncle().color = 'black';
      this.parent.parent.check(rbt);
    }
  }
  if ( this.color === 'red' && this.parent === null ) {
    console.log('Keep the root black');
    this.color = 'black';
  }
  if ( this.parent ) {
    this.parent.check(rbt);
  }
};

Tree.prototype._rotate = function(rbt) {
  var childPosition = this.getPosition();
  var parentPosition = this.parent.getPosition();
  var parent = this.parent;
  var grandparent = parent.parent;
  if (childPosition === 'right' && parentPosition === 'right') {
    grandparent._rotateLeft(rbt);
  } else if (childPosition === 'left' && parentPosition === 'left') {
    grandparent._rotateRight(rbt);
  } else if (childPosition === 'right' && parentPosition === 'left') {
    parent._rotateLeft(rbt);
  } else if (childPosition === 'left' && parentPosition === 'right') {
    parent._rotateRight(rbt);
  }
};

Tree.prototype._rotateLeft = function(rbt) {
  var child = this.right;
  this.connectChildToGrandparent(child);
  child.left = this;
  this.parent = child;
  this.right = null;
  if ( child.parent === null ) rbt.root = child;
  if (this.color === 'black') this.parent.color = 'black';
  this.color = 'red';
  this.check(rbt);
};

Tree.prototype._rotateRight = function(rbt) {
  var child = this.left;
  this.connectChildToGrandparent(child);
  child.right = this;
  this.parent = child;
  this.left = null;
  if ( child.parent === null ) rbt.root = child;
  if (this.color === 'black') this.parent.color = 'black';
  this.color = 'red';
  this.check(rbt);
};

Tree.prototype.connectChildToGrandparent = function(child) {
  if (this.parent && this.getPosition() === 'left') {
    this.parent.left = child;
    child.parent = this.parent;
  } else if (this.parent && this.getPosition() === 'right') {
    this.parent.right = child;
    child.parent = this.parent;
  } else {
    child.parent = null;
  }
};

Tree.prototype.getPosition = function() {
  if (this === this.parent.left) {
    return 'left';
  } else if (this === this.parent.right) {
    return 'right';
  }
};

Tree.prototype.getSibling = function() {
  if(this === this.parent.left)
    return this.parent.right;
  return this.parent.left;
};

Tree.prototype.disconnectChildFromParent = function() {
  var parent = this.parent;
  if ( !parent ) {
    return;
  } else if( this === parent.right) {
    parent.right = null;
  } else if ( this === parent.left ) {
    parent.left = null;
  } else {
    throw "Mismatch between child and parent";
  }
  this.parent = null;
};

/*
*
* Connects a child to a new parent
*
*/
Tree.prototype.connectChildToParent = function(parent) {
  if (parent.left) {
    parent.right = this;
  } else if (parent.right) {
    parent.left = this;
  } else {
    throw "No available children";
  }
  this.parent = parent;
};

Tree.prototype.getUncleColor = function() {
  var uncle = this.getUncle();
  if ( !uncle ) return 'black';  //return 'black if uncle dont's exist
  return uncle.color;
};

Tree.prototype.getUncle = function() {
  if(this.parent.parent.right === this.parent) {
    return this.parent.parent.left;
  }
  return this.parent.parent.right;
};

Tree.prototype.inOrderTraversal = function(result) {
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
  // return result.join(', ');
  return result;
};
