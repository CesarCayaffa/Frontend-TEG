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
    edadBecerro: 0,
  }
  nuevaEdadBecerro: number = 0;

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
          this.animal.edadBecerro = user.edadBecerro;
          this.nuevaEdadBecerro = this.animal.edadBecerro;
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

  actualizarEdadBecerro(nuevaEdadBecerro: number) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { 'auth-token': token };
      this.http.patch('https://backend-teg.up.railway.app/users/updateEdadBecerro', { nuevaEdadBecerro }, { headers }).subscribe(
        (user: any) => {
          this.animal.edadBecerro = nuevaEdadBecerro;
          this.toggleEditEdadBecerro();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  showEditEdadBecerro = false;
  toggleEditEdadBecerro() {
    this.showEditEdadBecerro = !this.showEditEdadBecerro;
  }

}