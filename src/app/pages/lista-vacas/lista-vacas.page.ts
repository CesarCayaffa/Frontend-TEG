import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { RefresherEventDetail } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-vacas',
  templateUrl: './lista-vacas.page.html',
  styleUrls: ['./lista-vacas.page.scss'],
})
export class ListaVacasPage implements OnInit {
  animals: any[] = [];
  filteredAnimals: any[] = [];
  searchTerm = '';
  filterSexo = '';
  filterEtapa = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
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
      }));
      this.filteredAnimals = this.animals;
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
}
