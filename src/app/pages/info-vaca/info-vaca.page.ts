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

  //Parto
  masInfoParto(){
    this.router.navigate(['/info-parto/', this.id]);
  }



  //LecheMes
  masInfoLecheMes(){
    this.router.navigate(['/info-mes-leche/', this.id]);
  }
}
