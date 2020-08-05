import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./base.url";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PatientService {
  constructor(private httpClient: HttpClient) {
  }


  patientProtocol(): Observable<any> {
    return this.httpClient.post(BASE_URL+'/api/patientprotocol',
      {},
      {
        withCredentials: true})
  }
}
