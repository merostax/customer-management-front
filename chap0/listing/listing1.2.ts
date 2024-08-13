import { Cat } from "./listing1.2.1";

describe('Test Cat getters and setters.', () => {
  it('The cat name should be Michou', () => {
    const cat = new Cat();
    cat.name = 'Michou';
    expect(cat.name).toEqual('Michou');
  });
});
