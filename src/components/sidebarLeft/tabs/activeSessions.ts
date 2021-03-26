import { SliderSuperTab } from "../../slider";
import { SettingSection } from "..";
import Button from "../../button";
import Row from "../../row";
import { Authorization } from "../../../layer";
import { formatDateAccordingToToday } from "../../../helpers/date";
import { attachContextMenuListener, openBtnMenu, positionMenu } from "../../misc";
import { attachClickEvent, findUpClassName, toggleDisability } from "../../../helpers/dom";
import ButtonMenu from "../../buttonMenu";
import PopupConfirmAction from "../../popups/confirmAction";
import apiManager from "../../../lib/mtproto/mtprotoworker";
import { toast } from "../../toast";
import AppPrivacyAndSecurityTab from "./privacyAndSecurity";
import I18n from "../../../lib/langPack";

export default class AppActiveSessionsTab extends SliderSuperTab {
  public privacyTab: AppPrivacyAndSecurityTab;
  public authorizations: Authorization.authorization[];
  private menuElement: HTMLElement;
  
  protected init() {
    this.container.classList.add('active-sessions-container');
    this.setTitle('SessionsTitle');

    const Session = (auth: Authorization.authorization) => {
      const row = new Row({
        title: [auth.app_name, auth.app_version].join(' '),
        subtitle: [auth.ip, auth.country].join(' - '),
        clickable: true,
        titleRight: auth.pFlags.current ? undefined : formatDateAccordingToToday(new Date(Math.max(auth.date_active, auth.date_created) * 1000))
      });

      row.container.dataset.hash = auth.hash;

      const midtitle = document.createElement('div');
      midtitle.classList.add('row-midtitle');
      midtitle.innerHTML = [auth.device_model, auth.system_version].join(', ');

      row.subtitle.parentElement.insertBefore(midtitle, row.subtitle);

      return row;
    };

    const authorizations = this.authorizations.slice();

    {
      const section = new SettingSection({
        name: 'CurrentSession'
      });

      const auth = authorizations.findAndSplice(auth => auth.pFlags.current);
      const session = Session(auth);

      section.content.append(session.container);

      if(authorizations.length) {
        const btnTerminate = Button('btn-primary btn-transparent danger', {icon: 'stop', text: 'TerminateAllSessions'});
        attachClickEvent(btnTerminate, (e) => {
          new PopupConfirmAction('revoke-session', [{
            langKey: 'Terminate',
            isDanger: true,
            callback: () => {
              const toggle = toggleDisability([btnTerminate], true);
              apiManager.invokeApi('auth.resetAuthorizations').then(value => {
                //toggleDisability([btnTerminate], false);
                btnTerminate.remove();
                otherSection.container.remove();
                this.privacyTab.updateActiveSessions();
              }, onError).finally(() => {
                toggle();
              });
            }
          }], {
            title: 'AreYouSureSessionsTitle',
            text: 'AreYouSureSessions'
          }).show();
        });
  
        section.content.append(btnTerminate);
      }

      this.scrollable.append(section.container);
    }

    if(!authorizations.length) {
      return;
    }

    const otherSection = new SettingSection({
      name: 'OtherSessions'
    });

    authorizations.forEach(auth => {
      otherSection.content.append(Session(auth).container);
    });

    this.scrollable.append(otherSection.container);

    const onError = (err: any) => {
      if(err.type === 'FRESH_RESET_AUTHORISATION_FORBIDDEN') {
        toast(I18n.format('RecentSessions.Error.FreshReset', true));
      }
    };

    let target: HTMLElement;
    const onTerminateClick = () => {
      const hash = target.dataset.hash;
      
      new PopupConfirmAction('revoke-session', [{
        langKey: 'Terminate',
        isDanger: true,
        callback: () => {
          apiManager.invokeApi('account.resetAuthorization', {hash})
          .then(value => {
            if(value) {
              target.remove();
              this.privacyTab.updateActiveSessions();
            }
          }, onError);
        }
      }], {
        title: 'AreYouSureSessionTitle',
        text: 'TerminateSessionText'
      }).show();
    };

    const element = this.menuElement = ButtonMenu([{
      icon: 'stop',
      text: 'Terminate',
      onClick: onTerminateClick
    }]);
    element.id = 'active-sessions-contextmenu';
    element.classList.add('contextmenu');

    document.getElementById('page-chats').append(element);

    attachContextMenuListener(this.scrollable.container, (e) => {
      target = findUpClassName(e.target, 'row');
      if(!target || target.dataset.hash === '0') {
        return;
      }

      if(e instanceof MouseEvent) e.preventDefault();
      // smth
      if(e instanceof MouseEvent) e.cancelBubble = true;

      positionMenu(e, element);
      openBtnMenu(element);
    });

    attachClickEvent(this.scrollable.container, (e) => {
      target = findUpClassName(e.target, 'row');
      if(!target || target.dataset.hash === '0') {
        return;
      }

      onTerminateClick();
    });
  }

  onCloseAfterTimeout() {
    if(this.menuElement) {
      this.menuElement.remove();
    }

    return super.onCloseAfterTimeout();
  }
}