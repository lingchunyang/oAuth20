import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-doktor-view',
  templateUrl: './doktor-view.component.html',
  styleUrls: ['./doktor-view.component.css']
})
export class DoktorViewComponent implements OnInit {
  allPatients;

  selectedPatient;
  userId: string;
  description: string;

  selectedPatientShow;

  protocols;

  constructor(private httpClient: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3030/api/allPatient')
    .subscribe(data => {
      this.allPatients = data;
    });
  }

  onCreateBtnClick(): void {
    console.log(this.description);
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
          this.dialog.open(DialogComponent);
          this.description = '';
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
