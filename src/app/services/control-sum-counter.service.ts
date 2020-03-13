import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlSumCounterService {

  digitalEquivalent = {
    A: 10, B: 12, C: 13, D: 14, E: 15, F: 16, G: 17, H: 18, I: 19, J: 20,
    K: 21, L: 23, M: 24, N: 25, O: 26, P: 27, Q: 28, R: 29, S: 30, T: 31,
    U: 32, V: 34, W: 35, X: 36, Y: 37, Z: 38
  };

  constructor() {
  }

  checkControlSum(containerId: string): boolean {
    let charArr: string[] = containerId.split('');
    const inputControlSum = parseInt(charArr[charArr.length - 1], 10);
    charArr = this.transformLettersToDigits(charArr);
    const digitArr: number[] = [];
    for (let i = 0; i < charArr.length - 1; i++) {
      digitArr.push(this.multipleDigitToWeightCoefficient(charArr[i], i));
    }
    const digitArrSum = digitArr.reduce((result, currentValue) => result + currentValue);
    const countedControlSum = digitArrSum % 11;
    return inputControlSum === countedControlSum;
  }

  transformLettersToDigits(array: string[]) {
    for (let i = 0; i < 4; i++) {
      array[i] = this.digitalEquivalent[array[i]];
    }
    return array;
  }

  multipleDigitToWeightCoefficient(char: string, index: number) {
    const digit = parseInt(char, 10);
    const weightConst = Math.pow(2, index);
    return digit * weightConst;
  }
}
