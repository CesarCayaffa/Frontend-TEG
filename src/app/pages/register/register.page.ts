import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    console.log('Register page');
  }

  register() {
    const url = 'https://backend-teg.up.railway.app/users/register';
    const body = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.http.post(url, body).subscribe(
      (data: any) => {
        console.log('Registration successful', data);

        this.toastController
          .create({
            message: 'Registration successful',
            duration: 2000,
          })
          .then((toast) => toast.present());

        this.router.navigate(['/home']);
      },
      (error) => {
        this.toastController
          .create({
            message: 'Error: ' + error.error,
            duration: 2000,
          })
          .then((toast) => toast.present());
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['home']);
  }
}
