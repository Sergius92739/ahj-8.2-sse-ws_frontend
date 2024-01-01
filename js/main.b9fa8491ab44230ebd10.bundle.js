"use strict";(self.webpackChunkahj_8_2_sse_ws_frontend=self.webpackChunkahj_8_2_sse_ws_frontend||[]).push([[179],{549:()=>{class t{constructor(t){this.url=t,this.contentTypeHeader={"Content-Type":"application/json"}}add(t){const e={url:`${this.url}/instances/add`,settigs:{body:JSON.stringify(t),method:"POST",headers:this.contentTypeHeader}};return this.createRequest(e)}changeStatus(t){const e={url:`${this.url}/instances/stateChange`,settigs:{body:JSON.stringify(t),method:"POST",headers:this.contentTypeHeader}};return this.createRequest(e)}delete(t){const e={url:`${this.url}/instances/delete/${t.id}/${t.command}`,settigs:{method:"DELETE",headers:this.contentTypeHeader}};return this.createRequest(e)}createRequest(t){return fetch(t.url,t.settigs)}}class e{static log(t,s,n){return`<li class="column__point">\n    <div class="point__date">${e.cleanDate(t)}</div>\n    <div class="point__id">\n      <span class="point-id__text">Server: </span>\n      <span class="piont-id__id">${s}</span>\n    </div>\n    <div class="point__info">\n      <span class="point-info__text">INFO: </span>\n      <span class="point-info__info">${n}</span>\n    </div>\n  </li>`}static instance(t,e){return`<form data-id="${t}" class="column__item">\n    <div class="item__id">\n      <span class="item-id__text">ID:</span>\n      <span class="item-id__id">${t}</span>\n    </div>\n    <div class="item__status">\n      <span class="item-status__text">Status:</span>\n      <span id="indicator" class="item-status__indicator"></span>\n      <span class="item-status__state">${e}</span>\n    </div>\n    <div class="item__actions">\n      <span class="item-actions__text">Actions:</span>\n      <span data-name="started" class="item-actions__btn start"></span>\n      <span data-name="stopped" class="item-actions__btn stop visually_hidden"></span>\n      <span data-name="removed" class="item-actions__btn remove"></span>\n    </div>\n  </form>`}static cleanDate(t){const e=t.split(" ");return this.date=[e[1],e[0].slice(0,-1)].join(" "),this.date}}new class{constructor(e){"string"==typeof e&&(this.container=document.querySelector(e)),this.container=e,this.worklog=this.container.querySelector('[data-name="worklog"]'),this.instances=this.container.querySelector('[data-name="instances"]'),this.creatInstanceBtn=this.container.querySelector(".link"),this.api=new t("https://ahj-8-2-sse-ws-backend.onrender.com"),this.sse=new EventSource("https://ahj-8-2-sse-ws-backend.onrender.com/sse"),this.intervals=new Map,this.getSseData=this.getSseData.bind(this),this.onCreateLinkClick=this.onCreateLinkClick.bind(this),this.onInstanceClick=this.onInstanceClick.bind(this)}init(){this.creatInstanceBtn.addEventListener("click",this.onCreateLinkClick),this.sse.addEventListener("message",this.getSseData),this.instances.addEventListener("click",this.onInstanceClick)}getSseData(t){if(t.data){const e=JSON.parse(t.data);e.info&&this.drawLog(e),"created"===e.action&&this.drawInstance(e.instance),"started"===e.action&&this.startInstance(e.instance),"stopped"===e.action&&this.stopInstance(e.instance),"removed"===e.action&&this.deleteInstance(e.instance)}}deleteInstance(t){this.container.querySelector(`[data-id="${t.id}"]`).remove()}stopInstance(t){const e=this.instances.querySelector(`[data-id="${t.id}"]`),s=e.querySelector(".item-status__state"),n=e.querySelector(".item-status__indicator"),a=e.querySelector('[data-name="started"]'),i=e.querySelector('[data-name="stopped"]');s.textContent=t.state,a.classList.remove("visually_hidden"),i.classList.add("visually_hidden"),this.cancelFlashing(n,e.dataset.id)}startInstance(t){const e=this.instances.querySelector(`[data-id="${t.id}"]`),s=e.querySelector(".item-status__state"),n=e.querySelector(".item-status__indicator"),a=e.querySelector('[data-name="started"]'),i=e.querySelector('[data-name="stopped"]');s.textContent=t.state,a.classList.add("visually_hidden"),i.classList.remove("visually_hidden"),this.getFlashing(n,e.dataset.id)}getFlashing(t,e){const s=setInterval((()=>{t.classList.toggle("running")}),200);this.intervals.set(e,s)}cancelFlashing(t,e){clearInterval(this.intervals.get(e)),this.intervals.delete(e),t.className="item-status__indicator"}drawInstance(t){this.instances.insertAdjacentHTML("beforeend",e.instance(t.id,t.state))}drawLog(t){this.worklog.insertAdjacentHTML("beforeend",e.log(t.date,t.server,t.info))}onInstanceClick(t){"started"!==t.target.dataset.name&&"stopped"!==t.target.dataset.name||this.onActionsBtnClick(t,this.api.changeStatus.bind(this.api)),"removed"===t.target.dataset.name&&this.onActionsBtnClick(t,this.api.delete.bind(this.api))}async onCreateLinkClick(t){t.preventDefault();const e=await this.api.add({command:t.target.dataset.name});this.getResponse(e)}async onActionsBtnClick(t,e){const{id:s}=t.target.closest(".column__item").dataset,n=await e({id:s,command:t.target.dataset.name});this.getResponse(n)}async getResponse(t){return t.ok?(this.json=await t.json(),this.json):t.status}}(document.querySelector(".page__body")).init()}},t=>{var e;e=549,t(t.s=e)}]);