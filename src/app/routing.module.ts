import {
  RouterModule,
  Routes
} from "@angular/router";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/delivery-page/delivery.module').then(m => m.DeliveryModule)
  },
  {
    path: 'table',
    loadChildren: () => import('./components/orders-table/orders-table.module').then(m => m.OrdersTableModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
