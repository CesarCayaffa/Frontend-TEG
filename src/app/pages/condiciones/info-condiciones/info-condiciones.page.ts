import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-info-condiciones',
  templateUrl: './info-condiciones.page.html',
  styleUrls: ['./info-condiciones.page.scss'],
})
export class InfoCondicionesPage implements OnInit {
  condicionesOriginales: any[] = [
    { nombre: 'Mastitis', gravedad: 'moderada', observaciones: 'enfermedad' },
    { nombre: 'Babesiosis', gravedad: 'grave', observaciones: 'enfermedad' },
    { nombre: 'Brucelosis', gravedad: 'grave', observaciones: 'enfermedad' },
    { nombre: 'Fiebre aftosa', gravedad: 'grave', observaciones: 'enfermedad' },
    { nombre: 'Tuberculosis', gravedad: 'grave', observaciones: 'enfermedad' },
    { nombre: 'Clostridiosis', gravedad: 'grave', observaciones: 'enfermedad' },
    {
      nombre: 'Leptospirosis',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Problemas en las pezuñas',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    {
      nombre: 'Parásitos internos',
      gravedad: 'leve',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Rinotraqueitis infecciosa bovina',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Problemas postparto',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Enfermedades metabólicas',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Enfermedades respiratorias',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Enfermedades del sistema nervioso',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Enfermedades del sistema reproductivo',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    { nombre: 'Inflamación', gravedad: 'leve', observaciones: 'enfermedad' },
    { nombre: 'Fiebre', gravedad: 'leve', observaciones: 'enfermedad' },
    {
      nombre: 'Pérdida de peso',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    { nombre: 'Diarrea', gravedad: 'leve', observaciones: 'enfermedad' },
    { nombre: 'Tos', gravedad: 'leve', observaciones: 'enfermedad' },
    {
      nombre: 'Secreción nasal y ocular',
      gravedad: 'leve',
      observaciones: 'enfermedad',
    },
    { nombre: 'Letargo', gravedad: 'leve', observaciones: 'enfermedad' },
    { nombre: 'Cojera', gravedad: 'leve', observaciones: 'deformación' },
    {
      nombre: 'Problemas respiratorios',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Encefalopatía espongiforme bovina',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre:
        'Infección por Mycoplasmamycoides subsp. mycoides SC (Perineumonía contagiosa bovina)',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Leucosis bovina enzoótica',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    {
      nombre:
        'Rinotraqueítis infecciosa bovina/vulvovaginitis pustular infecciosa',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Septicemia hemorrágica',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Teileriosis',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Tricomonosis',
      gravedad: 'moderada',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Tripanosomosis (transmitida por la mosca tsetsé)',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Tuberculosis bovina',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Infección por el virus de la peste bovina',
      gravedad: 'grave',
      observaciones: 'enfermedad',
    },
    {
      nombre: 'Braquignatia (acortamiento del maxilar inferior)',
      gravedad: 'moderada',
      observaciones: 'deformación',
    },
    {
      nombre: 'Escoliosis (curvatura anormal de la columna vertebral)',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    {
      nombre: 'Lordosis (curvatura excesiva de la columna vertebral)',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    {
      nombre: 'Cifosis (joroba en la columna vertebral)',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    {
      nombre: 'Pie zambo (deformidad en los pies)',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    {
      nombre: 'Polidactilia (dedos adicionales)',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    {
      nombre: 'Sindactilia (dedos fusionados)',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    {
      nombre: 'Micrognatia (mandíbula inferior pequeña)',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    {
      nombre: 'Prognatismo (mandíbula inferior grande)',
      gravedad: 'leve',
      observaciones: 'deformación',
    },
    { nombre: 'Orejas caídas', gravedad: 'leve', observaciones: 'deformación' },
  ];

  condiciones = [ ...this.condicionesOriginales ];

  private baseUrl = 'https://backend-teg.up.railway.app/animals';
  animalId: string = '';
  animal: any;

  // showEnfermedades
  showEnfermedades = false;
  toggleEnfermedades() {
    this.showEnfermedades = !this.showEnfermedades;
  }

  // showDeformaciones
  showDeformaciones = false;
  toggleDeformaciones() {
    this.showDeformaciones = !this.showDeformaciones;
  }
  
  condicionesSeleccionadas: any[] = [];
  condicionYaSeleccionada(condicion: any) {
    return this.condicionesSeleccionadas.some(c => c.nombre === condicion.nombre);
  }

  // seleccionarCondicion(condicion: any) {
  //   this.condicionesSeleccionadas.push(condicion);
  // }
  seleccionarCondicion(condicion: any) {
    if (this.condicionYaSeleccionada(condicion)) {
      this.condicionesSeleccionadas = this.condicionesSeleccionadas.filter(c => c.nombre !== condicion.nombre);
    } else {
      this.condicionesSeleccionadas.push(condicion);
    }
  }

  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private http: HttpClient,
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

  getAnimalById(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  guardarCondiciones() {
    const url = `${this.baseUrl}/addCondicion/${this.animalId}`;
    const condicionesData = this.condicionesSeleccionadas.map(condicion => {
      return {
        nombre: condicion.nombre,
        gravedad: condicion.gravedad,
        observaciones: condicion.observaciones
      };
    });
  
    this.http
      .patch(url,  condicionesData )
      .subscribe(response => {
        console.log(response);
      });

    this.router.navigate(['/info-vaca', this.animalId]);
  }

  eliminarCondicion(condicion: any) {
    this.condicionesSeleccionadas = this.condicionesSeleccionadas.filter(c => c.nombre !== condicion.nombre);
  }

  regresar() {
    this.router.navigate(['/info-vaca', this.animalId]);
  }

  showSearchBar = false;
  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    this.searchTerm = '';
    this.showEnfermedades = !this.showEnfermedades;
    this.showDeformaciones = !this.showDeformaciones;
  }

  searchTerm = '';
  filterCondiciones() {
    this.condiciones = this.condicionesOriginales.filter((condicion) => {
      const matchesSearchTerm =
        this.searchTerm === '' ||
        condicion.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearchTerm;
    });
  }

}
