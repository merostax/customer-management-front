//imports x from z

describe('ComponentName', () => {
  // declaration :
  //--------------
  //-------------
  //-----------------
  let c: number;
  
  beforeEach(() => {
    'preparing the test'
    //...initTestInviromnent()
  });

  beforeEach(() => {
    'initialization'
    c = 1;
  });

  afterEach(() => {
    'cleaningUp '
    c = 0;
  });
// question: if we have beforeEach why should we do the aftereach ?

  describe('firstFunction', () => {
    //further declaring variable for only the firstfunction
    let a = 5;
    it('should return true', () => {
      expect(a * 4).toBe(20);
    });

    it('should fail', () => {
      expect(c * 4).not.toBe(12);
    });
  });


  describe('SecondFunction', () => {
    //further declaring variable for only the secondfunction
    let a = 3;
    it('should return true', () => {
      expect(a * 4).toBe(12);
    });

    it('should fail', () => {
      expect(c * 4).not.toBe(12);
    });

  });

});
