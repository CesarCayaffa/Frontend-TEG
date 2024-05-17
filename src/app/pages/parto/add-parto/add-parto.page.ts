import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../../../services/theme.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-parto',
  templateUrl: './add-parto.page.html',
  styleUrls: ['./add-parto.page.scss'],
})
export class AddPartoPage implements OnInit {
  comiParto = {
    fechaParto: '',
    sexoBecerro: '',
    pesoBecerroKg: '',
    diaProduccion: '',
    produccionTotal: '',
    produccionX: '',
    observacion: '',
  };
  id: any;
  baseUrl = 'https://backend-teg.up.railway.app/animals';

  public showCalendar: boolean = false;

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

  addParto() {
    if (
      !this.comiParto.fechaParto ||
      !this.comiParto.sexoBecerro ||
      !this.comiParto.pesoBecerroKg
    ) {
      this.presentToast('Por favor complete todos los campos requeridos.');
    } else {
      const url = `${this.baseUrl}/addParto/${this.id}`;
      this.http.patch(url, this.comiParto).subscribe(() => {
        this.redirecInfoVaca();
      });
      this.presentToast('Agregado con éxito');
    }
  }

  redirecInfoVaca() {
    this.router.navigate([
      '/info-parto',
      this.route.snapshot.paramMap.get('id'),
    ]);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }
}
