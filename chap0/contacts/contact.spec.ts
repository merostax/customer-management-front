import ContactClass from './contact';

describe('Contact class tests', () => {
  let contact: any; //Declares the contact variable as a any type(better implementation will come later using fixture)
  beforeEach(() => {
    //Executes beforeEach function before each test case
    // explain if we have 2 beforeEach
    contact = new ContactClass();
  });
  it('should have a valid constructor', () => {
    //Tests the contact not to be null
    expect(contact).not.toBeNull();
  });
  afterEach(() => {
    //Executes afterEach function after each test case
    contact = null;
  });
});

//--------------------------------------------------------------------------------------------------------

describe('Contact class tests', () => {
  let contact: any;; //Declares the contact variable as a ContactClass type
  beforeEach(() => {
    //Executes beforeEach function before each test case
    contact = new ContactClass();
  });
  it('should have a valid constructor', () => {
    //Tests the contact not to be null
    expect(contact).not.toBeNull();
  });
  it('should set name correctly through constructor', () => {
    contact = new ContactClass('barthauer');
    expect(contact.name).toEqual('barthauer');
    contact = null;
  });
  it('should have a valid constructor', () => {
    //Tests the contact not to be null
    expect(contact).not.toBeNull();
  });
  afterEach(() => {
    //Executes afterEach function after each test case
    contact = null;
  });
});
//---------------------------------------------------------------------------

describe('Contact class tests', () => {
  let contact: ContactClass|null;; //Declares the contact variable as a ContactClass type
  beforeEach(() => {
    //Executes beforeEach function before each test case
    contact = new ContactClass();
  });
  it('should have a valid constructor', () => {
    //Tests the contact not to be null
    expect(contact).not.toBeNull();
  });
  it('should set name correctly through constructor', () => {
    contact = new ContactClass('barthauer');
    expect(contact.name).toEqual('barthauer');
  });
  it('should have a valid constructor', () => {
    //Tests the contact not to be null
    expect(contact).not.toBeNull();
  });
  it('should get and set id correctly', () => {
    contact!.id = 1;
    expect(contact!.id).toEqual(1);
    //contact=null explain beforeeach/aftereach
  });
  it('should get and set name correctly', () => {
    contact!.name = 'barthauer';
    expect(contact!.name).toEqual('barthauer');
  });

  afterEach(() => {
    //Executes afterEach function after each test case
    contact = null;
  });
});

//---------------------------------------------------------------------------

describe('Contact class tests', () => {
  let contact: ContactClass|null;; //Declares the contact variable as a ContactClass type
  beforeEach(() => {
    //Executes beforeEach function before each test case
    contact = new ContactClass();
  });
  it('should have a valid constructor', () => {
    //Tests the contact not to be null
    expect(contact).not.toBeNull();
  });
  it('should set name correctly through constructor', () => {
    contact = new ContactClass('barthauer');
    expect(contact.name).toEqual('barthauer');
  });
  it('should have a valid constructor', () => {
    //Tests the contact not to be null
    expect(contact).not.toBeNull();
  });
  it('should get and set id correctly', () => {
    contact!.id = 1;
    expect(contact!.id).toEqual(1);
    //contact=null explain beforeeach/aftereach
  });
  it('should get and set name correctly', () => {
    contact!.name = 'barthauer';
    expect(contact!.name).toEqual('barthauer');
  });
  it('should get and set email correctly', () => {
    (contact as any)!.email = 'barthauer@barthauer.de';// explain  
    expect((contact as any)!.email).toEqual('barthauer@barthauer.de');
  });
  
  afterEach(() => {
    //Executes afterEach function after each test case
    contact = null;
  });
});
