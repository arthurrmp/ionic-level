import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Motion, OrientationListenerEvent } from '@capacitor/motion';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements AfterViewInit {

  @ViewChild('permission') buttonPermission: IonButton;
  public motion: OrientationListenerEvent;

  public angle: number = 0;
  public precision: number = 0.8;

  constructor() { }

  async ngAfterViewInit() {

    console.log(document.getElementsByClassName("permission"));

    document.getElementsByClassName("permission")[0].addEventListener('click', async () => {
      try {
        await DeviceMotionEvent.requestPermission();
      } catch (e) {
        // Handle error
        this.motion = e;
        //return;
      }


      // Once the user approves, can start listening:
      Motion.addListener('orientation', (event: OrientationListenerEvent) => {
        this.motion = event

        if (Math.abs(event.gamma) >= Math.abs(event.beta)) {
          this.angle = Math.round(event.gamma);
        } else {
          this.angle = Math.round(event.beta);
        }


        /* if (!(this.motion.beta < -43 || this.motion.beta > 43)) {
          this.motion.beta = 43;
        } */


      });

      /* var ball = document.querySelector<HTMLElement>('.ball') ;
      var garden = document.querySelector<HTMLElement>('.garden');
      var output = document.querySelector<HTMLElement>('.output');

      var maxX = garden.clientWidth - ball.clientWidth;
      var maxY = garden.clientHeight - ball.clientHeight;

      function handleOrientation(event) {
        var x = event.beta;  // In degree in the range [-180,180)
        var y = event.gamma; // In degree in the range [-90,90)

        output.textContent = `beta : ${x}\n`;
        output.textContent += `gamma: ${y}\n`;

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x > 90) { x = 90 };
        if (x < -90) { x = -90 };

        // To make computation easier we shift the range of
        // x and y to [0,180]
        x += 90;
        y += 90;

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        ball.style.top = (maxY * y / 180 - 10) + "px";
        ball.style.left = (maxX * x / 180 - 10) + "px";
      }

      //window.addEventListener('deviceorientation', handleOrientation);
      Motion.addListener('orientation', handleOrientation)
 */


    });



    /*  window.addEventListener('devicemotion', (event) => {
       this.motion = event.acceleration.x + ' m/s2';
     }) */
  }


  public isAligned() {
    if (!this.motion) { return false }
    if (this.motion.gamma > this.precision || this.motion.gamma < -this.precision) { return false }
    if (this.motion.beta > this.precision || this.motion.beta < -this.precision) { return false }
    return true;
  }

}
