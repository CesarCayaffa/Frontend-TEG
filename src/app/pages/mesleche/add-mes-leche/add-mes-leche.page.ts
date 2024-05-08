import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-mes-leche',
  templateUrl: './add-mes-leche.page.html',
  styleUrls: ['./add-mes-leche.page.scss'],
})
export class AddMesLechePage implements OnInit {
  lecheMes = {
    idComiParto: '',
    // lecheXmes: [{ mes: '', cantidadLeche: '' },],
    // lecheXmes: Array(12).fill({ mes: '', cantidadLeche: '' }),
    // lecheXmes: [],
    
    lecheXmes: Array<{ mes: string, cantidadLeche: string }>(0),

    fechaSecado: ''
  };
  id: any;
  baseUrl = 'https://backend-teg.up.railway.app/animals';

  public showCalendar: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    for (let i = 0; i < 12; i++) {
      this.lecheMes.lecheXmes.push({ mes: '', cantidadLeche: '' });
    }
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  addLecheMes() {
    const url = `${this.baseUrl}/addLecheMes/${this.id}`;
    this.http.patch(url, this.lecheMes).subscribe(() => {
      this.redirecInfoVaca();
    }
    );
  }

  redirecInfoVaca() {
    this.router.navigate(['/info-mes-leche', this.route.snapshot.paramMap.get('id')]);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

}
