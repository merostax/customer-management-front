import { MasterService } from './master.service';
import { ValueService } from './ValueService';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueService: ValueService;

  beforeEach(() => {
    valueService = { getValue: jest.fn() } as any; 
    masterService = new MasterService(valueService);
  });

  it('should return faked value from a fake object', () => {
    const fake = { getValue: jest.fn().mockReturnValue('fake value') };
    masterService = new MasterService(fake as any);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return stubbed value from a spy', () => {
    const spy = jest.spyOn(valueService, 'getValue').mockReturnValue('stub value');
    expect(masterService.getValue()).toBe('stub value');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});