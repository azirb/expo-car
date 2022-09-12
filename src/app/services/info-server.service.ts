import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from "@angular/common/http";
import {Delivery} from "../interfaces/delivery";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class InfoServerService {

  constructor(private req: HttpClient) {}

  public postNewDelivery(info: Delivery): Observable<Delivery> {
    return this.req.post<Delivery>(`${environment.infoServer}/delivery`, Object.assign({id: uuidv4()}, info))
  }

  public getDeliveries(page: number, limit: number = 10): Observable<HttpResponse<Delivery[]>> {
    return this.req.get<any>(`${environment.infoServer}/delivery?_page=${page}&_limit=${limit}`, {observe: 'response'})  }
}
