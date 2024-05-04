import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-parto',
  templateUrl: './update-parto.page.html',
  styleUrls: ['./update-parto.page.scss'],
})
export class UpdatePartoPage implements OnInit {
  comiParto = {
    id: '',
    fechaParto: '',
    sexoBecerro: '',
    pesoBecerroKg: '',
    diaProduccion: '',
    produccionTotal: '',
    produccionX: '',
    observacion: ''
  };

  partoId: string = '';
  baseUrl = 'https://backend-teg.up.railway.app/animals';

  public showCalendar: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  animalId: string = '';

  ngOnInit() {
    this.partoId = this.route.snapshot.paramMap.get('partoId') ?? '';
    this.animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
    this.getParto();
  }
  getParto() {
    const url = `${this.baseUrl}/parto/${this.animalId}/${this.partoId}`;
    this.http.get(url).subscribe((parto: any) => {
      this.comiParto = parto;
      this.comiParto.id = this.partoId;
    });
  }

  updateParto() {
    const url = `${this.baseUrl}/updateParto/${this.animalId}/${this.partoId}`;
    this.http.patch(url, this.comiParto).subscribe(() => {
      this.redirectInfoVaca();
    });

  }

  redirectInfoVaca() {
    this.router.navigate(['/info-vaca', this.animalId]);

  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

}
