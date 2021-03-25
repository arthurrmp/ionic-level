import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Motion, OrientationListenerEvent } from '@capacitor/motion';
import { AlertController, IonButton } from '@ionic/angular';

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

  constructor(private alertController: AlertController) { }

  async ngAfterViewInit() {

    document.getElementById("permission").addEventListener('click', async () => {
      try {
        await DeviceMotionEvent.requestPermission();
      } catch (e) {
        const alert = await this.alertController.create({
          subHeader: 'We have not been able to access your device sensors 😞',
          message: 'Your device may not support the DeviceMotion Web API',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      Motion.addListener('orientation', (event: OrientationListenerEvent) => {
        this.motion = event

        if (Math.abs(event.gamma) >= Math.abs(event.beta)) {
          this.angle = Math.round(event.gamma);
        } else {
          this.angle = Math.round(event.beta);
        }
      });
    });
  }


  public isAligned() {
    if (!this.motion) { return false }
    if (this.motion.gamma > this.precision || this.motion.gamma < -this.precision) { return false }
    if (this.motion.beta > this.precision || this.motion.beta < -this.precision) { return false }
    return true;
  }

}
