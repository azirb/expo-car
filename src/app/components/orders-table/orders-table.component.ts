import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {InfoServerService} from "../../services/info-server.service";
import {
  BehaviorSubject,
  map,
  Subject,
  switchMap,
  take,
  takeUntil
} from "rxjs";
import {Delivery} from "../../interfaces/delivery";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit, OnDestroy {

  public tableData: Delivery[] = [];
  public limit: number = 2;
  public totalCount: number = 0;

  public page$: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>({pageIndex: 0, pageSize: 2, previousPageIndex: 0, length: 2});
  public displayedColumns: string[] = ['dateTime', 'vin', 'otherInfo'];

  private destroy$: Subject<any> = new Subject<any>();
  private pageCount: number = 0;

  constructor(private infoServer: InfoServerService) {
  }

  ngOnInit(): void {
    this.page$.pipe(
      takeUntil(this.destroy$),
      switchMap(page => this.infoServer.getDeliveries(++page.pageIndex, page.pageSize)
        .pipe(
          take(1),
          map(value => {
            // @ts-ignore
            this.pageCount = +value.headers.get("Link")
              ?.split(',')[2]?.split('page=')[1][0];
            this.totalCount = this.pageCount * page.pageSize;
            return value.body ? value.body : [];
          })
        ))
    )
      .subscribe((value: Delivery[]) => {
        this.tableData = value;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
