import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme = this.darkTheme.asObservable();

  constructor() { 
    this.setDarkMode(false);
   }

  setDarkMode(isDarkTheme: boolean) {
    this.darkTheme.next(isDarkTheme);
  }
}