//http://web.cse.ohio-state.edu/~gurari/course/cis680/cis680Ch11.html#QQ1-43-75

var Tree = function(key, obj) {
  this.key = key || null;
  this.val = obj || null;
  this.left;
  this.right;
  this.red = false;
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

Tree.prototype.traverse = function(result) {
  var result = result || [];
  if (!this.left && !this.right) {
    result.push(this.key);
  } else {
    if( this.left ) {
      this.left.traverse(result);
    }
    if( this.right ) {
      this.right.traverse(result);
    }
    result.push(this.key);
  }
  return result.join(', ');
};
