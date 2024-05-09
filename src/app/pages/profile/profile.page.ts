import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public username: string= '';
  isDarkTheme: Observable<boolean>;
  darkMode: boolean = false;
  animal = {
    edadBecerro: 3,
  }

  constructor(private router: Router, private themeService: ThemeService, private http: HttpClient) { 
    this.isDarkTheme = this.themeService.isDarkTheme;
   }

  ngOnInit() {
    this.printToken();
    // this.themeService.isDarkTheme.subscribe((dark) => {
    //   this.darkMode = dark;
    // });

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

  toggleDarkTheme(event: Event) {
    const target = event.target as HTMLInputElement;
    this.themeService.setDarkMode(target.checked);
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