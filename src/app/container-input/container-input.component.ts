import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ControlSumCounterService} from '../services/control-sum-counter.service';

@Component({
  selector: 'app-container-input',
  templateUrl: './container-input.component.html',
  styleUrls: ['./container-input.component.css']
})
export class ContainerInputComponent implements OnInit {
  inputValue = '';
  errorMessage: { show: boolean, text: string } = {show: false, text: ''};
  isSearchingEnable = false;

  constructor(private http: HttpService, private controlSumCounterService: ControlSumCounterService) {
  }

  ngOnInit(): void {
  }

  // This check in case user will paste id number in input form
  onModelChangeCheck(event: string) {
    const regExp = /[A-z]{4}\d{7}/;
    const testResult: boolean = regExp.test(event);
    this.isSearchingEnable = testResult;
    if (testResult && event.length === 11) {
      this.isSearchingEnable = this.controlSumCounterService.checkControlSum(this.inputValue);
    }
  }

  // This check in case user will type id number
  onKeyUpCheck(event: KeyboardEvent) {
    console.log(event);
    if (event.key) {
      let symbol = event.key;
      symbol = symbol.toUpperCase();
      const isSymbolRight = this.checkIsRightSymbol(symbol);
      if (!isSymbolRight) {
        this.showErrorMessage();
        this.isSearchingEnable = false;
        // Prevent deleting two symbols when keyup - Backspace
        if (event.key !== 'Backspace') {
          this.inputValue = this.inputValue.substring(0, this.inputValue.length - 1);
        }
      }
      if (isSymbolRight && this.inputValue.length === 11) {
        this.isSearchingEnable = true;
      }
    }
  }

  checkIsRightSymbol(symbol): boolean {
    this.errorMessage.show = false;
    if (this.inputValue.length === 11) {
      return this.controlSumCounterService.checkControlSum(this.inputValue);
    }
    const symbolCode = symbol.charCodeAt(0);
    if (this.inputValue.length <= 4 && (symbolCode <= 90 && symbolCode >= 65)) {
      return true;
    } else {
      return this.inputValue.length > 4 && (symbolCode <= 57 && symbolCode >= 48);
    }
  }


  showErrorMessage() {
    let errorText: string;
    if (this.inputValue.length <= 4) {
      errorText = 'Введен неверный символ. Введите букву латинского алфавита';
    } else if (this.inputValue.length === 11) {
      errorText = 'Контрольная сумма не совпадает, проверьте правильность введенного номера';
    } else if (this.inputValue.length > 4) {
      errorText = 'Введен неверный символ. Введите цифру';
    }
    this.errorMessage = {show: true, text: errorText};
  }

  search() {
    this.http.getContainerInfo(this.inputValue);
  }

}
