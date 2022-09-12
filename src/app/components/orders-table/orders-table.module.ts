import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersTableComponent} from "./orders-table.component";
import {CustomerRoutingModule} from "./orders-table-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [OrdersTableComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class OrdersTableModule { }
