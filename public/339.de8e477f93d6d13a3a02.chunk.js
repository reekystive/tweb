"use strict";(this.webpackChunktweb=this.webpackChunktweb||[]).push([[339],{2582:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(4727);class i{constructor(e){this.element=document.body.querySelector("."+e.className),this.container=document.createElement("div"),this.container.className="container center-align",this.imageDiv=document.createElement("div"),this.imageDiv.className="auth-image",this.title=document.createElement("h4"),e.titleLangKey&&this.title.append((0,n.i18n)(e.titleLangKey)),this.subtitle=document.createElement("p"),this.subtitle.className="subtitle",e.subtitleLangKey&&this.subtitle.append((0,n.i18n)(e.subtitleLangKey)),this.container.append(this.imageDiv,this.title,this.subtitle),e.withInputWrapper&&(this.inputWrapper=document.createElement("div"),this.inputWrapper.className="input-wrapper",this.container.append(this.inputWrapper)),this.element.append(this.container)}}},8339:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var n=a(4494),i=a(503),s=a(6858),r=a(6765),l=a(4687),u=a(4727),c=a(9518),p=a(8598),o=a(2582),d=a(4874),m=a(8799),h=a(5565);let v=null;const g=new d.Z("page-signUp",!0,(()=>Promise.all([a.e(714),a.e(272)]).then(a.bind(a,8209)).then((e=>{const t=new o.Z({className:"page-signUp",withInputWrapper:!0,titleLangKey:"YourName",subtitleLangKey:"Login.Register.Subtitle"});t.imageDiv.classList.add("avatar-edit"),t.title.classList.add("fullName");const l=document.createElement("canvas");l.id="canvas-avatar",l.className="avatar-edit-canvas";const d=document.createElement("span");d.className="tgico tgico-cameraadd",t.imageDiv.append(l,d);const g=e.default;let b;t.imageDiv.addEventListener("click",(()=>{(new r.Z).open(l,(e=>{b=e}))}));const L=e=>{const a=w.value||"",n=y.value||"",i=a||n?(a+" "+n).trim():"";i?(0,h.Z)(t.title,p.Z.wrapEmojiText(i)):(0,h.Z)(t.title,(0,u.i18n)("YourName"))},w=new i.Z({label:"FirstName",maxLength:70}),y=new i.Z({label:"LastName",maxLength:64}),f=(0,n.Z)("btn-primary btn-color-primary"),E=new u.default.IntlElement({key:"StartMessaging"});return f.append(E.element),t.inputWrapper.append(w.container,y.container,f),w.input.addEventListener("input",L),y.input.addEventListener("input",L),f.addEventListener("click",(function(e){if(w.input.classList.contains("error")||y.input.classList.contains("error"))return!1;if(!w.value.length)return w.input.classList.add("error"),!1;this.disabled=!0;const t=w.value.trim(),n=y.value.trim(),i={phone_number:v.phone_number,phone_code_hash:v.phone_code_hash,first_name:t,last_name:n};E.update({key:"PleaseWait"});const r=(0,s.y7)(this);c.Z.invokeApi("auth.signUp",i).then((e=>{"auth.authorization"===e._?(c.Z.setUser(e.user),new Promise(((e,t)=>{if(!b)return e();b().then((a=>{g.uploadProfilePhoto(a).then(e,t)}),t)})).finally((()=>{a.e(781).then(a.bind(a,5436)).then((e=>{e.default.mount()}))}))):(E.update({key:e._}),this.removeAttribute("disabled"),r.remove())})).catch((e=>{this.removeAttribute("disabled"),r.remove(),e.type,E.update({key:e.type})}))})),(0,m.Z)(),new Promise((e=>{window.requestAnimationFrame(e)}))}))),(e=>{v=e,l.default.pushToState("authState",{_:"authStateSignUp",authCode:e})}))}}]);
//# sourceMappingURL=339.de8e477f93d6d13a3a02.chunk.js.map