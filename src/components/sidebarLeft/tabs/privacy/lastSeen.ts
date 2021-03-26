import { SliderSuperTabEventable } from "../../../sliderTab";
import PrivacySection from "../../../privacySection";
import { LangPackKey } from "../../../../lib/langPack";

export default class AppPrivacyLastSeenTab extends SliderSuperTabEventable {
  protected init() {
    this.container.classList.add('privacy-tab', 'privacy-last-seen');
    this.setTitle('PrivacyLastSeen');

    const caption: LangPackKey = 'PrivacySettingsController.LastSeenDescription';
    new PrivacySection({
      tab: this,
      title: 'LastSeenTitle',
      inputKey: 'inputPrivacyKeyStatusTimestamp',
      captions: [caption, caption, caption],
      exceptionTexts: ['PrivacySettingsController.NeverShare', 'PrivacySettingsController.AlwaysShare'],
      appendTo: this.scrollable
    });
  }
}