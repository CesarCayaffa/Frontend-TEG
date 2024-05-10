import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-mes-leche',
  templateUrl: './update-mes-leche.page.html',
  styleUrls: ['./update-mes-leche.page.scss'],
})
export class UpdateMesLechePage implements OnInit {
  lecheMes = {
    id: '',
    lecheXmes: [
      {
        mes: '',
        cantidadLeche: '',
      },
    ],
    fechaSecado: '',
  };
  lecheMesId: string = '';
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
    this.lecheMesId = this.route.snapshot.paramMap.get('lecheMesId') ?? '';
    this.animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
    this.getLecheMes();
  }

  getLecheMes() {
    const url = `${this.baseUrl}/lecheMes/${this.animalId}/${this.lecheMesId}`;
    this.http.get(url).subscribe((lecheMes: any) => {
      this.lecheMes = lecheMes;
      this.lecheMes.id = this.lecheMesId;
    });
    console.log(url);
  }

  updateLecheMes() {
    const url = `${this.baseUrl}/updateLecheMes/${this.animalId}/${this.lecheMesId}`;
    this.http.patch(url, this.lecheMes).subscribe(() => {
      this.redirectInfoVaca();
    });
  }

  redirectInfoVaca() {
    this.router.navigate(['/info-mes-leche', this.animalId]);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  public showLecheMes: boolean = false;

  toggleLecheMes() {
    this.showLecheMes = !this.showLecheMes;
  }

  getAnimalById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  deleteLecheMes(mesLecheId: string) {
    this.alertController
      .create({
        header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar este mes de leche?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              const url = `${this.baseUrl}/deleteLecheMes/${this.animalId}/${mesLecheId}`;

              this.http.patch(url, {}).subscribe(() => {
                this.getAnimalById(this.animalId).subscribe((animal) => {
                  this.animal = animal;
                });
              });
              
              this.router.navigate(['/info-mes-leche', this.animalId]);
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });

  }
}
