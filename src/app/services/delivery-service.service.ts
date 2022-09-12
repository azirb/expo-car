import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  from,
  Observable
} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private req: HttpClient) {
  }

  public getVinNumbers(): Observable<any> {
    return this.req.get<string[]>(`${environment.requestsServer}/Car`);
  }

  public getDeliveryTime(date: string): Observable<string[]> {
    return this.req.get<string[]>(`${environment.requestsServer}/Time/${date}`);
  }
}
