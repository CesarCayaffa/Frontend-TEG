import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefresherEventDetail } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info-vaca',
  templateUrl: './info-vaca.page.html',
  styleUrls: ['./info-vaca.page.scss'],
})
export class InfoVacaPage implements OnInit {
  id: any;
  animal: any;
  private baseUrl = 'https://backend-teg.up.railway.app/animals';

  showPalpacion: boolean = false;
  showParto: boolean = false;
  showLecheMes: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAnimalById(this.id).subscribe((animal) => {
      this.animal = animal;
      this.animal.hijos.forEach((id: any) => {
        this.getAnimalById(id).subscribe((hijo) => {
          this.animal.hijos[this.animal.hijos.indexOf(id)] = hijo;
        });
      });
    });
  }

  getAnimalById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  doRefresh(event: CustomEvent<RefresherEventDetail>) {
    this.getAnimalById(this.id).subscribe((animal) => {
      this.animal = animal;
      event.detail.complete();
    });
  }

  redirectList() {
    this.router.navigate(['/lista-vacas']);
  }

  updateAnimal() {
    this.router.navigate(['/actualizar-vaca', this.id]);
  }

  deleteAnimal(id: string) {
    this.alertController
      .create({
        // header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar este animal?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              const url = `${this.baseUrl}/${this.id}`;
              this.http.delete(url).subscribe(() => {
                this.router.navigate(['/lista-vacas']);
              });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  //Palpacion
  masInfoPalpacion() {
    this.router.navigate(['/info-palpacion/', this.id]);

   
  }

  addPalpacion(id: string) {
    this.router.navigate(['/add-palpacion', this.id]);
  }
  updatePalpacion(palpacionId: string) {
    this.router.navigate(['/update-palpacion', this.id, palpacionId]);
  }
  deletePalpacion(palpacionId: string) {
    this.alertController
      .create({
        // header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar esta palpación?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              const url = `${this.baseUrl}/deletePalpacion/${this.id}/${palpacionId}`;

              this.http.patch(url, {}).subscribe(() => {
                this.getAnimalById(this.id).subscribe((animal) => {
                  this.animal = animal;
                });
              });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  //Parto
  addParto(id: string) {
    this.router.navigate(['/add-parto', this.id]);
  }
  updateParto(partoId: string) {
    this.router.navigate(['/update-parto', this.id, partoId]);
  }
  deleteParto(partoId: string) {
    this.alertController
      .create({
        // header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar este parto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              const url = `${this.baseUrl}/deleteParto/${this.id}/${partoId}`;

              this.http.patch(url, {}).subscribe(() => {
                this.getAnimalById(this.id).subscribe((animal) => {
                  this.animal = animal;
                });
              });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  //LecheMes
  addLecheMes(id: string) {
    this.router.navigate(['/add-mes-leche', this.id]);
  }
  updateLecheMes(mesLecheId: string) {
    this.router.navigate(['/update-mes-leche', this.id, mesLecheId]);
  }
  deleteLecheMes(mesLecheId: string) {
    this.alertController
      .create({
        // header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar este mes de leche?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              const url = `${this.baseUrl}/deleteLecheMes/${this.id}/${mesLecheId}`;

              this.http.patch(url, {}).subscribe(() => {
                this.getAnimalById(this.id).subscribe((animal) => {
                  this.animal = animal;
                });
              });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
