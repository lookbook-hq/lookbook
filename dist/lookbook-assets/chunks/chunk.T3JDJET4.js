import{a as d}from"./chunk.APC6PXV2.js";import{b as n}from"./chunk.3YCYIIWW.js";import{a as p}from"./chunk.AOO774RC.js";import{a as r}from"./chunk.J33USGNF.js";import{a as s,c as a,d as l}from"./chunk.DJWHC2VF.js";import{a as t}from"./chunk.KPKYWVQS.js";import{e as i}from"./chunk.XPFMMO3L.js";var e=class extends n(r){constructor(){super(...arguments);this.sidebarWidth=d.app.sidebarWidth}handleSplitPanelResize(){this.sidebarWidth=this.splitPanel.positionInPixels?this.splitPanel.positionInPixels:this.sidebarWidth}render(){return t`
      <div
        id="header"
        divider="block-end"
      >
        <slot name="header"></slot>
      </div>
      <wa-split-panel
        id="split-panel"
        primary="start"
        position-in-pixels="${this.sidebarWidth}"
        @wa-reposition="${this.handleSplitPanelResize}"
      >
        <div
          id="sidebar"
          slot="start"
        >
          <slot name="sidebar"></slot>
        </div>
        <div
          id="main"
          slot="end"
        >
          <slot></slot>
        </div>
      </wa-split-panel>
    `}};e.css=p,e.persist=["sidebarWidth"],i([a()],e.prototype,"sidebarWidth",2),i([l("#split-panel")],e.prototype,"splitPanel",2),e=i([s("lb-app")],e);export{e as a};
