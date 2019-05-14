import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
    public taskCantBeStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public taskCantBeCancelled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}