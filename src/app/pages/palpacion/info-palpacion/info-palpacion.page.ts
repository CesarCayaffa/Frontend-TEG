import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';  
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-info-palpacion',
  templateUrl: './info-palpacion.page.html',
  styleUrls: ['./info-palpacion.page.scss'],
})
export class InfoPalpacionPage implements OnInit, ViewDidEnter {
  private baseUrl = 'https://backend-teg.up.railway.app/animals';
  animalId: string = '';
  animal: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('animalId');
    if (id) {
      this.animalId = id;
    }
  }

  ionViewDidEnter() {
    this.http.get(`${this.baseUrl}/${this.animalId}`).subscribe((data) => {
      this.animal = data;
    });
  }

  // getAnimalById(id: string): Observable<any> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.get(url);
  // }

  addPalpacion(id: string) {
    this.router.navigate(['/add-palpacion', this.animalId]);
  }
  updatePalpacion(palpacionId: string) {
    this.router.navigate(['/update-palpacion', this.animalId, palpacionId]);
  }

  retroceder() {
    this.router.navigate(['/info-vaca', this.animalId]);
  }
}