import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-vaca',
  templateUrl: './crear-vaca.page.html',
  styleUrls: ['./crear-vaca.page.scss'],
})
export class CrearVacaPage implements OnInit {
  animal = {
    nombre: '',
    numero: null,
    raza: '',
    sexo: '',
    fechaNacimiento: null,
    esBecerro: true,
    esMadre: false,
    nombrePadre: '',
    numeroPadre: null,
    nombreMadre: '',
    numeroMadre: null,
  };

  animals: any[] = [];

  useExistingPadre = true;
  useExistingMadre = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getAnimals().subscribe((data) => {
      this.animals = data;
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getAnimals(): Observable<any> {
    const url = 'https://backend-teg.up.railway.app/animals/';
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders().set('auth-token', token);

    return this.http.get(url, { headers });
  }

  onSubmit() {
    const url = 'https://backend-teg.up.railway.app/animals/';
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders().set('auth-token', token);

    if(!this.animal.nombre || !this.animal.numero || !this.animal.raza || !this.animal.sexo || !this.animal.fechaNacimiento) {
      this.presentToast('Por favor, complete todos los campos requeridos.');
      return;
    } else{
      this.http.post(url, this.animal, { headers }).subscribe((res) => {
        console.log(res);
        console.log(this.animal);
        this.redirectToVacas();
      });

      this.presentToast('Animal creado exitosamente.');
    }

  }

  redirectToVacas() {
    this.router.navigate(['/lista-vacas']);
  }

  showCalendar = false;
  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }
}
