import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContainerInfo} from '../containerInfo.interface';
import {Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  containerInfo: ContainerInfo;
  url = 'http://www.mocky.io/v2/5ddbad8a3400005200eadd4a?numer=';

  constructor(private http: HttpClient) {
  }

  getContainerInfo(containerNumber: string) {
    return this.http.get(this.url + containerNumber).subscribe(
      (response: ContainerInfo) => {
        this.containerInfo = response;
      });
  }
}
