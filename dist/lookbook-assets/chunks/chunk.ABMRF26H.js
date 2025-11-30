import{a as m}from"./chunk.EW4DSN6G.js";import{a as n}from"./chunk.APC6PXV2.js";import{b as r}from"./chunk.3YCYIIWW.js";import{a as p}from"./chunk.J33USGNF.js";import{a as l,c as s,d as a}from"./chunk.DJWHC2VF.js";import{a as t}from"./chunk.KPKYWVQS.js";import{e as i}from"./chunk.XPFMMO3L.js";var e=class extends r(p){constructor(){super(...arguments);this.panelHeight=n.inspector.panelHeight}handleSplitPanelResize(){this.panelHeight=this.splitPanel.positionInPixels?this.splitPanel.positionInPixels:this.panelHeight}render(){return t`
      <wa-split-panel
        id="split-panel"
        orientation="vertical"
        primary="end"
        position-in-pixels="${this.panelHeight}"
        @wa-reposition="${this.handleSplitPanelResize}"
      >
        <div
          id="preview"
          slot="start"
        >
          <slot name="preview"></slot>
        </div>
        <div
          id="panels"
          slot="end"
        >
          <slot name="panels"></slot>
        </div>
      </wa-split-panel>
    `}};e.css=m,e.persist=["panelHeight"],i([s()],e.prototype,"panelHeight",2),i([a("#split-panel")],e.prototype,"splitPanel",2),e=i([l("lb-inspector")],e);export{e as a};
