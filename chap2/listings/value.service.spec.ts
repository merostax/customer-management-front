import { of } from 'rxjs';
import { ValueService } from './ValueService';

describe('ValueService', () => {
    let service: ValueService;

    beforeEach(() => {
        service = new ValueService();
    });

    it('should return real value from getValue', () => {
        expect(service.getValue()).toBe('real value');
    });

    it('should return value from observable in getObservableValue', (done) => {
        service.getObservableValue().subscribe((value) => {
            expect(value).toBe('observable value');
            done();
        });
    });

    it('should return value from promise in getPromiseValue', async () => {
        const value = await service.getPromiseValue();
        expect(value).toBe('promise value');
    });
});
