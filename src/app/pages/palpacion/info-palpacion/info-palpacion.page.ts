import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-palpacion',
  templateUrl: './info-palpacion.page.html',
  styleUrls: ['./info-palpacion.page.scss'],
})
export class InfoPalpacionPage implements OnInit {
  private baseUrl = 'https://backend-teg.up.railway.app/animals';
  animalId: string = '';
  animal: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('animalId');
    if (id) {
      this.animalId = id;
      this.http.get(`${this.baseUrl}/${this.animalId}`).subscribe((data) => {
        this.animal = data;
      });
    }
  }

  getAnimalById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  addPalpacion(id: string) {
    this.router.navigate(['/add-palpacion', this.animalId]);
  }
  updatePalpacion(palpacionId: string) {
    this.router.navigate(['/update-palpacion', this.animalId, palpacionId]);
  }
  // deletePalpacion(palpacionId: string) {

  //   console.log(palpacionId)

  //   this.alertController
  //     .create({
  //       header: 'Eliminar',
  //       message: '¿Estás seguro de que deseas eliminar esta palpación?',
  //       buttons: [
  //         {
  //           text: 'Cancelar',
  //           role: 'cancel',
  //         },
  //         {
  //           text: 'Eliminar',
  //           handler: () => {
  //             const url = `${this.baseUrl}/deletePalpacion/${this.animalId}/${palpacionId}`;
  //             this.http.patch(url, {}).subscribe(() => {
  //               this.getAnimalById(this.animalId).subscribe((animal) => {
  //                 this.animal = animal;
  //               });
  //             });
  //           },
  //         },
  //       ],
  //     })
  //     .then((alert) => {
  //       alert.present();
  //     });
  // }

  retroceder() {
    this.router.navigate(['/info-vaca', this.animalId]);
  }
}
