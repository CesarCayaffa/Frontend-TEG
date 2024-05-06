import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-parto',
  templateUrl: './add-parto.page.html',
  styleUrls: ['./add-parto.page.scss'],
})
export class AddPartoPage implements OnInit {
  comiParto = {
    fechaParto: '',
    sexoBecerro: '',
    pesoBecerroKg: '',
    diaProduccion: '',
    produccionTotal: '',
    produccionX: '',
    observacion: ''
  };
  id: any;
  baseUrl = 'https://backend-teg.up.railway.app/animals';

  public showCalendar: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  addParto() {
    const url = `${this.baseUrl}/addParto/${this.id}`;
    this.http.patch(url, this.comiParto).subscribe(() => {
      this.redirecInfoVaca();
    }
    );
  }

  redirecInfoVaca() {
    this.router.navigate(['/info-parto', this.route.snapshot.paramMap.get('id')]);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

}
