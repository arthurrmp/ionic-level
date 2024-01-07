import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.scss'],
})
export class SphereComponent {

  @Input() public beta: number = 0;
  @Input() public gamma: number = 0;
  @Input() public success: boolean = false;
  @Input() public bordered: boolean = false;

}
