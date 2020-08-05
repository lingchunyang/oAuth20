import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-docktor-view',
  templateUrl: './docktor-view.component.html',
  styleUrls: ['./docktor-view.component.css']
})
export class DocktorViewComponent implements OnInit {
  allPatients;

  selectedPatient;
  userId: string;
  description: string;

  selectedPatientShow;

  protocols;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3030/api/allPatient')
    .subscribe(data => {
      this.allPatients = data;
    });
  }

  onCreateBtnClick(): void {
    this.httpClient.post('http://localhost:3030/api/patientprotocol',
      {
        userId: this.selectedPatient.userId,
        description: this.description
      },
      {
        responseType: 'text',
        withCredentials: true})
        .subscribe( response => {
          console.log(response);
        });
    }

    onShowProtocolClick(): void {
      let params = new HttpParams().set('userId', this.selectedPatientShow.userId);
      let options = {
        withCredentials: true,
        params: params
      }
      this.httpClient.get('http://localhost:3030/api/patientprotocol', options)
      .subscribe(data => {
        console.log(data);
        this.protocols = data;
      })
    }
}
