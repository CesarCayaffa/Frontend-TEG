import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-palpacion',
  templateUrl: './add-palpacion.page.html',
  styleUrls: ['./add-palpacion.page.scss'],
})
export class AddPalpacionPage implements OnInit {
  palpacion = {
    fechaCelo: '',
    fechaServicio: '',
    toro: '',
    fechaPalpacion1: '',
    diagnostico1: '',
    fechaPalpacion2: '',
    diagnostico2: '',
    observaciones: ''
  };
  id: any;
  baseUrl = 'https://backend-teg.up.railway.app/animals';



  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  addPalpacion() {
    const url = `${this.baseUrl}/addPalpacion/${this.id}`;
    this.http.patch(url, this.palpacion).subscribe(() => {
      this.redirectInfoVaca();
    }
    );
  }


  redirectInfoVaca() {
    this.router.navigate(['/info-palpacion', this.route.snapshot.paramMap.get('id')]);
  }


}
