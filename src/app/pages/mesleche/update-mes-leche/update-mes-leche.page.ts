import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-mes-leche',
  templateUrl: './update-mes-leche.page.html',
  styleUrls: ['./update-mes-leche.page.scss'],
})
export class UpdateMesLechePage implements OnInit {
  lecheMes = {
    id: '',
    mes: '',
    cantidadLeche: '',
    fechaSecado: ''
  };
  lecheMesId: string = '';
  baseUrl = 'https://backend-teg.up.railway.app/animals';
  
  public showCalendar: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
  animalId: string = '';

  ngOnInit() {
    this.lecheMesId = this.route.snapshot.paramMap.get('lecheMesId') ?? '';
    this.animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
    this.getLecheMes();
  }

  getLecheMes() {
    const url = `${this.baseUrl}/lecheMes/${this.animalId}/${this.lecheMesId}`;
    this.http.get(url).subscribe((lecheMes: any) => {
      this.lecheMes = lecheMes;
      this.lecheMes.id = this.lecheMesId;
    });
    console.log(url)
  }

  updateLecheMes() {
    const url = `${this.baseUrl}/updateLecheMes/${this.animalId}/${this.lecheMesId}`;
    this.http.patch(url, this.lecheMes).subscribe(() => {
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
