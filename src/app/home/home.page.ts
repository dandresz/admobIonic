import { Component } from '@angular/core';
import { AdMob, AdMobRewardItem, AdOptions,
        BannerAdOptions, BannerAdPosition,
        BannerAdSize, RewardAdOptions, RewardAdPluginEvents,
} from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    this.initialize();
  }

  async initialize(){
    const { status } = await AdMob.trackingAuthorizationStatus();
    
    if(status === 'notDetermined'){
      console.log('Display information before ads load first time');
    }
    AdMob.initialize({
      requestTrackingAuthorization:true,
      testingDevices: ['yourtestdevicecode'],
      initializeForTesting: true,
    });
  }

  async showBanner(){
    const adId = isPlatform('ios') ? 'ios-ad-id': 'android-ad-unit';
    const options: BannerAdOptions= {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
    };

    await AdMob.showBanner(options);
  }

  async hideBanner(){
    await AdMob.hideBanner();
    await AdMob.removeBanner();
  }
  
  async showInterstitial(){
    const options: AdOptions = {
      adId: 'YOUR AD ID',
      isTesting: true,
    };
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }

  async showRewardVideo(){
    AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: AdMobRewardItem) => {
          console.log('REWARD:', reward);
      }
    );
    const options: RewardAdOptions = {
        adId: 'your id',
        isTesting: true,
    };

    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();
  }

}
