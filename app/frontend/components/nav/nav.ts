import "@awesome.me/webawesome/dist/components/tree-item/tree-item.js";
import "@awesome.me/webawesome/dist/components/tree/tree.js";
import type { LookbookDataEvent } from "@events";
import { LookbookElement } from "@lib/element.js";
import { classMap, customElement, html, nothing, property, repeat, state } from "@lib/lit.js";
import { hasChanged } from "@lib/utils.js";
import { Persistable } from "@mixins";
import { uniq, without } from "es-toolkit";

import { isEmpty } from "es-toolkit/compat";
import { literal, unsafeStatic } from "lit/static-html.js";
import styles from "./nav.css?text";

interface LookbookNavItem {
  children: Array<LookbookNavItem>;
  type: string;
  leaf: boolean;
  id?: string;
  label?: string;
  href?: string;
  icon?: string;
}

/**
 * <lb-nav>
 *
 * @summary Tree navigation component.
 */
@customElement("lb-nav")
export class LookbookNav extends Persistable(LookbookElement) {
  static css = styles;
  static persist = ["collapsed"];

  @property({ type: Array, useDefault: true }) collapsed: Array<string> = [];
  @property({ attribute: "activepath" }) activePath: string;

  @state({ hasChanged }) allItems: Array<LookbookNavItem> = [];
  @state() filtered = false;

  @state()
  get items() {
    return this.filtered ? this.filteredItems : this.allItems;
  }

  @state()
  get filteredItems() {
    return this.allItems; // TODO: allow filtering of items
  }

  protected handleData(event: LookbookDataEvent) {
    const items = event.detail.value || [];
    if (Array.isArray(items)) {
      this.allItems = items;
    } else {
      this.warn("Data provided to the `lb-nav` component must be an array");
    }
  }

  protected handleCollapse(event: Event) {
    if (event.target?.id) {
      const collapsed = uniq([...this.collapsed, event.target.id]);
      this.collapsed = collapsed;
    }

    event.stopPropagation();
  }

  protected handleExpand(event: Event) {
    if (event.target?.id) {
      this.collapsed = without(this.collapsed, event.target.id);
    }

    event.stopPropagation();
  }

  protected toggleItem(event: PointerEvent) {
    if (!event.target) return;

    const treeItem = event.target.closest("wa-tree-item");
    treeItem.expanded = !treeItem.expanded;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  protected handleLinkClick(event: PointerEvent) {
    if (!event.target) return;

    const treeItem = event.target.closest("wa-tree-item");
    if (treeItem.getChildrenItems().length) {
      treeItem.expanded = treeItem.selected ? !treeItem.expanded : true;
    }
    event.preventDefault();
  }

  protected handleSelection(event: CustomEvent) {
    const itemLink = event.detail.selection[0].querySelector("a[href]");
    if (itemLink) {
      this.dispatch("lb-command", "visit", { url: itemLink.href });
      event.preventDefault();
    }
  }

  protected renderItem(item: LookbookNavItem) {
    const expanded = !this.collapsed.includes(item.id);
    const isLink = !isEmpty(item.href);

    const labelClasses = classMap({
      "nav-label": true,
      "nav-label-leaf": item.leaf,
    });

    const labelContent = () => html`
      ${item.icon ? html`<lb-icon name="${item.icon}"></lb-icon>` : nothing}
      <span>${item.label}</span>
      ${!expanded && item.children.length
        ? html`<small class="child-count">[${item.children.length}]</small>`
        : nothing}
    `;

    return html`
      <wa-tree-item
        ?selected="${item.href === this.activePath}"
        ?expanded="${expanded}"
        id="${item.id}"
        data-node-type="${item.children.length ? "branch" : "leaf"}"
        @wa-collapse="${(e: Event) => this.handleCollapse(e)}"
        @wa-expand="${(e: Event) => this.handleExpand(e)}"
      >
        <lb-icon
          name="chevron-right"
          slot="expand-icon"
        ></lb-icon>
        <lb-icon
          name="chevron-right"
          slot="collapse-icon"
        ></lb-icon>
        ${isLink
          ? html`
              <a
                href="${item.href}"
                class="${labelClasses}"
                @click="${this.handleLinkClick}"
              >
                ${labelContent()}
              </a>
            `
          : html`
            <button class="${labelClasses}" @click="${this.toggleItem}">${labelContent()}</span>
          `}
        ${repeat(item.children, (i: LookbookNavItem) => i.id, this.renderItem.bind(this))}
      </wa-tree-item>
    `;
  }

  render() {
    return html`
      <div
        id="container"
        @lb-data="${(event: LookbookDataEvent) => this.handleData(event)}"
        @wa-selection-change="${(e) => this.handleSelection(e)}"
      >
        <wa-tree selection="single">
          ${repeat(
            this.items,
            (item: LookbookNavItem) => item.id,
            (item) => this.renderItem(item)
          )}
        </wa-tree>
        <div
          id="blank-slate"
          ?hidden="${this.allItems.length > 0}"
        >
          <slot name="blank-slate"></slot>
        </div>
        <div
          id="no-results"
          ?hidden="${!this.filtered || this.filteredItems.length > 0}"
        >
          <slot name="no-results"></slot>
        </div>
        <slot
          name="items"
          hidden
        ></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-nav": LookbookNav;
  }
}
