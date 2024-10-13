import { of } from "rxjs";

export class ValueService {
    getValue() {
      return 'real value';
    }
  
    getObservableValue() {
      return of('observable value');
    }
  
    getPromiseValue() {
      return Promise.resolve('promise value');
    }
  }
  