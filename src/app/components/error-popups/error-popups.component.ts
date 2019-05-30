import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SimpleModalService } from 'ngx-simple-modal';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { InfoPopupComponent } from '../info-popup/info-popup.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-error-popups',
  templateUrl: './error-popups.component.html',
  styleUrls: ['./error-popups.component.css']
})
export class ErrorPopupsComponent implements OnInit {
  private subscriptionOfErrors: Subscription;
  private errorMessage: string = "No message";

  constructor(private simpleModalService: SimpleModalService, private errorHandlerService: ErrorHandlerService, private httpService: HttpService) { }

  ngOnInit() {
    this.subscriptionOfErrors = this.errorHandlerService.getObservableOfErrors().subscribe(
      data => {
        this.getErrorMessage(data);
      }
    )
  }

  private getErrorMessage(error: any) {

    if (error.error['errors']) {
      this.errorMessage = error.error['errors'][0]['defaultMessage'] + '.';
    }
    else {
      this.errorMessage = error.error['message'] + " Please click refresh." ;
    }
    this.showErrorPopup();
  }

  private showErrorPopup() {
    this.simpleModalService.addModal(InfoPopupComponent, {
      message: 'Error occured: ' + this.errorMessage
    }).subscribe();
  }

  ngOnDestroy() {
    this.subscriptionOfErrors.unsubscribe();
  }
}
