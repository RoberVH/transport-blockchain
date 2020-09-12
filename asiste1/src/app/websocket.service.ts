import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class WebsocketService {
  ws: WebSocket;

  creaWSocket(url:string):Observable<string>{
      this.ws = new WebSocket(url);  
      return new Observable(observer => {
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => observer.complete();

    });
  }
}
