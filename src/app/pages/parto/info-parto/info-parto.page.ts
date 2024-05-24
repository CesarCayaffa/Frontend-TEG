import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-info-parto',
  templateUrl: './info-parto.page.html',
  styleUrls: ['./info-parto.page.scss'],
})
export class InfoPartoPage implements OnInit, ViewDidEnter {
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


      if (this.animal.comiParto) {
        this.animal.comiParto.sort((a: any, b: any) => {
          const dateA = new Date(a.fechaParto);
          const dateB = new Date(b.fechaParto);
          return dateA.getTime() - dateB.getTime();
        });
      }
    });
  }

  addParto(id: string) {
    this.router.navigate(['/add-parto', this.animalId]);
  }
  updateParto(partoId: string) {
    this.router.navigate(['/update-parto', this.animalId, partoId]);
  }

  retroceder() {
    this.router.navigate(['/info-vaca', this.animalId]);
  }
}
