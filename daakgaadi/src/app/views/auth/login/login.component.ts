import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:'',
      email: '',
      password: '',
    });
  }


  submit(): void {
    let user = this.form.getRawValue();
  
    if (user.email === '' || user.password === '') {
      alert('Please enter all the fields');
    } else {
      this.http.post('https://logistwork.onrender.com/api/login', this.form.getRawValue(), {
        withCredentials: true,
      }).subscribe(
        (res) => {
          alert("Succesfully LogedIn")
          if (user.email === 'admin@admin.com') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['profile']);
          }
        },
        (error) => {
          console.error('Error saving todo:', error); // Log the error to the console
          alert(error);
        }
      );
    }
  }
  
  
}
 //https://logistwork.onrender.com
     