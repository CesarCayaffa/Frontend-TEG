import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-parto',
  templateUrl: './update-parto.page.html',
  styleUrls: ['./update-parto.page.scss'],
})
export class UpdatePartoPage implements OnInit {
  comiParto = {
    id: '',
    fechaParto: '',
    sexoBecerro: '',
    pesoBecerroKg: '',
    diaProduccion: '',
    produccionTotal: '',
    produccionX: '',
    observacion: '',
  };

  partoId: string = '';
  baseUrl = 'https://backend-teg.up.railway.app/animals';
  animal: any;

  public showCalendar: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  animalId: string = '';

  ngOnInit() {
    this.partoId = this.route.snapshot.paramMap.get('partoId') ?? '';
    this.animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
    this.getParto();
  }
  getParto() {
    const url = `${this.baseUrl}/parto/${this.animalId}/${this.partoId}`;
    this.http.get(url).subscribe((parto: any) => {
      this.comiParto = parto;
      this.comiParto.id = this.partoId;
    });
  }

  updateParto() {
    const url = `${this.baseUrl}/updateParto/${this.animalId}/${this.partoId}`;
    this.http.patch(url, this.comiParto).subscribe(() => {
      this.redirectInfoVaca();
    });
  }

  redirectInfoVaca() {
    this.router.navigate(['/info-parto', this.animalId]);
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

  deleteParto(partoId: string) {
    this.alertController
      .create({
        header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar este parto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              const url = `${this.baseUrl}/deleteParto/${this.animalId}/${partoId}`;

              this.http.patch(url, {}).subscribe(() => {
                this.getAnimalById(this.animalId).subscribe((animal) => {
                  this.animal = animal;
                });
              });
              this.router.navigate(['/info-parto', this.animalId]);
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
