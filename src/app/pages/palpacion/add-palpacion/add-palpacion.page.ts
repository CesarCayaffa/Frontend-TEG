import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-palpacion',
  templateUrl: './add-palpacion.page.html',
  styleUrls: ['./add-palpacion.page.scss'],
})
export class AddPalpacionPage implements OnInit {
  palpacion = {
    fechaCelo: '',
    fechaServicio: '',
    toro: '',
    fechaPalpacion1: '',
    diagnostico1: '',
    fechaPalpacion2: '',
    diagnostico2: '',
    observaciones: '',
  };
  id: any;
  baseUrl = 'https://backend-teg.up.railway.app/animals';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  addPalpacion() {
    if(!this.palpacion.fechaCelo || !this.palpacion.fechaServicio || !this.palpacion.toro || !this.palpacion.fechaPalpacion1 || !this.palpacion.diagnostico1 || !this.palpacion.fechaPalpacion2 || !this.palpacion.diagnostico2 || !this.palpacion.observaciones){
      this.presentToast('Por favor complete todos los campos requeridos.');
    } else {
      const url = `${this.baseUrl}/addPalpacion/${this.id}`;
      this.http.patch(url, this.palpacion).subscribe(() => {
        this.redirectInfoVaca();
      });
    }
  }

 getAnimalById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  redirectInfoVaca() {
    this.router.navigate([
      '/info-palpacion',
      this.route.snapshot.paramMap.get('id'),
    ]);
  }

  showCalendarCelo = false;
  toggleCalendarCelo() {
    this.showCalendarCelo = !this.showCalendarCelo;
  }

  showCalendarServicio = false;
  toggleCalendarServicio() {
    this.showCalendarServicio = !this.showCalendarServicio;
  }

  showCalendarPalpacion1 = false;
  toggleCalendarPalpacion1() {
    this.showCalendarPalpacion1 = !this.showCalendarPalpacion1;
  }

  showCalendarPalpacion2 = false;
  toggleCalendarPalpacion2() {
    this.showCalendarPalpacion2 = !this.showCalendarPalpacion2;
  }
}
