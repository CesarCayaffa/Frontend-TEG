import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

interface Notification {
  recipient: string;
  message: string;
  read: boolean;
  dateSent: Date;
  dateRead?: Date;
  type: 'alert' | 'reminder' | 'news';
  priority: 'low' | 'medium' | 'high';
  additionalData?: any;
}

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  // notifications = [
  //   {
  //     recipient: "ObjectId('60df3eafe8421c13d8b57a7a')",
  //     message: 'Vaca 1 se acerca a su fecha de parto.',
  //     read: false,
  //     dateSent: new Date(),
  //     dateRead: null,
  //     type: 'reminder',
  //     priority: 'high',
  //   },
  //   {
  //     recipient: "ObjectId('60df3eafe8421c13d8b57a7a')",
  //     message: 'Recuerda actualizar la leche del mes 4 de la Vaca 5',
  //     read: false,
  //     dateSent: new Date(),
  //     dateRead: null,
  //     type: 'reminder',
  //     priority: 'high',
  //   },
  //   {
  //     recipient: "ObjectId('60df3eafe8421c13d8b57a7c')",
  //     message: 'Vaca 12 produciendo menos leche de lo normal.',
  //     read: false,
  //     dateSent: new Date(),
  //     dateRead: null,
  //     type: 'alert',
  //     priority: 'low',
  //   },
  //   {
  //     recipient: "ObjectId('60df3eafe8421c13d8b57a7d')",
  //     message: 'Toro 2 necesita atención veterinaria.',
  //     read: false,
  //     dateSent: new Date(),
  //     dateRead: null,
  //     type: 'reminder',
  //     priority: 'high',
  //   },
  // ];

  notifications: Notification[] = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    console.log('NotificacionesPage');
  }
}
