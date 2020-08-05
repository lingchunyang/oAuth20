import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../services/base.url";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  onLoginClick(): void {
    this.httpClient.get(BASE_URL + '/auth/login').subscribe((response: any) => {
      window.location.href = response.redirectUrl;
    });
  }
}
