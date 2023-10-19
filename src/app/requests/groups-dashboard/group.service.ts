import { Injectable } from '@angular/core';
import { ReadService } from 'src/app/services/read.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(public readService: ReadService) { }

  groupTravelNameFn(){
    return [
      {
        cssWrapperClass: 'groupTravelName',
        controlLabel: 'Group Travel Name',
        controlName: 'groupTravelName',
        controlType: 'textarea',
        minRows: 1,
        maxrows:5,
        valueType: 'text',
        placeholder: 'Group Travel Name',
        controlHint: 'Max Length 150',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 150
        }
      }
    ];
  }

  groupTravelArrivalCityAndStartDateFn(){
    return [
      {
        cssWrapperClass: 'groupTravelArrivalCity',
        controlLabel: 'Arrival City',
        controlName: 'groupTravelArrivalCity',
        controlType: 'textarea',
        minRows: 1,
        maxrows:5,
        valueType: 'text',
        placeholder: 'Arrival City',
        controlHint: 'Max Length 150',
        validators: {
          required: true,
          minlength: 3,
          maxlength: 150
        }
      },
      {cssWrapperClass: 'groupRequestEventStartDate',
      controlLabel: 'Dept Date',
      controlName: 'groupRequestEventStartDate',
      controlType: 'date',
      valueType: 'text',
      minDate: new Date(),
      placeholder: 'Events Date',
      validators: {
        required: true,
        maxlength: 10,
        minlength: 10
      }
    },
    ];
  }
  returnFlightConfigFn(startDate?){
    return [
      {
        cssWrapperClass: 'flightFromAirport',
      cssWrapperId: 'returnFlight',
      controlLabel: 'Flying From',
      controlName: 'flightFromAirport',
      controlType: 'select',
      valueType: 'text',
      placeholder: 'Flying From',
      options: this.airportList(),
      validators: {
        required: true
      }
    },  

      {cssWrapperClass: 'flightDeptDate',
        controlLabel: 'Dept Date',
        controlName: 'flightDeptDate',
        controlType: 'date',
        valueType: 'text',
        minDate: new Date(),
        placeholder: 'Departure Date',
        validators: {
          required: true,
          maxlength: 10,
          minlength: 10
        }
      },
      {
        cssWrapperClass: 'flightFromAirport',
      cssWrapperId: 'returnFlight',
      controlLabel: 'Return City',
      controlName: 'flightReturnAirport',
      controlType: 'select',
      valueType: 'text',
      placeholder: 'Return City',
      options: this.airportList(),
      validators: {
        required: true
      }
    }, 
      { cssWrapperClass: 'flightReturnDate',
        controlLabel: 'Return Date',
        controlName: 'flightReturnDate',
        controlType: 'date',
        valueType: 'text',
        minDate: startDate || null,
        placeholder: 'Return Date',
        validators: {
          required: true,
          maxlength: 10,
          minlength: 10
        }
      },
   
      
      
  ];
  }


  async allTravelProfilesFn(
    employeeCollection: string,
    employeeField: string,
    employeeDirection: any

    ){
    return [
      {
        cssWrapperClass: 'addToGroup',
        controlLabel: 'Add to Group',
        controlName: 'addToGroup',
        controlType: 'select',
        valueType: 'text',
        placeholder: 'Add to Group',
        options: await this.readService.travelProfilesFn(
           employeeCollection,
          employeeField,
          employeeDirection),
        validators: {
           maxlength: 100,
           minlength: 5,
           required: true
        }
        },
      
           
            
                
    ];

  }


  airportList(){
    return [
      {
         optionName: 'Abilene, TX (ABI)'
      },
      {
         optionName: 'Akron/Canton, OH (CAK)'
      },
      {
         optionName: 'Alamosa, CO (ALS)'
      },
      {
         optionName: 'Albany, NY (ALB)'
      },
      {
         optionName: 'Allentown, PA (ABE)'
      },
      {
         optionName: 'Altoona, PA (AOO)'
      },
      {
         optionName: 'Amarillo, TX (AMA)'
      },
      {
         optionName: 'Appleton, WI (ATW)'
      },
      {
         optionName: 'Arcata, CA (ACV)'
      },
      {
         optionName: 'Ashland, KY / Huntington'
      },
      {
         optionName: 'Aspen, CO (ASE)'
      },
      {
         optionName: 'Athens, GA (AHN)'
      },
      {
         optionName: 'Atlanta, GA (ATL)'
      },
      {
         optionName: 'Atlantic City, NJ (AIY)'
      },
      {
         optionName: 'Augusta, GA (AGS)'
      },
      {
         optionName: 'Austin, TX (AUS)'
      },
      {
         optionName: 'Bakersfield, CA (BFL)'
      },
      {
         optionName: 'Baltimore, MD (BWI)'
      },
      {
         optionName: 'Beaumont/PortArthur, TX (BPT)'
      },
      {
         optionName: 'Beckley, WV (BKW)'
      },
      {
         optionName: 'Bethlehem, PA (ABE)'
      },
      {
         optionName: 'Binghamton, NY (BGM)'
      },
      {
         optionName: 'Bluefield, WV (BLF)'
      },
      {
         optionName: 'Boulder, CO-Municipal Airport (WBU)'
      },
      {
         optionName: 'Bowling Green, KY (BWG)'
      },
      {
         optionName: 'Bradford, PA (BFD)'
      },
      {
         optionName: 'Brawnwood, TX (BWD)'
      },
      {
         optionName: 'Bristol, VA (TRI)'
      },
      {
         optionName: 'Brownsville, TX (BRO)'
      },
      {
         optionName: 'Brunswick, GA (BQK)'
      },
      {
         optionName: 'Buffalo, NY (BUF)'
      },
      {
         optionName: 'Bullhead City/Laughlin, AZ (IFP)'
      },
      {
         optionName: 'Burbank, CA (BUR)'
      },
      {
         optionName: 'Burlington, IA (BRL)'
      },
      {
         optionName: 'Canton/Akron, OH (CAK)'
      },
      {
         optionName: 'Carlsbad, CA (CLD)'
      },
      {
         optionName: 'Carmel, CA (MRY)'
      },
      {
         optionName: 'CedarCity, UT (CDC)'
      },
      {
         optionName: 'CedarRapids, IA (CID)'
      },
      {
         optionName: 'Charleston, WV (CRW)'
      },
      {
         optionName: 'Charlottesville, VA (CHO)'
      },
      {
         optionName: 'Chattanooga, TN (CHA)'
      },
      {
         optionName: 'Chico, CA (CIC)'
      },
      {
         optionName: 'Cincinnati, OH (CVG)'
      },
      {
         optionName: 'Clarksburg, WV (CKB)'
      },
      {
         optionName: 'Clearwater/StPetersburg, FL (PIE)'
      },
      {
         optionName: 'Cleveland, OH (CLE)'
      },
      {
         optionName: 'College Station, TX (CLL)'
      },
      {
         optionName: 'Colorado Springs, CO (COS)'
      },
      {
         optionName: 'Columbus, GA (CSG)'
      },
      {
         optionName: 'Columbus, OH (CMH)'
      },
      {
         optionName: 'Concord, CA (CCR)'
      },
      {
         optionName: 'Cortez, CO (CEZ)'
      },
      {
         optionName: 'Crescent City, CA (CEC)'
      },
      {
         optionName: 'Cumberland, MD (CBE)'
      },
      {
         optionName: 'Dallas/Fort Worth, TX (DFW)'
      },
      {
         optionName: 'Dayton, OH (DAY)'
      },
      {
         optionName: 'Daytona Beach, FL (DAB)'
      },
      {
         optionName: 'Denver, CO-International (DEN)'
      },
      {
         optionName: 'Des Moines, IA (DSM)'
      },
      {
         optionName: 'Dubois, PA (DUJ)'
      },
      {
         optionName: 'Dubuque, IA (DBQ)'
      },
      {
         optionName: 'Durango, CO (DRO)'
      },
      {
         optionName: 'Easton, PA (ABE)'
      },
      {
         optionName: 'Eau Claire, WI (EAU)'
      },
      {
         optionName: 'El Centro, CA (IPL)'
      },
      {
         optionName: 'El Paso, TX (ELP)'
      },
      {
         optionName: 'Elko, NV (EKO)'
      },
      {
         optionName: 'Elmira, NY (ELM)'
      },
      {
         optionName: 'Endicott, NY (BGM)'
      },
      {
         optionName: 'Erie, PA (ERI)'
      },
      {
         optionName: 'Eureka/Arcata, CA (ACV)'
      },
      {
         optionName: 'Eureka, NV (EUE)'
      },
      {
         optionName: 'Evansville, IN (EVV)'
      },
      {
         optionName: 'Flagstaff, AZ (FLG)'
      },
      {
         optionName: 'Fort Collins/Loveland, CO-Municipal Airport (FNL)'
      },
      {
         optionName: 'Fort Dodge, IA (FOD)'
      },
      {
         optionName: 'Fort Lauderdale, FL (FLL)'
      },
      {
         optionName: 'Fort Myers, FL (RSW)'
      },
      {
         optionName: 'Fort Walton Beach, FL (VPS)'
      },
      {
         optionName: 'Fort Wayne, IN (FWA)'
      },
      {
         optionName: 'Franklin, PA (FKL)'
      },
      {
         optionName: 'Fresno, CA (FAT)'
      },
      {
         optionName: 'Gainesville, FL (GNV)'
      },
      {
         optionName: 'Gary, IN (GYY)'
      },
      {
         optionName: 'Gladewater/Kilgore, TX (GGG)'
      },
      {
         optionName: 'Grand Canyon, AZ-National Park (GCN)'
      },
      {
         optionName: 'Grand Junction, CO (GJT)'
      },
      {
         optionName: 'Green Bay, WI (GRB)'
      },
      {
         optionName: 'Gunnison, CO (GUC)'
      },
      {
         optionName: 'Hagerstown, MD (HGR)'
      },
      {
         optionName: 'Hampton, VA (PHF)'
      },
      {
         optionName: 'Harlingen, TX (HRL)'
      },
      {
         optionName: 'Harrisburg, PA (MDT)'
      },
      {
         optionName: 'Havasupai, AZ (HAE)'
      },
      {
         optionName: 'Hayden, CO (HDN)'
      },
      {
         optionName: 'Houston, TX-All airports (HOU)'
      },
      {
         optionName: 'Houston, TX-Hobby (HOU)'
      },
      {
         optionName: 'Houston, TX-Intercontinental (IAH)'
      },
      {
         optionName: 'Huntington, WV/Ashland'
      },
      {
         optionName: 'Imperial, CA (IPL)'
      },
      {
         optionName: 'Indianapolis, IN (IND)'
      },
      {
         optionName: 'Inyokern, CA (IYK)'
      },
      {
         optionName: 'Iron Mountain, MI (IMT)'
      },
      {
         optionName: 'Islip, NY (ISP)'
      },
      {
         optionName: 'Ithaca, NY (ITH)'
      },
      {
         optionName: 'Jackson, TN (MKL)'
      },
      {
         optionName: 'Jacksonville, FL (JAX)'
      },
      {
         optionName: 'Jamestown, NY (JHW)'
      },
      {
         optionName: 'Janesville, WI (JVL)'
      },
      {
         optionName: 'Johnson City, NY (BGM)'
      },
      {
         optionName: 'Johnson City, TN (TRI)'
      },
      {
         optionName: 'Johnstown, PA (JST)'
      },
      {
         optionName: 'KeyWest, FL (EYW)'
      },
      {
         optionName: 'Kilgore/Gladewater, TX (GGG)'
      },
      {
         optionName: 'Killeen, TX (ILE)'
      },
      {
         optionName: 'Kingman, AZ (IGM)'
      },
      {
         optionName: 'Kingsport, TN (TRI)'
      },
      {
         optionName: 'Knoxville, TN (TYS)'
      },
      {
         optionName: 'La Crosse, WI (LSE)'
      },
      {
         optionName: 'Lafayette, IN (LAF)'
      },
      {
         optionName: 'Lake Havasu City, AZ (HII)'
      },
      {
         optionName: 'Lancaster, PA (LNS)'
      },
      {
         optionName: 'Laredo, TX (LRD)'
      },
      {
         optionName: 'Las Vegas, NV (LAS)'
      },
      {
         optionName: 'Latrobe, PA (LBE)'
      },
      {
         optionName: 'Lewisburg, WV (LWB)'
      },
      {
         optionName: 'Lexington, KY (LEX)'
      },
      {
         optionName: 'Long Beach, CA (LGB)'
      },
      {
         optionName: 'Longview, TX (GGG)'
      },
      {
         optionName: 'Los Angeles, CA (LAX)'
      },
      {
         optionName: 'Louisville, KY (SDF)'
      },
      {
         optionName: 'Loveland/Fort Collins, CO-Municipal Airport (FNL)'
      },
      {
         optionName: 'Loveland/Fort Collins, CO-Busservice (QWF)'
      },
      {
         optionName: 'Lubbock, TX (LBB)'
      },
      {
         optionName: 'Macon, GA (MCN)'
      },
      {
         optionName: 'Madison, WI (MSN)'
      },
      {
         optionName: 'Marietta, OH/Parkersburg'
      },
      {
         optionName: 'Martinsburg, PA (AOO)'
      },
      {
         optionName: 'Mason City, IA (MCW)'
      },
      {
         optionName: 'Massena, NY (MSS)'
      },
      {
         optionName: 'Mcallen, TX (MFE)'
      },
      {
         optionName: 'Melbourne, FL (MLB)'
      },
      {
         optionName: 'Memphis, TN (MEM)'
      },
      {
         optionName: 'Merced, CA (MCE)'
      },
      {
         optionName: 'Miami, FL-International (MIA)'
      },
      {
         optionName: 'Midland/Odessa, TX (MAF)'
      },
      {
         optionName: 'Milwaukee, WI (MKE)'
      },
      {
         optionName: 'Mission, TX (MFE)'
      },
      {
         optionName: 'Moab, UT (CNY)'
      },
      {
         optionName: 'Modesto, CA (MOD)'
      },
      {
         optionName: 'Monterey, CA (MRY)'
      },
      {
         optionName: 'Montrose, CO (MTJ)'
      },
      {
         optionName: 'Morgantown, WV (MGW)'
      },
      {
         optionName: 'Naples, FL (APF)'
      },
      {
         optionName: 'Nashville, TN (BNA)'
      },
      {
         optionName: 'New Orleans, LA (MSY-Louis Armstrong New Orleans Intl.)'
      },
      {
         optionName: 'New York, NY-All airports (NYC)'
      },
      {
         optionName: 'New York, NY-Kennedy (JFK)'
      },
      {
         optionName: 'New York, NY-La Guardia (LGA)'
      },
      {
         optionName: 'Newark, NJ (EWR)'
      },
      {
         optionName: 'Newburgh/Stewart Field, NY (SWF)'
      },
      {
         optionName: 'Newport News, VA (PHF)'
      },
      {
         optionName: 'Norfolk, VA (ORF)'
      },
      {
         optionName: 'Oakland, CA (OAK)'
      },
      {
         optionName: 'Odessa/Midland, TX (MAF)'
      },
      {
         optionName: 'Ogdensburg, NY (OGS)'
      },
      {
         optionName: 'Ontario, CA (ONT)'
      },
      {
         optionName: 'Orange County, CA (SNA)'
      },
      {
         optionName: 'Orlando, FL-Herndon (ORL)'
      },
      {
         optionName: 'Orlando, FL-International (MCO)'
      },
      {
         optionName: 'Oshkosh, WI (OSH)'
      },
      {
         optionName: 'Ottumwa, IA (OTM)'
      },
      {
         optionName: 'Owensboro, KY (OWB)'
      },
      {
         optionName: 'Oxnard/Ventura, CA (OXR)'
      },
      {
         optionName: 'Paducah, KY (PAH)'
      },
      {
         optionName: 'Page, AZ (PGA)'
      },
      {
         optionName: 'Palm Springs, CA (PSP)'
      },
      {
         optionName: 'Panama City, FL (PFN)'
      },
      {
         optionName: 'Parkersburg, WV/Marietta'
      },
      {
         optionName: 'Pensacola, FL (PNS)'
      },
      {
         optionName: 'Philadelphia, PA-International (PHL)'
      },
      {
         optionName: 'Philadelphia, PA-Trenton/Mercer NJ (TTN)'
      },
      {
         optionName: 'Phoenix, AZ (PHX)'
      },
      {
         optionName: 'Pittsburgh, PA (PIT)'
      },
      {
         optionName: 'Plattsburgh, NY (PLB)'
      },
      {
         optionName: 'Port Arthur/Beaumont, TX (BPT)'
      },
      {
        optionName: 'Portland, OR (PDX)'
     },
      {
         optionName: 'Poughkeepsie, NY (POU)'
      },
      {
         optionName: 'Prescott, AZ (PRC)'
      },
      {
         optionName: 'Princeton, WV (BLF)'
      },
      {
         optionName: 'Pueblo, CO (PUB)'
      },
      {
         optionName: 'Reading, PA (RDG)'
      },
      {
         optionName: 'Redding, CA (RDD)'
      },
      {
         optionName: 'Reno, NV (RNO)'
      },
      {
         optionName: 'Rhinelander, WI'
      },
      {
         optionName: 'Richmond, VA (RIC)'
      },
      {
         optionName: 'Roanoke, VA (ROA)'
      },
      {
         optionName: 'Rochester, NY (ROC)'
      },
      {
         optionName: 'Sacramento, CA (SMF)'
      },
      {
         optionName: 'Saint George, UT (SGU)'
      },
      {
         optionName: 'Salisbury-Ocean City, MD (SBY)'
      },
      {
         optionName: 'Salt Lake City, UT (SLC)'
      },
      {
         optionName: 'SanAngelo, TX (SJT)'
      },
      {
         optionName: 'San Antonio, TX (SAT)'
      },
      {
         optionName: 'San Diego, CA (SAN)'
      },
      {
         optionName: 'San Francisco, CA (SFO)'
      },
      {
         optionName: 'San Jose, CA (SJC)'
      },
      {
         optionName: 'San Luis Obispo, CA (SBP)'
      },
      {
         optionName: 'Santa Ana, CA (SNA)'
      },
      {
         optionName: 'Santa Barbara, CA (SBA)'
      },
      {
         optionName: 'Santa Maria, CA (SMX)'
      },
      {
         optionName: 'Santa Rosa, CA (STS)'
      },
      {
         optionName: 'Saranac Lake, NY (SLK)'
      },
      {
         optionName: 'Sarasota, FL (SRQ)'
      },
      {
         optionName: 'Savannah, GA (SAV)'
      },
      {
         optionName: 'Scottsdale, AZ (SDL)'
      },
      {
         optionName: 'Scranton, PA (AVP)'
      },
      {
         optionName: 'Sioux City, IA (SUX)'
      },
      {
         optionName: 'South Bend, IN (SBN)'
      },
      {
         optionName: 'St Petersburg/Clearwater, FL (PIE)'
      },
      {
         optionName: 'State College/University Park, PA (SCE)'
      },
      {
         optionName: 'Staunton, VA (SHD)'
      },
      {
         optionName: 'Steamboat Springs, CO (SBS)'
      },
      {
         optionName: 'Stevens Point/Wausau, WI (CWA)'
      },
      {
         optionName: 'Stewart Field/Newburgh, NY (SWF)'
      },
      {
         optionName: 'Stockton, CA (SCK)'
      },
      {
         optionName: 'Syracuse, NY (SYR)'
      },
      {
         optionName: 'Tallahassee, FL (TLH)'
      },
      {
         optionName: 'Tampa, FL (TPA)'
      },
      {
         optionName: 'Telluride, CO (TEX)'
      },
      {
         optionName: 'Terre Haute, IN (HUF)'
      },
      {
         optionName: 'Toledo, OH (TOL)'
      },
      {
         optionName: 'Trenton/Mercer, NJ (TTN)'
      },
      {
         optionName: 'Tucson, AZ (TUS)'
      },
      {
         optionName: 'Tyler, TX (TYR)'
      },
      {
         optionName: 'Utica, NY (UCA)'
      },
      {
         optionName: 'Vail, CO-Eagle County Airport (EGE)'
      },
      {
         optionName: 'Vancouver International Airport, BC, CA (YVR)'
      },
      {
         optionName: 'Valdosta, GA (VLD)'
      },
      {
         optionName: 'Valparaiso, FL (VPS)'
      },
      {
         optionName: 'Ventura/Oxnard, CA (OXR)'
      },
      {
         optionName: 'Vernal, UT (VEL)'
      },
      {
         optionName: 'Victoria, TX (VCT)'
      },
      {
         optionName: 'Visalia, CA (VIS)'
      },
      {
         optionName: 'Waco, TX (ACT)'
      },
      {
         optionName: 'Washington DC-All airports (WAS), '
      },
      {
         optionName: 'Washington DC-Dulles (IAD), '
      },
      {
         optionName: 'Washington DC-National (DCA), '
      },
      {
         optionName: 'Waterloo, IA (ALO)'
      },
      {
         optionName: 'Watertown, NY (ART)'
      },
      {
         optionName: 'Wausau/Stevens Point, WI (CWA)'
      },
      {
         optionName: 'West Palm Beach, FL (PBI)'
      },
      {
         optionName: 'Westchester County, NY (HPN)'
      },
      {
         optionName: 'Wichita Falls, TX (SPS)'
      },
      {
         optionName: 'Wilkes Barre, PA (AVP)'
      },
      {
         optionName: 'Williamsburg, VA (PHF)'
      },
      {
         optionName: 'Williamsport, PA (IPT)'
      },
       {
         optionName: 'Youngstown, OH (YNG)'
      }
   ];
  }
}
