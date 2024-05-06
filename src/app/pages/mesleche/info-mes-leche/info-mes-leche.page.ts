import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-mes-leche',
  templateUrl: './info-mes-leche.page.html',
  styleUrls: ['./info-mes-leche.page.scss'],
})
export class InfoMesLechePage implements OnInit {
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

  addLecheMes(id: string) {
    this.router.navigate(['/add-mes-leche', this.animalId]);
  }
  updateLecheMes(mesLecheId: string) {
    this.router.navigate(['/update-mes-leche', this.animalId, mesLecheId]);
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
