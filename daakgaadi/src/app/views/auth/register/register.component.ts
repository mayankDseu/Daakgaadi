import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }

   ValidateEmail = (email: any) => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {  
  
      return true;
  
    } else {
  
      return false;
  
    }
  
  }
  submit(): void {
    let user = this.form.getRawValue();
  
    if (user.name === '' || user.email === '' || user.password === '') {
      alert('Please enter all the fields');}
    else {
      this.http
        .post('https://logistwork.onrender.com/api/register', this.form.getRawValue(), {
          withCredentials: true,
        })
        .subscribe(
          () => {
            alert("Registered Successfully")
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error during registration:', error);
            alert(error.error.message); // Display the error message in an alert
          }
        );
    }
  }
  
}