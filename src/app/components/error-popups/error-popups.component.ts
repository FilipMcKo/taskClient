import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SimpleModalService } from 'ngx-simple-modal';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { InfoPopupComponent } from '../info-popup/info-popup.component';

@Component({
  selector: 'app-error-popups',
  templateUrl: './error-popups.component.html',
  styleUrls: ['./error-popups.component.css']
})
export class ErrorPopupsComponent implements OnInit {
  private subscriptionOfErrors: Subscription;

  constructor(private simpleModalService: SimpleModalService, private errorHandlerService: ErrorHandlerService) { }  

  ngOnInit() {
    this.subscriptionOfErrors = this.errorHandlerService.getObservableOfErrors().subscribe(
      data => {
        this.errorOccuredInfo(data);
      }
    )
  }

  errorOccuredInfo(error: any) {
    this.simpleModalService.addModal(InfoPopupComponent, {
      message: 'Error occured: ' + JSON.stringify(error.error)
    }).subscribe();
  }


  ngOnDestroy() {
    this.subscriptionOfErrors.unsubscribe();
  }
}
