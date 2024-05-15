import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-update-palpacion',
  templateUrl: './update-palpacion.page.html',
  styleUrls: ['./update-palpacion.page.scss'],
})
export class UpdatePalpacionPage implements OnInit {
  palpacion = {
    id: '',
    fechaCelo: '',
    fechaServicio: '',
    toro: '',
    fechaPalpacion1: '',
    diagnostico1: '',
    fechaPalpacion2: '',
    diagnostico2: '',
    observaciones: '',
  };

  palpacionId: string = '';
  baseUrl = 'https://backend-teg.up.railway.app/animals';
  animal: any;
  public showCalendar: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private themeService: ThemeService
  ) {}

  animalId: string = '';

  ngOnInit() {
    this.palpacionId = this.route.snapshot.paramMap.get('palpacionId') ?? '';
    this.animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
    this.getPalpacion();
  }
  getPalpacion() {
    const url = `${this.baseUrl}/palpacion/${this.animalId}/${this.palpacionId}`;
    this.http.get(url).subscribe((palpacion: any) => {
      this.palpacion = palpacion;
      this.palpacion.id = this.palpacionId;
    });
  }

  updatePalpacion() {
    const url = `${this.baseUrl}/updatePalpacion/${this.animalId}/${this.palpacionId}`;
    this.http.patch(url, this.palpacion).subscribe(() => {
      this.redirectInfoVaca();
    });
    this.getAnimalById(this.animalId);
  }

  redirectInfoVaca() {
    this.router.navigate(['/info-palpacion', this.animalId]);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  showInfo = false;

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  getAnimalById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  deletePalpacion(palpacionId: string) {
    console.log(palpacionId);

    this.alertController
      .create({
        header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar esta palpación?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              const url = `${this.baseUrl}/deletePalpacion/${this.animalId}/${palpacionId}`;
              this.http.patch(url, {}).subscribe(() => {
                this.getAnimalById(this.animalId).subscribe((animal) => {
                  this.animal = animal;
                });
              });
              this.router.navigate(['/info-palpacion', this.animalId]);
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
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
