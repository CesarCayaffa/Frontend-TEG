import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-pop-over-info',
  templateUrl: './pop-over-info.component.html',
  styleUrls: ['./pop-over-info.component.scss'],
})
export class PopOverInfoComponent  implements OnInit {

  @Input() id!: string;
  @Input() masInfoPalpacion!: () => void;
  @Input() masInfoParto!: () => void;
  @Input() masInfoLecheMes!: () => void;

  constructor() { }

  ngOnInit() {
    console.log(this.id);
  }

}
