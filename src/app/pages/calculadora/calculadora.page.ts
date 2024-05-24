import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {
  animals: any[] = [];
  url = 'https://backend-teg.up.railway.app/animals';

  selectedMother: string = '';
  selectedFather: string = '';

  newAnimal: any;

  constructor(
    private themeService: ThemeService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAnimals().subscribe(data => {
      this.animals = data; 
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

  calculateCross(idMother: string, idFather: string) {
    // Busca los animales correspondientes
    const mother = this.animals.find(animal => animal._id === idMother);
    const father = this.animals.find(animal => animal._id === idFather);
  
    if (!mother || !father) {
      throw new Error('Mother or father not found');
    }
  
    // Extrae la raza, las condiciones y la puntuación
    let raza;
  if (mother.raza === father.raza) {
    raza = mother.raza;
  } else {
    raza = `Cruzada (${mother.raza} x ${father.raza})`; // Raza cruzada
  }
    const condicionesMother = mother.condiciones || [];
    const condicionesFather = father.condiciones || [];
    const puntuacionMother = mother.puntuacion || 0;
    const puntuacionFather = father.puntuacion || 0;
  
    // Calcula el promedio de las puntuaciones
    const puntuacion = (puntuacionMother + puntuacionFather) / 2;
  
    // Crea un nuevo animal
    const newAnimal = {
      raza,
      condiciones: [...condicionesMother, ...condicionesFather], // Combina las condiciones de ambos padres
      puntuacion,
      // Agrega aquí cualquier otra propiedad que necesites
    };
  
    console.log(newAnimal);
    return newAnimal;


  }

  calculate() {
    this.newAnimal = this.calculateCross(this.selectedMother, this.selectedFather);
  }

  getConditionsString(): string {
    if (this.newAnimal && this.newAnimal.condiciones) {
      return this.newAnimal.condiciones
        .filter((condicion: any) => !condicion.curada) 
        .map((condicion: any) => condicion.nombre)
        .join(', ');
    }
    return '';
  }
}
