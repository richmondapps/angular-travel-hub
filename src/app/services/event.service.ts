import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private childClickedEvent = new BehaviorSubject<string>('');

  constructor() { }
  emitChildEvent(msg: string){
    console.log('EVS', msg)
    this.childClickedEvent.next(msg)
 }

 childEventListner(){
    return this.childClickedEvent.asObservable();
  } 
}
