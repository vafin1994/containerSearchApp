import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ControlSumCounterService} from '../services/control-sum-counter.service';

@Component({
  selector: 'app-container-input',
  templateUrl: './container-input.component.html',
  styleUrls: ['./container-input.component.css']
})
export class ContainerInputComponent implements OnInit {
  inputValue: string;
  errorMessage: { show: boolean, text: string } = {show: false, text: ''};
  isSearchingEnable = false;

  constructor(private http: HttpService, private controlSumCounterService: ControlSumCounterService) {
  }

  ngOnInit(): void {
  }

  onInputCheck(event) {
    if (event.data) {
      let symbol = event.data;
      symbol = symbol.toUpperCase();
      if (!this.checkIsRightSymbol(symbol)) {
        console.log('Wrong');
        this.showErrorMessage();
        this.inputValue = this.inputValue.slice(0, -1);
        // TODO delete last typed symbol
      }
      if (this.checkIsRightSymbol(symbol) && this.inputValue.length === 11) {
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
      errorText = 'Введен неверный символ. Введите цифру латинского алфавита';
    }
    this.errorMessage = {show: true, text: errorText};
  }

  search() {
    this.http.getContainerInfo(this.inputValue);
  }

}
