import { Injectable } from '@angular/core';
import { Timestamp } from "firebase/firestore"
@Injectable({
  providedIn: 'root'
})
export class DateAndTimeService {
  convertDate(firebaseObject: any) {
    if (!firebaseObject) return null;
    for (const [key, value] of Object.entries(firebaseObject)) {
     // console.log(`Key: ${key} Value: ${value}`);
      // covert items inside array
      if (value && Array.isArray(value) )
        firebaseObject[key] = value.map(item => this.convertDate(item));
      // convert inner objects
      if (value && typeof value === 'object' ){
        firebaseObject[key] = this.convertDate(value);
      }
      if(value instanceof Timestamp){
        firebaseObject[key] = firebaseObject[key].toDate();
      }
    }
    return firebaseObject;
  }

  offsetTimezoneDateFn(date) {
    console.log('INCOMING DATE', date);

    const xDate = new Date(date);
    console.log('xDate', xDate);
    console.log('INCOMING DATE', xDate.getTime());


    const xOffset = xDate.setMinutes(xDate.getMinutes() + xDate.getTimezoneOffset());
    console.log('xDate Offset', xDate);
    console.log('xOffset', xOffset);
    console.log('TZ OFF', xDate.getTimezoneOffset());
    console.log('xDate.getMinutes', xDate.getMinutes() + xDate.getTimezoneOffset());


    const offset = new Date().getTimezoneOffset();
    console.log('OFFSET', offset);
    const created = date;
    const adjustedDateTimezone = created.setMinutes(created.getMinutes() + offset);
    console.log('Adjusted Date Timezone', adjustedDateTimezone);
    const newDate = new Date(adjustedDateTimezone);
    console.log('CREATED DATE', newDate);
    return newDate;
  }
  
  returnExtractedDatesFn(type: any, startDate: any,  endDate?: any, ) {
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    const d = {
      startDateFull: `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`,
      startDateDD: startDate.getDate(),
      startDateMM: startDate.getMonth() + 1,
      startDateYYYY: startDate.getFullYear(),
      [`${type}StartDateDD`]: startDate.getDate(),
      [`${type}StartDateMM`]: startDate.getMonth() + 1,
      [`${type}StartDateYYYY`]: startDate.getFullYear(),
      [`${type}EndDateDD`]: endDate?.getDate() || null,
      [`${type}EndDateMM`]: endDate?.getMonth() + 1 || null,
      [`${type}EndDateYYYY`]: endDate?.getFullYear() || null,
    };
    console.log('D', d);

    return d;
  }

}
