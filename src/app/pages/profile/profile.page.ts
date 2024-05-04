import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public username: string= '';
  public darkMode: boolean = false;
  animal = {
    edadBecerro: 3,
  }

  constructor(private router: Router, private themeService: ThemeService, private http: HttpClient) { }

  ngOnInit() {
    this.printToken();
    this.themeService.isDarkTheme.subscribe((dark) => {
      this.darkMode = dark;
    });

    const token = localStorage.getItem('token');
    if (token) {
      const headers = { 'auth-token': token };
      this.http.get('https://backend-teg.up.railway.app/users/me', { headers }).subscribe(
        (user: any) => {
          this.username = user.name; 
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.themeService.setDarkMode(this.darkMode);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  printToken() {
    const token = localStorage.getItem('token');
    console.log(token);
  }
}