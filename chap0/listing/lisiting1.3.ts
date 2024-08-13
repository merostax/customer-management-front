
//Structurwise
describe('ComponentName', () => {

    describe('firstFunction', () => {

      it('should return true', () => {
        expect(true).toBe(true);
      });

      it('should return true', () => {
        expect(false).toBe(false);

      });
    });


    describe('SecondFunction', () => {
        
      it('should return true', () => {
        expect(5).toBe(5);
      });
  
      it('should fail', () => {
        expect(3*4).not.toBe(13);
      });

    });

  });
  