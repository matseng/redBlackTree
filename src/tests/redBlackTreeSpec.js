describe('Red-Black Tree', function() {

  describe('in-order traversal', function() {
    
    var tree;
    
    it('should get the proper key ordering example 1', function() {
      tree = new Tree();
      var arr = [2,1,3,4,5]
      tree.build(arr);
      console.log(tree);
      expect(tree.inOrderTraverse()).to.equal('1, 2, 3, 4, 5');
    });

    it('should get the proper key ordering example 2', function() {
      tree = new Tree('y');
      tree.left = new Tree('x');
      tree.left.left = new Tree('A');
      tree.left.right = new Tree('B');
      tree.right = new Tree('C');
      console.log(tree);
      expect(tree.inOrderTraverse()).to.equal('A, x, B, y, C');
    });

    it('should get the proper key ordering example 3', function() {
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

});