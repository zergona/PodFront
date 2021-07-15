import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  request = null
  id = null
  baseURL="http://localhost:8080/"
  requestForm = this.formBuilder.group({
    ssn: '',
    diagnosis: ''
  });

  constructor(private router: Router, private http: HttpClient, 
    private route: ActivatedRoute, private formBuilder: FormBuilder) { }


  async fetchData(id){
    this.http
      .get<any>('http://localhost:8080/request/' + id)
      .subscribe((result) => {
        console.log(result);
        this.request = result;
      });
      
  }
  handleSubmit() {
    const headers = { 'content-type': 'application/json'}  
    this.requestForm.value.ssn = this.request.patient.ssn;
    const body=JSON.stringify(this.requestForm.value);
    console.log(body)
    return this.http.post<Request>(this.baseURL + 'request/finish/' + this.id, body,{'headers':headers}).subscribe(result => { 
      this.router.navigate(['patients']);
    }, error => console.error(error));
    
  }
  ngOnInit(): void {
   this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.fetchData(this.id);
  }

}
