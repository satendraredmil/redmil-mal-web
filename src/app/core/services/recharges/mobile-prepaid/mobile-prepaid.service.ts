import { Injectable } from '@angular/core';
import { Recharges } from '../../../models/classes/recharges/MobileRecharge';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIEndPoint } from '../../../constants/constant';
import { ChecksumService } from '../../checksum/checksum.service';
import { Observable } from 'rxjs';
import { BaseModel_2 } from '../../../models/classes/BaseModel';

 // Set headers (adjust content-type based on your API)
 const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class MobilePrepaidService {



// BaseModel_21 = new BaseModel_2();



  constructor(
    private http: HttpClient, 
    private checksumService: ChecksumService,
  ) { }

  // Function to call the API with checksum and userSendOTP
  MyPayStoreGetCircle( MyPayStoreGetCircleData: Recharges):Observable<any> {
    debugger
    MyPayStoreGetCircleData.Userid  = sessionStorage.getItem('Userid')?.toString();
    MyPayStoreGetCircleData.UserLoginIDfortoken  = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
    MyPayStoreGetCircleData.UserLogintoken  = sessionStorage.getItem('UserLogintoken')?.toString();
    
    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString('MyPayStore', 
      this.checksumService.checksumKey,
      MyPayStoreGetCircleData.Userid || 'NA', 
      MyPayStoreGetCircleData.MobileNo || 'NA'
     );
     MyPayStoreGetCircleData.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post(APIEndPoint.Rechargesapi.MyPayStoreGetCircle, MyPayStoreGetCircleData, { headers });
  }

   // Function to call the API with checksum and userSendOTP
   GetOperaterList(BaseModel_21:Recharges):Observable<any> {
    debugger
    BaseModel_21.Userid  = sessionStorage.getItem('Userid')?.toString();
    BaseModel_21.ServiceId  = "21";

    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString('GetOperaterList', 
      this.checksumService.checksumKey,
      BaseModel_21.Userid || 'NA', 
      BaseModel_21.ServiceId
     );
     BaseModel_21.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post(APIEndPoint.Rechargesapi.GetOperaterList, BaseModel_21, { headers });
  }

   // Function to call the API with checksum and userSendOTP
   GetCircleList(GetCircleListData:Recharges):Observable<any> {
    debugger
    GetCircleListData.Userid  = sessionStorage.getItem('Userid')?.toString();


    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString('GetCircleList', 
      this.checksumService.checksumKey,
      GetCircleListData.Userid || 'NA', 
     );
     GetCircleListData.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post(APIEndPoint.Rechargesapi.GetCircleList, GetCircleListData, { headers });
  }

  // Function to call the API with checksum and userSendOTP
  MyPayStoreBrowsPlans( MyPayStoreBrowsPlansData: Recharges):Observable<any> {
    debugger
    MyPayStoreBrowsPlansData.Userid  = sessionStorage.getItem('Userid')?.toString();

    
    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString('MyPayStoreBrowsPlan', 
      this.checksumService.checksumKey,
      MyPayStoreBrowsPlansData.Userid || 'NA',
      MyPayStoreBrowsPlansData.Circle ,
      MyPayStoreBrowsPlansData.OpId

     );
     MyPayStoreBrowsPlansData.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post(APIEndPoint.Rechargesapi.MyPayStoreBrowsPlan, MyPayStoreBrowsPlansData, { headers });
  }

}
