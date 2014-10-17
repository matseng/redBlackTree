//http://web.cse.ohio-state.edu/~gurari/course/cis680/cis680Ch11.html#QQ1-43-75

// root is black
// all paths from root to leaf hit the same number of black nodes
// no path can contain 2 consecutive red nodes
// if a node is red, then both its children are black
// insert: color the node red

var Tree = function(key, obj) {
  this.key = key || null;
  this.val = obj || 'obj';
  this.left;
  this.right;
  this.color = 'red';
};

Tree.prototype.build = function(arr) {
  for(var i = 0; i < arr.length; i++) {
    this.insert(arr[i]);
  }
};

Tree.prototype.insert = function(key, obj) {
  obj = obj || 'obj';
  if( !this.key ) {
    this.key = key;
    this.val = obj;
    this.color = 'black'
    return;
  }
  if (key < this.key) {
    if( !this.left ) {
      this.left = new Tree(key, obj);;
    } else {
      this.left.insert(key, obj);
    }
  } else {
    if( !this.right ) {
      this.right = new Tree(key, obj);
    } else {
      this.right.insert(key, obj);
    }
  }
};

Tree.prototype.check = function() {

};

Tree.prototype.inOrderTraverse = function(result) {
  
  var result = [];
  var started = false;
  function recur(tree) {
    var added = false;
    if ( !tree.left || started) {
      result.push(tree.key);
      started = true;
      added = true;
    }
    if( tree.left ) {
      recur(tree.left)
    }
    if ( !added ) {
      result.push(tree.key)
    }
    if( tree.right ) {
      recur(tree.right);
    }
  }
  recur(this);
  return result.join(', ');
};
