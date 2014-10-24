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

RedBlackTree.prototype.insert = function(key, obj, newTree) {
  this.root = this.root || new Tree();
  this.root.insert(key, obj, newTree, this);
};

var Tree = function(key, obj) {
  this.key = key || null;
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
  if( !this.key ) {
    this.key = key;
    this.val = obj;
    this.color = 'black'
    return;
  }
  if (newTree.key < this.key) {
    if( !this.left ) {
      this.left = newTree;
      newTree.parent = this;
      newTree.check(rbt);
    } else {
      this.left.insert(null, null, newTree, rbt);
    }
  } else {
    if( !this.right ) {
      this.right = newTree;
      newTree.parent = this;
      newTree.check(rbt);
    } else {
      this.right.insert(null, null, newTree, rbt);
    }
  }
  //TODO: check colors of ancestors
};

Tree.prototype.check = function(rbt) {
  if(this.color === 'red' && this.parent.color === 'red' && this.parent.parent) {
    if(this.getUncleColor() === 'black') {
      console.log('TODO: rotate here');
      var parent = this.parent;
      var grandparent = parent.parent;
      var greatGrandparent = this.parent.parent.parent;
      parent.disconnectChildFromParent(grandparent);
      grandparent.disconnectChildFromParent(greatGrandparent);
      grandparent.connectChildToParent(parent);
      if ( greatGrandparent) parent.connectChildToParent(greatGrandparent);
      parent.color = 'black';
      parent.left.color = 'red';
      parent.right.color = 'red';
      if ( rbt.root === this.parent.left) {
        rbt.root = this.parent;
      }
    } else {
      this.parent.color = 'black';
      this.parent.check(rbt);
    }
  } else if (this.color === 'black' && rbt.root === this.parent) {
    this.parent.color = 'black';
    if ( this.parent.left ) this.parent.left.color = 'black';
    if ( this.parent.right) this.parent.right.color = 'black';
  }
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
