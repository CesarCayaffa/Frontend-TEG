import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefresherEventDetail } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopOverInfoComponent } from '../../components/pop-over-info/pop-over-info.component';
import { ThemeService } from '../../services/theme.service';
import { ViewDidEnter } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-info-vaca',
  templateUrl: './info-vaca.page.html',
  styleUrls: ['./info-vaca.page.scss'],
})
export class InfoVacaPage implements OnInit, ViewDidEnter {
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
    private alertController: AlertController,
    private popoverController: PopoverController,
    private themeService: ThemeService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ionViewDidEnter() {
    this.refreshAnimalData();
  }

  refreshAnimalData() {
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
    this.refreshAnimalData();
    event.detail.complete();
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
    this.popoverController.dismiss();
  }

  //Parto
  masInfoParto() {
    this.router.navigate(['/info-parto/', this.id]);
    this.popoverController.dismiss();
  }

  //LecheMes
  masInfoLecheMes() {
    this.router.navigate(['/info-mes-leche/', this.id]);
    this.popoverController.dismiss();
  }

  //Condiciones
  addEnfermedad(id: string) {
    this.router.navigate(['/info-condiciones/', this.id]);
  }

  //Popover
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopOverInfoComponent,
      event: ev,
      translucent: true,
      componentProps: {
        id: this.id,
        masInfoPalpacion: this.masInfoPalpacion.bind(this),
        masInfoParto: this.masInfoParto.bind(this),
        masInfoLecheMes: this.masInfoLecheMes.bind(this),
      },
    });
    return await popover.present();
  }

  eliminarCondicion(id: string) {
    this.alertController
      .create({
        message: '¿Estás seguro de que deseas Curar o Eliminar esta condición?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Curar',
            handler: () => {
              const url = `${this.baseUrl}/updateCondicion/${this.id}/${id}`;
              const data = {
                curada: true,
              };
              this.http.patch(url, data).subscribe(() => {
                this.getAnimalById(this.id).subscribe((animal) => {
                  this.animal = animal;
                });
              });
            },
          },
          {
            text: 'Eliminar',
            handler: () => {
              const url = `${this.baseUrl}/deleteCondicion/${this.id}/${id}`;
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

  async changeStatus(id: any) {
    const alert = await this.alertController.create({
      header: 'Cambiar estado',
      inputs: [
        {
          name: 'Normal',
          type: 'radio',
          label: 'Normal',
          value: 'Normal',
          checked: this.animal.estado === 'Normal',
        },
        {
          name: 'Vendida',
          type: 'radio',
          label: 'Vendida',
          value: 'Vendida',
          checked: this.animal.estado === 'Vendida',
        },
        {
          name: 'Muerta',
          type: 'radio',
          label: 'Muerta',
          value: 'Muerta',
          checked: this.animal.estado === 'Muerta',
        },
        {
          name: 'Desaparecida',
          type: 'radio',
          label: 'Desaparecida',
          value: 'Desaparecida',
          checked: this.animal.estado === 'Desaparecida',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (estado) => {
            const url = `https://backend-teg.up.railway.app/animals/${this.id}`;
            const data = {
              estado: estado,
            };
            this.http.patch(url, data).subscribe(() => {
              this.getAnimalById(this.id).subscribe((animal) => {
                this.animal = animal;
              });
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async navegarSiExiste(idAnimal: string) {

    const url = `https://backend-teg.up.railway.app/animals/${idAnimal}`;
    const animal = await this.http.get(url).toPromise().catch(() => null);
    const animalExiste = animal !== null;

    if (animalExiste) {
      this.router.navigate(['/info-vaca', idAnimal]);
    } else {
      const toast = await this.toastController.create({
        message: 'Animal no encontrado o fue eliminado.',
        duration: 2500
      });
      toast.present();
    }
  }
}
