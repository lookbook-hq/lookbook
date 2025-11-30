import{a as f}from"./chunk.6QPB65KO.js";import{a as h}from"./chunk.KPSBC2JF.js";import{b as u}from"./chunk.3YCYIIWW.js";import{a as m}from"./chunk.J33USGNF.js";import{a as p,b as d,c,d as o,e as b}from"./chunk.DJWHC2VF.js";import{a as r}from"./chunk.KPKYWVQS.js";import{e as l}from"./chunk.XPFMMO3L.js";var s=class extends u(m){constructor(){super(...arguments);this.items=[]}async updated(e){var t;if(e.has("panel")){let a=this.getPanels();this.setActivePanel(this.panel||((t=a[0])==null?void 0:t.name))}}getPanels(){var t;let e=(t=this.panelSlot)==null?void 0:t.assignedElements({flatten:!0});return e?e.filter(a=>a.localName==="lb-panel"):[]}getTabs(){return Array.from(this.tabButtons||[])}async handleSlotChange(){let e=this.getPanels();e.forEach(t=>t.id=t.id||h()),this.items=e.map(t=>{let{name:a,label:n,id:g}=t;a||console.error("Missing `name` attribute for panel",t);let i=`${g}-tab`;return t.setAttribute("aria-describedby",i),{label:n,panel:a,id:i}}),this.requestUpdate()}async setActivePanel(e){let t=this.getTabs(),a=this.getPanels();if(e){this.panel=e;for(let n of t)n.active=n.dataset.panel===e;for(let n of a)n.visible=n.name===e}}handleTabClick(e){let a=e.target.closest("lb-button");this.panel=a.dataset.panel}renderTabs(){let e=this.getPanels();return this.items.map(t=>{let a=e.find(n=>n.name===t.panel);return a&&r`
            <lb-button
              id="${t.id}"
              class="tab"
              role="tab"
              data-panel="${a.name}"
              aria-controls="${a.id}"
              ?active="${this.panel===a.name}"
              @click="${this.handleTabClick}"
            >
              <span>${t.label}</span>
            </lb-button>
          `}).filter(t=>t)}render(){return r`
      <lb-toolbar id="toolbar">
        <div
          id="tabs"
          slot="start"
        >
          ${this.renderTabs()}
        </div>
        <div slot="end"></div>
      </lb-toolbar>
      <div id="panels">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};s.css=f,s.persist=["panel"],s.slotAttributeDefault="panels",l([d()],s.prototype,"panel",2),l([c()],s.prototype,"items",2),l([o("#panels > slot")],s.prototype,"panelSlot",2),l([o("#toolbar")],s.prototype,"toolbar",2),l([b('lb-button[role="tab"]')],s.prototype,"tabButtons",2),s=l([p("lb-panels")],s);export{s as a};
