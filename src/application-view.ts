import { html, css, OmniElement } from 'omni-ui';
import './app/components/application-header/application-header';
import './app/components/popup/';

export class InfluencerData extends OmniElement {

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          --app-header-height: 60px;
          --app-font-color: #3b3e3f;
          background-color: #f2f4f7;
          height: calc(100vh - 0px);
          max-height: calc(100vh - 0px);
          overflow: auto;
        }
      `
    ];
  }

  constructor() {
    super();
  }

  async connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <omni-style>
        <application-header></application-header>
        <slot></slot>
        <modal-popup></modal-popup>
      </omni-style>
    `;
  }
}


OmniElement.register('application-view', InfluencerData);

declare global {
  interface HTMLElementTagNameMap {
    'application-view': InfluencerData;
  }
}
