import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-all-report',
  templateUrl: './all-report.page.html',
  styleUrls: ['./all-report.page.scss'],
})
export class AllReportPage implements OnInit {
  dataReportCelo: any[] = [];
  dataReportParto: any[] = [];
  dataReportServicio: any[] = [];
  dataReportPalpacion: any[] = [];
  dataReportLeche: any[] = [];

  progress: number = 0;
  intervalId: any;

  public segmentValue: string = 'celo';
  header: string = 'celo';
  reportes: any[] = [];
  isLoading = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService
  ) {
    if (this.isLoading === true) {
      this.intervalId = setInterval(() => {
        this.progress += 0.01;
        if (this.progress > 1) {
          setTimeout(() => {
            this.progress = 0;
            this.getReportCelo();
            this.isLoading = false;
            this.segmentValue = 'celo';
            clearInterval(this.intervalId);
          }, 1000);
        }
      }, 10);
    }
  }

  ngOnInit() {
    this.segmentValue = 'all';
    this.getAnimals().subscribe((data) => {
      // console.log(data);
      this.reportes = data;
    });

    this.getReportCelo();
    this.getReportParto();
    this.getReportServicio();
    this.getReportPalpacion();
    this.getReportLeche();
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

  getReportCelo() {
    // Filtrar los datos de reportes para obtener solo el nombre y la fecha de celo
    const celoData = this.reportes.map((animal) => {
      return animal.palpaciones.map((palpacion: any) => {
        // Specify the type of 'palpacion' parameter
        return {
          id: animal._id,
          nombre: animal.nombre,
          fecha: palpacion.fechaCelo,
        };
      });
    });

    // Aplanar el array de arrays
    this.dataReportCelo = [].concat.apply([], celoData);

    //realizar los calculos de los dias de celo
    this.dataReportCelo.forEach((element) => {
      const fechaCelo = new Date(element.fecha);
      const fechaActual = new Date();
      const diffTime = Math.abs(fechaActual.getTime() - fechaCelo.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      element.dias = diffDays;
    });

    // Ordenar los datos por dias de celo
    this.dataReportCelo.sort((a, b) => {
      return a.dias - b.dias;
    });

    //Cuantas veces ha estado en celo
    this.dataReportCelo.forEach((element) => {
      const count = this.dataReportCelo.filter((celo) => {
        return celo.nombre === element.nombre;
      }).length;

      element.count = count;
    });

    //Eliminar los duplicados
    this.dataReportCelo = this.dataReportCelo.filter(
      (celo, index, self) =>
        index === self.findIndex((t) => t.nombre === celo.nombre)
    );
  }

  getReportParto() {
    // Filtrar los datos de reportes para obtener solo el nombre y la fecha de parto
    const partoData = this.reportes.map((animal) => {
      return animal.comiParto.map((comiParto: any) => {
        // Specify the type of 'palpacion' parameter
        return {
          id: animal._id,
          nombre: animal.nombre,
          fecha: comiParto.fechaParto,
        };
      });
    });

    // Aplanar el array de arrays
    this.dataReportParto = [].concat.apply([], partoData);

    //realizar los calculos de los dias de parto
    this.dataReportParto.forEach((element) => {
      const fechaParto = new Date(element.fecha);
      const fechaActual = new Date();
      const diffTime = Math.abs(fechaActual.getTime() - fechaParto.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      element.dias = diffDays;
    });

    // Intervalo de partos
    this.dataReportParto.forEach((element) => {
      const partos = this.dataReportParto.filter((parto) => {
        return parto.nombre === element.nombre;
      });

      const intervalo = partos.map((parto, index) => {
        if (index === 0) {
          return 0;
        }

        const fechaParto = new Date(parto.fecha);
        const fechaAnterior = new Date(partos[index - 1].fecha);
        const diffTime = Math.abs(
          fechaParto.getTime() - fechaAnterior.getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
      });

      // Asignar el último intervalo calculado
      element.intervalo = intervalo[intervalo.length - 1];
    });

    // Ordenar los datos por dias de parto
    this.dataReportParto.sort((a, b) => {
      return a.dias - b.dias;
    });

    //Cuantas veces ha estado en parto
    this.dataReportParto.forEach((element) => {
      const count = this.dataReportParto.filter((parto) => {
        return parto.nombre === element.nombre;
      }).length;

      element.count = count;
    });

    //Eliminar los duplicados
    this.dataReportParto = this.dataReportParto.filter(
      (parto, index, self) =>
        index === self.findIndex((t) => t.nombre === parto.nombre)
    );
  }

  getReportServicio() {
    // Filtrar los datos de reportes para obtener solo el nombre y la fecha de servicio
    const servicioData = this.reportes.map((animal) => {
      return animal.palpaciones.map((palpacion: any) => {
        // Specify the type of 'servicio' parameter
        return {
          id: animal._id,
          nombre: animal.nombre,
          fecha: palpacion.fechaServicio,
        };
      });
    });

    // Aplanar el array de arrays
    this.dataReportServicio = [].concat.apply([], servicioData);

    //realizar los calculos de los dias de servicio
    this.dataReportServicio.forEach((element) => {
      const fechaServicio = new Date(element.fecha);
      const fechaActual = new Date();
      const diffTime = Math.abs(
        fechaActual.getTime() - fechaServicio.getTime()
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      element.dias = diffDays;
    });

    // Ordenar los datos por dias de servicio
    this.dataReportServicio.sort((a, b) => {
      return a.dias - b.dias;
    });

    //Cuantas veces ha estado en servicio
    this.dataReportServicio.forEach((element) => {
      const count = this.dataReportServicio.filter((servicio) => {
        return servicio.nombre === element.nombre;
      }).length;

      element.count = count;
    });

    //Eliminar los duplicados
    this.dataReportServicio = this.dataReportServicio.filter(
      (servicio, index, self) =>
        index === self.findIndex((t) => t.nombre === servicio.nombre)
    );
  }

  getReportPalpacion() {
    // Filtrar los datos de reportes para obtener solo el nombre y la fecha de palpacion
    const palpacionData = this.reportes.map((animal) => {
      return animal.palpaciones.map((palpacion: any) => {
        // Specify the type of 'palpacion' parameter
        return {
          id: animal._id,
          nombre: animal.nombre,
          diagnostico1: palpacion.diagnostico1,
          diagnostico2: palpacion.diagnostico2,
        };
      });
    });

    // Aplanar el array de arrays
    this.dataReportPalpacion = [].concat.apply([], palpacionData);

    //realizar calculos de los diagnostico de palpacion (Preñada, Aborto, Vacia)
    //Preñada + Preñada = Preñada
    //Preñada + Vacia = Aborto
    //Vacia + Vacia = Vacia
    //Vacía + Preñada = Preñada

    this.dataReportPalpacion.forEach((element) => {
      if (
        element.diagnostico1 === 'Preñada' &&
        element.diagnostico2 === 'Preñada'
      ) {
        element.diagnostico = 'Preñada';
      } else if (
        element.diagnostico1 === 'Preñada' &&
        element.diagnostico2 === 'Vacia'
      ) {
        element.diagnostico = 'Aborto';
      } else if (
        element.diagnostico1 === 'Vacia' &&
        element.diagnostico2 === 'Vacia'
      ) {
        element.diagnostico = 'Vacia';
      } else if (
        element.diagnostico1 === 'Vacia' &&
        element.diagnostico2 === 'Preñada'
      ) {
        element.diagnostico = 'Preñada';
      }
    });

    //Ordenar los datos por diagnostico de palpacion
    // this.dataReportPalpacion.sort((a, b) => {
    //   return a.diagnostico.localeCompare(b.diagnostico);
    // });

    //Cuantas veces ha estado en palpacion
    this.dataReportPalpacion.forEach((element) => {
      const count = this.dataReportPalpacion.filter((palpacion) => {
        return palpacion.nombre === element.nombre;
      }).length;

      element.count = count;
    });

    //Cuantas veces esta Preñada , Aborto y Vacia un animal
    this.dataReportPalpacion.forEach((element) => {
      const countPreñada = this.dataReportPalpacion.filter((palpacion) => {
        return (
          palpacion.nombre === element.nombre &&
          palpacion.diagnostico === 'Preñada'
        );
      }).length;

      const countAborto = this.dataReportPalpacion.filter((palpacion) => {
        return (
          palpacion.nombre === element.nombre &&
          palpacion.diagnostico === 'Aborto'
        );
      }).length;

      const countVacia = this.dataReportPalpacion.filter((palpacion) => {
        return (
          palpacion.nombre === element.nombre &&
          palpacion.diagnostico === 'Vacia'
        );
      }).length;

      element.countPrenada = countPreñada;
      element.countAborto = countAborto;
      element.countVacia = countVacia;
    });

    //Eliminar los duplicados
    this.dataReportPalpacion = this.dataReportPalpacion.filter(
      (palpacion, index, self) =>
        index === self.findIndex((t) => t.nombre === palpacion.nombre)
    );

    console.log(this.dataReportPalpacion);
  }

  getReportLeche() {
    // Filtrar los datos de reportes para obtener solo el nombre, dias de produccion, produccion de leche y produccionX
    const lecheData = this.reportes.map((animal) => {
      return animal.comiParto.map((comiParto: any) => {
        // Specify the type of 'produccionLeche' parameter
        return {
          id: animal._id,
          nombre: animal.nombre,
          diasProduccion: comiParto.diaProduccion,
          produccionLeche: comiParto.produccionTotal,
          produccionX: comiParto.produccionX,
        };
      });
    });

    // Aplanar el array de arrays
    this.dataReportLeche = [].concat.apply([], lecheData);
  }

  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;

    if (this.segmentValue === 'celo') {
      this.getReportCelo();
    } else if (this.segmentValue === 'parto') {
      this.getReportParto();
    } else if (this.segmentValue === 'servicio') {
      this.getReportServicio();
    } else if (this.segmentValue === 'palpacion') {
      this.getReportPalpacion();
    } else if (this.segmentValue === 'leche') {
      this.getReportLeche();
    } else if (this.segmentValue === 'all') {
      this.getReportCelo();
      this.getReportParto();
      this.getReportServicio();
      this.getReportPalpacion();
      this.getReportLeche();
    }
  }

  redirectToPalpacion(id: string) {
    this.router.navigate(['/info-vaca/', id]);
  }

  redirectToParto(id: string) {
    this.router.navigate(['/info-vaca/', id]);
  }

  redirectToLeche(id: string) {
    this.router.navigate(['/info-vaca/', id]);
  }
}
