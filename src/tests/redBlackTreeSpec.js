describe('Red-Black Tree', function() {

  xdescribe('in-order traversal of Tree class (not yet Red-Black tree)', function() {
    
    var tree;
    
    xit('should get the proper key ordering example 1', function() {
      tree = new Tree();
      var arr = [2,1,3,4,5]
      tree.build(arr);
      console.log(tree);
      expect(tree.inOrderTraversal()).to.equal('1, 2, 3, 4, 5');
    });

    xit('should get the proper key ordering example 2', function() {
      tree = new Tree('y');
      tree.left = new Tree('x');
      tree.left.left = new Tree('A');
      tree.left.right = new Tree('B');
      tree.right = new Tree('C');
      console.log(tree);
      expect(tree.inOrderTraversal()).to.equal('A, x, B, y, C');
    });

    xit('should get the proper key ordering example 3', function() {
      tree = new Tree('f');
      tree.left = new Tree('b');
      tree.left.left = new Tree('a');
      tree.left.right = new Tree('d');
      tree.left.right.left = new Tree('c');
      tree.left.right.right = new Tree('e');
      tree.right = new Tree('g');
      tree.right.right = new Tree('i');
      tree.right.right.left = new Tree('h');
      console.log(tree);
      expect(tree.inOrderTraversal()).to.equal('a, b, c, d, e, f, g, h, i');
    });
  });

  xdescribe('RedBlackTree class', function() {

    var rbt;
    
    it('should create a 3 node tree', function() {
      rbt = new RedBlackTree();
      rbt.insert(1);
      rbt.insert(2);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.right.color).to.equal('red');
      rbt.insert(3);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.left.color === 'red' && rbt.root.right.color === 'red').to.equal(true);
      expect(rbt.root.key).to.equal(2);
      expect(rbt.root.right.key).to.equal(3);
      expect(rbt.root.left.key).to.equal(1);
      expect(rbt.root.left.parent).to.equal(rbt.root);
    });

    it('should create a 4 node tree', function() {
      rbt.insert(4);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.left.color).to.equal('black');
      expect(rbt.root.right.color).to.equal('black');
      expect(rbt.root.right.right.color).to.equal('red');
    });

    it('should create a 5 node tree', function() {
      rbt.insert(5);
      expect(rbt.root.right.key).to.equal(4);
      expect(rbt.root.right.color).to.equal('black');
      expect(rbt.root.right.left.key).to.equal(3);
      expect(rbt.root.right.left.color).to.equal('red');
    });

  });

  xdescribe('should be able to build more complicated trees', function() {
    it('should create a 3 node tree', function() {
      var rbt;
      rbt = new RedBlackTree();
      // rbt.build([-1, 0, 1]);
      rbt.insert(1);
      rbt.insert(0);
      // rbt.insert(-1);
      expect(rbt.root.key).to.equal(1);
      expect(rbt.root.left.key).to.equal(0);
      rbt.insert(-1);
      console.log(rbt);
      expect(rbt.root.key).to.equal(0);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.right.color).to.equal('red');
      expect(rbt.root.left.color).to.equal('red');
    });

    it('should build a node tree', function() {
      var rbt = new RedBlackTree();
      var newTree;
      var uncle;
      rbt.build([8,13,17]);
      expect(rbt.root.key).to.equal(13);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.right.key).to.equal(17);
      expect(rbt.root.right.color).to.equal('red');
      expect(rbt.root.left.key).to.equal(8);
      expect(rbt.root.left.color).to.equal('red');
      rbt.insert(1);
      expect(rbt.root.left.left.key).to.equal(1);
      expect(rbt.root.right.color).to.equal('black');
      expect(rbt.root.left.color).to.equal('black');
      newTree = rbt.insert(11);
      expect(rbt.root.left.right.color).to.equal('red');
      expect(newTree.color).to.equal('red');
      console.log(rbt);
      newTree = rbt.insert(15);
      expect(newTree.color).to.equal('red');
      expect(newTree.key).to.equal(15);
      newTree = rbt.insert(25);
      expect(newTree.color).to.equal('red');
      newTree = rbt.insert(6);
      expect(newTree.color).to.equal('red');
      expect(newTree.parent.color).to.equal('black');
      newTree = rbt.insert(22);
      expect(newTree.color).to.equal('red');
      expect(newTree.parent.color).to.equal('black');
      uncle = newTree.getUncle();
      expect(newTree.getUncleColor()).to.equal('black');
      expect(newTree.getUncle().key).to.equal(15);
      newTree = rbt.insert(27);
      expect(newTree.color).to.equal('red');
    });
  });

  describe('...', function() {
    it('should ', function() {
      var rbt = new RedBlackTree();
      var newTree;
      // rbt.build([1,6,8,11,13,15,17,22,25,27]);
      rbt.build([1,6,8,11]);
      expect(rbt.root.key).to.equal(6);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.parent).to.equal(null);
      expect(rbt.root.left.color).to.equal('black');
      expect(rbt.root.right.color).to.equal('black');
      expect(rbt.root.right.right.color).to.equal('red');
      newTree = rbt.insert(13);
      console.log(rbt.root);
      expect(newTree.color).to.equal('red');
      expect(newTree.parent.key).to.equal(11);
      expect(newTree.parent.color).to.equal('black');
      expect(newTree.parent.left.key).to.equal(8);
      expect(newTree.parent.left.color).to.equal('red');
      newTree = rbt.insert(15);
      console.log(newTree);
      expect(newTree.getUncle().key).to.equal(8);
      expect(newTree.getUncle().color).to.equal('black');
      expect(newTree.parent.parent.key).to.equal(11);
      expect(newTree.parent.parent.color).to.equal('red');
      newTree = rbt.insert(17);
      expect(newTree.parent.key).to.equal(15);
      expect(newTree.parent.color).to.equal('black');
      expect(newTree.parent.parent.key).to.equal(11);
      expect(rbt.root.parent).to.equal(null);
      console.log(newTree);
      newTree = rbt.insert(22);
      expect(rbt.root.key).to.equal(11);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.parent).to.equal(null);
      newTree = rbt.insert(25);
      expect(newTree.parent.key).to.equal(22);
      expect(newTree.parent.color).to.equal('black');
    });

    it('should ', function() {
      var rbt = new RedBlackTree();
      // rbt.build([27,6,8,11,13,15,17,22,25,1]);
      rbt.build([6,8,27]);
      console.log(rbt);
      console.log(rbt.inOrderTraversal());
      // expect(rbt.inOrderTraversal()).to.deep.equal([1,6,8,11,13,15,17,22,25,27]);
      expect(rbt.inOrderTraversal()).to.deep.equal([6,8,27]);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.left.color).to.equal('red');
      expect(rbt.root.right.color).to.equal('red');

    });

    it('should ', function() {
      var rbt = new RedBlackTree();
      rbt.build([27,8,6]);
      console.log(rbt);
      console.log(rbt.inOrderTraversal());
      expect(rbt.inOrderTraversal()).to.deep.equal([6,8,27]);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.left.color).to.equal('red');
      expect(rbt.root.right.color).to.equal('red');
    });

    it('should ', function() {
      var rbt = new RedBlackTree();
      rbt.build([6,27,8]);
      console.log(rbt);
      console.log(rbt.inOrderTraversal());
      expect(rbt.inOrderTraversal()).to.deep.equal([6,8,27]);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.left.color).to.equal('red');
      expect(rbt.root.right.color).to.equal('red');
    });

    it('should ', function() {
      var rbt = new RedBlackTree();
      rbt.build([10,12,8,6]);
      console.log(rbt);
      console.log(rbt.inOrderTraversal());
      expect(rbt.inOrderTraversal()).to.deep.equal([6,8,10,12]);
      expect(rbt.root.color).to.equal('black');
      expect(rbt.root.left.color).to.equal('black');
      expect(rbt.root.right.color).to.equal('black');
      expect(rbt.root.left.left.color).to.equal('red');
    });

  });

});
