import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-container-info',
  templateUrl: './container-info.component.html',
  styleUrls: ['./container-info.component.css']
})
export class ContainerInfoComponent implements OnInit {

  constructor(public http: HttpService) { }

  ngOnInit(): void {
  }

}
