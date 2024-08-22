//imports x from z

describe('ComponentName', () => {
  // declaration :
  //--------------
  //-------------
  //-----------------

  beforeEach(() => {
    // optional 
    'preparing the test'
    //...initTestInviromnent()
  });

  beforeEach(() => {
    'initialization'
  });

  afterEach(() => {
    'cleaningUp '
  });
  // question: if we have beforeEach why should we do the aftereach ?

  describe('firstFunction', () => {
    //further declaring variable for only the firstfunction
    it('should work', () => {
      //code
    });

    it('should fail', () => {
      //code
    });
  });


  describe('SecondFunction', () => {
    //further declaring variable for only the secondfunction
    it('should work', () => {
      //code
    });

    it('should fail', () => {
      //code
    });

  });

});
