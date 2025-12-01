import { LookbookElement } from "@lib/element.js";
import { customElement, html, live, nothing, property, PropertyValues, state } from "@lib/lit.js";
import { WithInternals } from "@mixins";

import inputStyles from "../../styles/inputs.css?text";
import styles from "./control.css?text";

const INPUT_TYPES = ["text", "email", "number", "password", "date", "datetime-local", "month", "time", "week"];
const CHECKBOX_TYPES = ["toggle", "checkbox"];

/**
 * <lb-control>
 *
 * @summary Preview control component.
 */
@customElement("lb-control")
export class LookbookControl extends WithInternals(LookbookElement) {
  static css = [inputStyles, styles];
  static formAssociated = true;

  @property() label: string;
  @property() hint: string;
  @property() description: string;
  @property() target: string;
  @property() name: string;
  @property({ reflect: true }) value: string;
  @property() field: string = "text";
  @property({ type: Array }) choices: Array<Array<string>> = [];
  @property({ type: Object }) options: object = {};

  @state()
  protected get fieldType() {
    if (INPUT_TYPES.includes(this.field)) {
      return "input";
    } else if (CHECKBOX_TYPES.includes(this.field)) {
      return "checkbox";
    } else {
      return this.field;
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("value")) {
      if (changedProperties.get("value") !== undefined) {
        this.internals.setFormValue(this.value);
        this.dispatch("lb-param-change", {
          name: this.name,
          value: this.value,
        });
      }
    }
  }

  protected updateValue(event) {
    this.value = event.target.value;
  }

  protected renderField() {
    switch (this.fieldType) {
      case "input":
        return this.renderInput();
      case "textarea":
        return this.renderTextarea();
      case "select":
        return this.renderSelect();
      case "checkbox":
        return this.renderCheckbox();
      default:
        return html`<small>Unknown control type '${this.fieldType}'</small>`;
    }
  }

  protected renderInput() {
    const inputType = INPUT_TYPES.includes(this.field) || nothing;

    return html`
      <input
        id="input-field"
        type="${inputType}"
        name="${this.name}"
        value="${this.value}"
        @input="${this.updateValue}"
      />
    `;
  }

  protected renderSelect() {
    return html`
      <select
        id="input-field"
        name="${this.name}"
        @change="${this.updateValue}"
      >
        ${this.choices?.map(([name, value]) => {
          return html`<option
            value="${value}"
            ?selected="${this.value === value}"
          >
            ${name}
          </option>`;
        })}
      </select>
    `;
  }

  protected renderTextarea() {
    return html`
      <textarea
        id="input-field"
        name="${this.name}"
        resize="auto"
        @input="${this.updateValue}"
      >
${this.value}</textarea
      >
    `;
  }

  protected renderCheckbox() {
    const role = this.field === "toggle" ? "switch" : "checkbox";
    return html`
      <input
        id="input-field"
        name="${this.name}"
        type="checkbox"
        value="${this.value === "true" ? "false" : "true"}"
        role="${role}"
        ?checked="${this.value === "true"}"
        @change="${this.updateValue}"
      />
    `;
  }

  render() {
    return html`
      <div id="container">
        <label for="input-field">${this.label}</label>
        ${this.renderField()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-control": LookbookControl;
  }
}
