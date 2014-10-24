describe('Red-Black Tree', function() {

  describe('in-order traversal of Tree class (not yet Red-Black tree)', function() {
    
    var tree;
    
    xit('should get the proper key ordering example 1', function() {
      tree = new Tree();
      var arr = [2,1,3,4,5]
      tree.build(arr);
      console.log(tree);
      expect(tree.inOrderTraverse()).to.equal('1, 2, 3, 4, 5');
    });

    xit('should get the proper key ordering example 2', function() {
      tree = new Tree('y');
      tree.left = new Tree('x');
      tree.left.left = new Tree('A');
      tree.left.right = new Tree('B');
      tree.right = new Tree('C');
      console.log(tree);
      expect(tree.inOrderTraverse()).to.equal('A, x, B, y, C');
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
      expect(tree.inOrderTraverse()).to.equal('a, b, c, d, e, f, g, h, i');
    });
  });

  describe('RedBlackTree class', function() {

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

  describe('should be able to insert negative nodes', function() {
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
      // rbt.build([1,6,8,11,13,15,17,22,25,27]);
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
    });

  });

});
