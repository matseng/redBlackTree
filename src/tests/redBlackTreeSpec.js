describe('Red-Black Tree', function() {

  describe('in-order traversal', function() {
    var tree;
    it('should get the proper key ordering', function() {
      tree = new Tree();
      var arr = [2,1,3,4,5]
      tree.build(arr);
      console.log(tree);
      expect(tree.traverse()).to.equal('1, 5, 4, 3, 2');
    });
  });

});