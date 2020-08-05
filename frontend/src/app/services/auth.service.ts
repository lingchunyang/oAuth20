import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./base.url";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  isLoggedIn() : Observable<boolean> {
    return this.httpClient.get<boolean>(BASE_URL+ '/auth/isLoggedIn', {withCredentials: true});
  }
}
