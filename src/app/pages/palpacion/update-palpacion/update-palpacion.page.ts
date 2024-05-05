import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-palpacion',
  templateUrl: './update-palpacion.page.html',
  styleUrls: ['./update-palpacion.page.scss'],
})
export class UpdatePalpacionPage implements OnInit {

  palpacion = {
    id: '',
    fechaCelo: '',
    fechaServicio: '',
    toro: '',
    fechaPalpacion1: '',
    diagnostico1: '',
    fechaPalpacion2: '',
    diagnostico2: '',
    observaciones: ''
  };

  palpacionId: string = '';
  baseUrl = 'https://backend-teg.up.railway.app/animals';

  public showCalendar: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  animalId: string = ''; 

  ngOnInit() {
    this.palpacionId = this.route.snapshot.paramMap.get('palpacionId') ?? '';
    this.animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
    this.getPalpacion();
  
  }
  getPalpacion() {
    const url = `${this.baseUrl}/palpacion/${this.animalId}/${this.palpacionId}`;
    this.http.get(url).subscribe((palpacion: any) => {
      this.palpacion = palpacion;
      this.palpacion.id = this.palpacionId;
    });
  }

  updatePalpacion() {
    const url = `${this.baseUrl}/updatePalpacion/${this.animalId}/${this.palpacionId}`;
    this.http.patch(url, this.palpacion).subscribe(() => {
      this.redirectInfoVaca();
    });

  }

  redirectInfoVaca() {
    this.router.navigate(['/info-palpacion', this.animalId]);

  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }


}
