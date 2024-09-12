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

  recommendedBulls: any[] = [];

  constructor(private themeService: ThemeService, private http: HttpClient) {}

  ngOnInit() {
    this.getAnimals().subscribe((data) => {
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
    const mother = this.animals.find((animal) => animal._id === idMother);
    const father = this.animals.find((animal) => animal._id === idFather);

    if (!mother || !father) {
      throw new Error('Mother or father not found');
    }

    // Extrae la raza, las condiciones y la puntuación
    let raza;
    const motherRaza = mother.raza.trim().toLowerCase();
    const fatherRaza = father.raza.trim().toLowerCase();
    
    if (motherRaza === fatherRaza) {
      raza = `${mother.raza} `; // Raza pura
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
     
    };

    console.log(newAnimal);
    return newAnimal;
  }

getRecommendedBulls(idMother: string): any[] {
  const mother = this.animals.find((animal) => animal._id === idMother);

  if (!mother) {
    throw new Error('Mother not found');
  }


    // Filtrar solo los toros (machos) que no sean becerros
    const bulls = this.animals.filter((animal) => animal.sexo === 'Masculino' && animal.esBecerro === false);
    console.log('Bulls:', bulls);

  // Ordenar los toros por puntuación en orden descendente
  const sortedBulls = bulls.sort((a, b) => b.puntuacion - a.puntuacion);


  // Seleccionar los 5 toros con la puntuación más alta
  const recommendedBulls = sortedBulls.slice(0, 5);


  return recommendedBulls;
}

  calculate() {
    this.newAnimal = this.calculateCross(
      this.selectedMother,
      this.selectedFather
    );
    this.recommendedBulls = this.getRecommendedBulls(this.selectedMother);
    console.log('New Animal:', this.newAnimal);
    console.log('Recommended Bulls:', this.recommendedBulls);
    }

    selectBullAndCalculate(bull: any): void {
      // Actualiza el ion-select del padre con el nuevo toro seleccionado
      this.selectedFather = bull._id;
      // Llama a la función de cálculo existente
      this.calculate();
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
