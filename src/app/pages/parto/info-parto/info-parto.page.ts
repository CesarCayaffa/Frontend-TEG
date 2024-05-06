import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-parto',
  templateUrl: './info-parto.page.html',
  styleUrls: ['./info-parto.page.scss'],
})
export class InfoPartoPage implements OnInit {
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

  addParto(id: string) {
    this.router.navigate(['/add-parto', this.animalId]);
  }
  updateParto(partoId: string) {
    this.router.navigate(['/update-parto', this.animalId, partoId]);
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
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  retroceder() {
    this.router.navigate(['/info-vaca', this.animalId]);
  }
}
