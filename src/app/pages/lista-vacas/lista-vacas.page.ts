import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefresherEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-lista-vacas',
  templateUrl: './lista-vacas.page.html',
  styleUrls: ['./lista-vacas.page.scss'],
})
export class ListaVacasPage implements OnInit, ViewDidEnter{
  animals: any[] = [];
  filteredAnimals: any[] = [];
  searchTerm = '';
  filterSexo = '';
  filterEtapa = '';

  isLoading = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    // this.getAnimals().subscribe((data) => {
    //   this.animals = data.map((animal: any) => ({
    //     nombre: animal.nombre,
    //     numero: animal.numero,
    //     sexo: animal.sexo,
    //     fechaNacimiento: animal.fechaNacimiento,
    //     id: animal._id,
    //     esBecerro: animal.esBecerro,
    //     raza: animal.raza,
    //     years: animal.edad.years,
    //     puntuacion: animal.puntuacion,
  
    //   }));
    //   this.filteredAnimals = this.animals;
    //   this.isLoading = false;
    // });
  }

  ionViewDidEnter() {
    this.getAnimals().subscribe((data) => {
      this.animals = data.map((animal: any) => ({
        nombre: animal.nombre,
        numero: animal.numero,
        sexo: animal.sexo,
        fechaNacimiento: animal.fechaNacimiento,
        id: animal._id,
        esBecerro: animal.esBecerro,
        raza: animal.raza,
        years: animal.edad.years,
        puntuacion: animal.puntuacion,
      }));
      this.filteredAnimals = this.animals;
      this.isLoading = false;
    });
  }

  getAnimals(): Observable<any> {
    const url = 'https://backend-teg.up.railway.app/animals/';
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders().set('auth-token', token);

    return this.http.get(url, { headers });
  }

  doRefresh(event: CustomEvent<RefresherEventDetail>) {
    this.getAnimals().subscribe((data) => {
      this.animals = data.map((animal: any) => ({
        nombre: animal.nombre,
        numero: animal.numero,
        sexo: animal.sexo,
        fechaNacimiento: animal.fechaNacimiento,
        id: animal._id,
        esBecerro: animal.esBecerro,
        raza: animal.raza,
        years: animal.edad.years,
        puntuacion: animal.puntuacion,
      }));
      this.filteredAnimals = this.animals;
      event.detail.complete();
    });
  }

  filterAnimals() {
    this.filteredAnimals = this.animals.filter((animal) => {
      const matchesSearchTerm =
        this.searchTerm === '' ||
        animal.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        animal.numero.toString().includes(this.searchTerm);
      const matchesSexo =
        this.filterSexo === '' || animal.sexo === this.filterSexo;
      const matchesEtapa =
        this.filterEtapa === '' ||
        animal.esBecerro.toString() === this.filterEtapa;
      return matchesSearchTerm && matchesSexo && matchesEtapa;
    });
  }
  clearFilters() {
    this.searchTerm = '';
    this.filterSexo = '';
    this.filterEtapa = '';
    this.filterAnimals();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      subHeader: 'Filtrar por:',
      buttons: [
        {
          text:
            this.filterSexo === 'Masculino'
              ? 'Sexo: Masculino ✔️'
              : 'Sexo: Masculino',
          handler: () => {
            this.filterSexo = 'Masculino';
            this.filterAnimals();
          },
        },
        {
          text:
            this.filterSexo === 'Femenino'
              ? 'Sexo: Femenino ✔️'
              : 'Sexo: Femenino',
          handler: () => {
            this.filterSexo = 'Femenino';
            this.filterAnimals();
          },
        },
        {
          text:
            this.filterEtapa === 'true' ? 'Etapa: Joven ✔️' : 'Etapa: Joven',
          handler: () => {
            this.filterEtapa = 'true';
            this.filterAnimals();
          },
        },
        {
          text:
            this.filterEtapa === 'false' ? 'Etapa: Adulto ✔️' : 'Etapa: Adulto',
          handler: () => {
            this.filterEtapa = 'false';
            this.filterAnimals();
          },
        },
        {
          text:'------------------------------------------------------------------------'
        },
        {
          text: 'Quitar filtros',
          role: 'destructive',
          icon: 'close',
          handler: () => {
            this.clearFilters();
          },
        }, 
        {
          text: 'Refrescar página/datos',
          icon: 'refresh',
          handler: () => {
            this.clearFilters();
            this.doRefresh({
              detail: { complete: function () {} },
            } as CustomEvent<RefresherEventDetail>);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  showSearchBar= false;

  toggleSearchBar(){
    this.showSearchBar = !this.showSearchBar;
  }
}
