import { Component } from '@angular/core';
import { Motion, OrientationListenerEvent } from '@capacitor/motion';
import { AlertController } from '@ionic/angular';

const TOLERANCE = 0.7;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public motion: OrientationListenerEvent;
  public angle: number = 0;

  public technologies = [
    {
      icon: 'logo-angular',
      link: 'https://angular.io',
    },
    {
      icon: 'logo-ionic',
      link: 'https://ionicframework.com',
    },
    {
      icon: 'logo-capacitor',
      link: 'https://capacitorjs.com',
    },
  ] as const;

  constructor(private alertController: AlertController) {}

  async requestPermission() {
    try {
      await (
        DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
      ).requestPermission();
      this.addOrientationListener();
    } catch (e) {
      const alert = await this.alertController.create({
        subHeader: 'We have not been able to access your device sensors 😞',
        message: 'Your device may not support the DeviceMotion Web API',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  addOrientationListener() {
    Motion.addListener('orientation', (event: OrientationListenerEvent) => {
      this.motion = event;

      const { beta, gamma } = event;

      this.angle =
        Math.abs(gamma) >= Math.abs(beta)
          ? Math.round(gamma)
          : Math.round(beta);
    });
  }

  public isAligned() {
    if (
      !this.motion ||
      Math.abs(this.motion?.gamma) > TOLERANCE ||
      Math.abs(this.motion?.beta) > TOLERANCE
    ) {
      return false;
    }

    return true;
  }
}
