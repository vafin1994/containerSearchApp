import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlSumCounterService {

  constructor() {
  }

  checkControlSum(containerId: string): boolean {
    console.log('Check control sum');
    console.log(containerId);
    // todo convert string to number
    return true;
  }
}
