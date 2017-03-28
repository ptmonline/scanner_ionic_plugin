import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
      this.onDeviceReady();
      let w:any = window;
      // w.MobileAccessibility.isScreenReaderRunning(this.isScreenReaderRunningCallback);
      w.MobileAccessibility.isSpeakSelectionEnabled(this.isSpeakSelectionEnabledCallback);
      w.MobileAccessibility.isSpeakScreenEnabled(this.isSpeakScreenEnabledCallback);
      w.MobileAccessibility.isReduceTransparencyEnabled(this.isReduceTransparencyEnabledCallback);
      w.MobileAccessibility.isInvertColorsEnabled(this.isInvertColorsEnabledCallback);
      // w.MobileAccessibility.setTextZoom(200, this.setTextZoomCallback);
      // w.MobileAccessibility.getTextZoom(this.getTextZoomCallback);
      w.MobileAccessibility.updateTextZoom(this.updateTextZoomCallback);
    });
  }

  onDeviceReady() {
    // ...
    this.initScanbotSdk();
    // ...
  }

  initScanbotSdk() {
    var options = {
      loggingEnabled: true,
      licenseKey: '' // optional license key (empty for trial mode)
    };
    
    let w: any = window;
      w.ScanbotSdk.initializeSdk(function (result) {
      // Scanbot SDK successfully initialized
      console.log(result);
    }, function (error) {
      // Error initializing the Scanbot SDK
      console.log('Unable to initialize the Scanbot SDK: ' + error);
    }, options);
  }

























  isScreenReaderRunningCallback(boolean) {
        if (boolean) {
            console.log("Screen reader: ON");
            // Do something to improve the behavior of the application while a screen reader is active.
        } else {
            console.log("Screen reader: OFF");
        }
    }

    setTextZoomCallback(textZoom) {
        console.log('WebView text should be scaled ' + textZoom + '%')
    }
    
    getTextZoomCallback(textZoom) {
        console.log('Current text zoom = ' + textZoom + '%')
    }

    updateTextZoomCallback(textZoom) {
        console.log('WebView text should be scaled ' + textZoom + '%')
    }

    isSpeakSelectionEnabledCallback(boolean) {
        if (boolean) {
            console.log("Speak Selection: ON");
            // Do something to improve the behavior of the application when Speak Selection is enabled.
        } else {
            console.log("Speak Selection: OFF");
        }
    }

    isSpeakScreenEnabledCallback(boolean) {
        if (boolean) {
            console.log("Speak Screen: ON");
            // Do something to improve the behavior of the application when Speak Screen is enabled.
        } else {
            console.log("Speak Screen: OFF");
        }
    }

    isReduceTransparencyEnabledCallback(boolean) {
        if (boolean) {
            console.log("Reduce Transparency: ON");
            // Do something to improve the behavior of the application when reduce transparency is enabled.
        } else {
            console.log("Reduce Transparency: OFF");
        }
    }

    isInvertColorsEnabledCallback(boolean) {
        if (boolean) {
            console.log("Invert Colors: ON");
            // Do something to improve the behavior of the application while Invert Colors is enabled.
        } else {
            console.log("Invert Colors: OFF");
        }
    }

}
