// lo8ding-lib/src/components/SimpleLoader.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('simple-loader')
export class SimpleLoader extends LitElement {
  @property({ type: String, attribute: 'loader-class', reflect: true })
  loaderClass = '';
  @property({ type: Object })
  customStyle: Partial<CSSStyleDeclaration> = {};

  createRenderRoot() {
    return this;
  }

  render() {
    const styleString = Object.entries(this.customStyle)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');

    return html`
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white dark:border-white ${this
          .loaderClass}"
        style="${styleString}"
      ></div>
    `;
  }
}
