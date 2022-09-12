import {OrdersTableComponent} from "./orders-table.component";
import {
  RouterModule,
  Routes
} from "@angular/router";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    path: '',
    component: OrdersTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
