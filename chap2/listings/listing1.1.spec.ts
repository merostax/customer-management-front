//imports x from z

describe('ServiceName', () => {
    // declaration :

    //--------------
    //-------------

    beforeEach(() => {
        'preparing the test'
        //.TestBed.configureTestingModule
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
