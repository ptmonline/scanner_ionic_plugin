import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  scanned_image: any;
  w: any = window;
  currentDocumentImage = { imageFileUri: '', originalImageFileUri: '' };

  constructor(public navCtrl: NavController) { }

  sdkErrorCallback(error) {
    console.log('Error from Scanbot SDK: ' + error);
    alert('Error from Scanbot SDK: ' + error);
  }
  openScan() {
    let options = {
      textResBundle: {
        autosnapping_hint_do_not_move: "Don't move",
        autosnapping_hint_move_closer: "Move closer",
        autosnapping_hint_bad_angles: "Perspective",
        autosnapping_hint_nothing_detected: "No document",
        autosnapping_hint_too_noisy: "Background too noisy",
        autosnapping_hint_too_dark: "Poor light"
      },
      edgeColor: '#0000ff'
    };

    this.w.ScanbotSdkUi.startCamera((result) => {
      console.log('photo take it')
      this.setCurrentDocumentImage(result);
    }, options)

  }

  startCroppingUi() {

    if (!this.currentDocumentImage.originalImageFileUri) {
      alert('Please snap an image via Camera UI.');
      return;
    }

    let options = {
      imageFileUri: this.currentDocumentImage.originalImageFileUri,
      edgeColor: '#0000ff'
    };

    this.w.ScanbotSdkUi.startCropping((result) => {
      console.log('hello: ', result.imageFileUri)
      console.log('Cropping result: ' + JSON.stringify(result));
      this.setCurrentDocumentImage(result);
    }, this.sdkErrorCallback, options);
  }

  applyImageFilter() {

    if (!this.currentDocumentImage.imageFileUri) {
      alert('Please snap an image via Camera UI.');
      return;
    }

    var options = {
      imageFileUri: this.currentDocumentImage.imageFileUri,
      imageFilter: this.w.ScanbotSdk.ImageFilter.BINARIZED
    };

    this.w.ScanbotSdk.applyImageFilter((result) => {
        console.log('Image filter result: ' + JSON.stringify(result));
        this.setCurrentDocumentImage(result);
      }, this.sdkErrorCallback, options);
  }

  setCurrentDocumentImage(sdkResult) {
    if (this.hasField(sdkResult, 'imageFileUri') && sdkResult.imageFileUri) {
      this.currentDocumentImage.imageFileUri = sdkResult.imageFileUri;
    }
    if (this.hasField(sdkResult, 'originalImageFileUri') && sdkResult.originalImageFileUri) {
      this.currentDocumentImage.originalImageFileUri = sdkResult.originalImageFileUri;
    }
    if (this.currentDocumentImage.imageFileUri !== '') {
      document.getElementById('image-result').setAttribute('src', this.currentDocumentImage.imageFileUri);
    }
  }

  hasField(obj, fieldName) {
    return Object.keys(obj).indexOf(fieldName) != -1;
  }
}
