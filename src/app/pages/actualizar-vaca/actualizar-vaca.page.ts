import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../../services/theme.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-vaca',
  templateUrl: './actualizar-vaca.page.html',
  styleUrls: ['./actualizar-vaca.page.scss'],
})
export class ActualizarVacaPage implements OnInit {
  animal = {
    id: '',
    nombre: '',
    numero: null,
    raza: '',
    sexo: '',
    fechaNacimiento: null,
    esBecerro: true,
    esMadre: false,
    nombrePadre: '',
    numeroPadre: null,
    nombreMadre: '',
    numeroMadre: null,

  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.getAnimal(id);
    } else {
      console.error('id es null');
      this.presentToast('Error al cargar la vaca.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getAnimal(id: string) {
    const url = `https://backend-teg.up.railway.app/animals/${id}`;
    this.http.get(url).subscribe((animal: any) => {
      this.animal = animal;
      this.animal.id = id;
    });
  }

  updateAnimal() {
    const url = `https://backend-teg.up.railway.app/animals/${this.animal.id}`;
    this.http.patch(url, this.animal).subscribe(() => {
      this.router.navigate(['/info-vaca', this.animal.id]);
    });
    this.presentToast('Animal actualizado exitosamente.');
  }

  redirectToInfoVaca() {
    this.router.navigate(['/info-vaca', this.animal.id]);
  }

  showCalendar=false;

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }
}
