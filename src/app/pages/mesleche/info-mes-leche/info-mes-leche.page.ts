import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-info-mes-leche',
  templateUrl: './info-mes-leche.page.html',
  styleUrls: ['./info-mes-leche.page.scss'],
})
export class InfoMesLechePage implements OnInit, ViewDidEnter{
  private baseUrl = 'https://backend-teg.up.railway.app/animals';
  animalId: string = '';
  animal: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertController: AlertController,
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

  addLecheMes(id: string) {
    this.router.navigate(['/add-mes-leche', this.animalId]);
  }
  updateLecheMes(mesLecheId: string) {
    this.router.navigate(['/update-mes-leche', this.animalId, mesLecheId]);
  }

  retroceder() {
    this.router.navigate(['/info-vaca', this.animalId]);
  }
  
  getLastNonEmptyMes(lecheXmes: any[]) {
    const nonEmptyMes = lecheXmes.filter(leche => leche.mes !== null);
    return nonEmptyMes.length > 0 ? nonEmptyMes.slice(-1)[0].mes : null;
  }
  
  getLastNonEmptyCantidadLeche(lecheXmes: any[]) {
    const nonEmptyCantidadLeche = lecheXmes.filter(leche => leche.cantidadLeche !== null);
    return nonEmptyCantidadLeche.length > 0 ? nonEmptyCantidadLeche.slice(-1)[0].cantidadLeche : null;
  }
}
