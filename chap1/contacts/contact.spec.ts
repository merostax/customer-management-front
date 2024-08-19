import ContactClass from "./contact";

describe('Contact class tests', () => {

   let contact: ContactClass|null;

  beforeEach(() => {
    contact = new ContactClass();
  });

  afterEach(() => {
    contact = null;
  });
describe('constructor testing',()=>{
  it('should have a valid constructor', () => {
    expect(contact).toBeTruthy;
  });
  it('should not have a valid constructor', () => {
    //--------------
  });
});

describe('id property tests', () => {
  it('should get and set id correctly', () => {
    contact!.id = 1;
    expect(contact!.id).toEqual(1);
  });

  it('should not have an id initially', () => {
    expect(contact!.id).toBeUndefined(); 
  });
});



describe('name property tests', () => {
  it('should set name correctly through constructor', () => {
    contact = new ContactClass('barthauer');
    expect(contact.name).toEqual('barthauer');
  });
  it('should get and set name correctly', () => {
    expect(contact!.name).toBeUndefined;
  });
  it('should get and set name correctly', () => {
    contact!.name = 'barthauer';
    expect(contact!.name).toEqual('barthauer');
  });
});


describe('email property tests', () => {
  it('should get and set email correctly', () => {
    (contact as any)!.email = 'barthauer@barthauer.de';
    expect((contact as any)!.email).toEqual('barthauer@barthauer.de');
  });
  it('should not get and set email correctly', () => {
});
})
});