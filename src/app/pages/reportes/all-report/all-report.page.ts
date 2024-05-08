import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { disableDebugTools } from '@angular/platform-browser';

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
  progress: number = 0;

  public segmentValue: string = 'celo';
  header: string = 'celo';
  reportes: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {

    setInterval(() => {
      this.progress += 0.01;
        if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
          this.isLoading = false;
        }, 1000);
      }
    }, 50);

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
    this.dataReportCelo = this.dataReportCelo.filter((celo, index, self) =>
      index === self.findIndex((t) => (
        t.nombre === celo.nombre
      ))
    );
    


    console.log(this.dataReportCelo);
  }

  getReportParto() {

  }

  getReportServicio() {
    // Filtrar los datos de reportes para obtener solo el nombre y la fecha de servicio
    const servicioData = this.reportes.map((animal) => {
      return animal.palpaciones.map((palpacion: any) => {
        // Specify the type of 'servicio' parameter
        return {
          nombre: animal.nombre,
          fecha: palpacion.fechaServicio,
        };
      });
    });

    // Aplanar el array de arrays
    this.dataReportServicio = [].concat.apply([], servicioData);
  }

  getReportPalpacion() {
    // Filtrar los datos de reportes para obtener solo el nombre y la fecha de palpacion
    const palpacionData = this.reportes.map((animal) => {
      return animal.palpaciones.map((palpacion: any) => {
        // Specify the type of 'palpacion' parameter
        return {
          nombre: animal.nombre,
          diagnostico1: palpacion.diagnostico1,
          diagnostico2: palpacion.diagnostico2,
        };
      });
    });

    // Aplanar el array de arrays
    this.dataReportPalpacion = [].concat.apply([], palpacionData);
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
    }
  }

  
}
