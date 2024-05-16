import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/lista-vacas']);
    }
  }

  login() {
    const url = 'https://backend-teg.up.railway.app/users/login';
    const body = {
      email: this.email,
      password: this.password,
    };

    this.http.post(url, body, { responseType: 'text' }).subscribe(
      (data) => {
        console.log('Login successful', data);
        localStorage.setItem('token', data);

        this.router.navigate(['/lista-vacas']);
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
}
