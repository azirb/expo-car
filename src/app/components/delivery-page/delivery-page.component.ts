import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {DeliveryService} from "../../services/delivery-service.service";
import {InfoServerService} from "../../services/info-server.service";
import {
  map,
  Observable,
  Subject,
  take,
  takeUntil
} from "rxjs";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';


@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class DeliveryPageComponent implements OnInit, OnDestroy {

  public deliveryFormGroup: FormGroup = new FormGroup<any>({
    "vin": new FormControl('', [Validators.required]),
    "firstName": new FormControl('', [Validators.required]),
    "middleName": new FormControl('', [Validators.required]),
    "lastName": new FormControl('', [Validators.required]),
    "phone": new FormControl('', [Validators.required, Validators.pattern(/^[+](?:[0-9]●?){6,14}[0-9]$/)]),
    "address": new FormControl('', [Validators.required]),
    "date": new FormControl(new Date(), [Validators.required]),
    "time": new FormControl('', [Validators.required]),
  })
  public vinArray$: Observable<string[]>;
  public timeArray$: Observable<string[]>;
  public isLoading: boolean = true;
  public showEndScript: boolean = false;

  private destroy$: Subject<any> = new Subject<any>();

  constructor(private delivery: DeliveryService,
              private infoService: InfoServerService) {
  }

  ngOnInit(): void {
    this.getDeliveryTime(this.formatDateString(new Date()));
    this.vinArray$ = this.delivery.getVinNumbers()
      .pipe(
        take(1),
        map(value => {
          this.isLoading = false;
          return value
        }));
    this.deliveryFormGroup.controls['date'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isLoading = true;
        this.getDeliveryTime(this.formatDateString(new Date(value)));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public saveDeliveryRequest() {
    this.isLoading = true;
    this.infoService.postNewDelivery(this.deliveryFormGroup.value)
      .pipe(take(1))
      .subscribe(() => {
        this.isLoading = false;
        this.showEndScript = true;
      });
  }

  private getDeliveryTime(date: string): void {
    this.timeArray$ = this.delivery.getDeliveryTime(date)
      .pipe(
        takeUntil(this.destroy$),
        map(value => {
          this.isLoading = false;
          return value
        }));
  }

  private formatDateString(deliveryDate: Date): string {
    const month = deliveryDate.getMonth() + 1 > 10 ? deliveryDate.getMonth() + 1 : '0' + (deliveryDate.getMonth() + 1);
    const day = +deliveryDate.getDate() > 10 ? deliveryDate.getDate() : '0' + deliveryDate.getDate();
    return deliveryDate.getFullYear() + '-' + month + '-' + day;
  }
}
