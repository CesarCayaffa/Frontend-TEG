import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../../../services/theme.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-mes-leche',
  templateUrl: './add-mes-leche.page.html',
  styleUrls: ['./add-mes-leche.page.scss'],
})
export class AddMesLechePage implements OnInit {
  lecheMes = {
    idComiParto: '',

    lecheXmes: Array<{ mes: string; cantidadLeche: string }>(0),

    fechaSecado: '',
  };
  id: any;
  baseUrl = 'https://backend-teg.up.railway.app/animals';
  comiPartos: any[] = [];

  public showCalendar: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private toastController: ToastController
  ) {
    for (let i = 0; i < 12; i++) {
      this.lecheMes.lecheXmes.push({ mes: '', cantidadLeche: '' });
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //hacer un get para traer la info de la vaca
    this.getVaca();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  addLecheMes() {

    if (!this.lecheMes.fechaSecado || !this.lecheMes.idComiParto) {
      this.presentToast('Por favor complete todos los campos requeridos.');
    } else {
      const url = `${this.baseUrl}/addLecheMes/${this.id}`;
      this.http.patch(url, this.lecheMes).subscribe(() => {
        this.redirecInfoVaca();
      });
    }
  }

  getVaca() {
    const url = `${this.baseUrl}/${this.id}`;
    this.http.get(url).subscribe((res: any) => {
      this.comiPartos = res.comiParto;
      this.comiPartos.forEach((comiParto) => {
        console.log(comiParto._id);
      });
    });
  }

  redirecInfoVaca() {
    this.router.navigate([
      '/info-mes-leche',
      this.route.snapshot.paramMap.get('id'),
    ]);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }
}
