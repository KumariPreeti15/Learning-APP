import { css, html, OmniElement } from 'omni-ui';
import { ModalPopupEventDetail } from '../popup';
import { TemplateResult } from 'lit-html';

export class AdminHeader extends OmniElement {
  static get styles() {
    return [
      ...super.styles,
      css`
        omni-toolbar {
          z-index: 999;
          width: -moz-available;
          width: -webkit-fill-available;
          width: fill-available;
          position: fixed;
          height: var(--app-header-height);
          background: #fff;
          box-shadow: 0 1px var(--color-pale-grey-two);
        }
        omni-toolbar::part(toolbar) {
          overflow: visible;
        }
      `
    ];
  }

  constructor() {
    super();
  }

  protected updated(params: any) {
    if (params.has('activeRoute')) {
    }
  }

  handleAdd() {
    const eventDetail: ModalPopupEventDetail<TemplateResult> = {
      type: 'custom',
      content: html` <shop-create-edit  mode="create"> </shop-create-edit> `
    };
  this.dispatchNewEvent('modal-popup', { detail: eventDetail });
  }

  render() {
    return html`
      <omni-style>
        <omni-toolbar>
          <div slot="start">
            <div class="py-3 px-5 title is-2">Shopping List</div>
          </div>
          <div slot="end" class="is-flex">
            <button
              class="button is-size-5 is-primary"
              @click=${() => this.handleAdd()}>
              Add Product
            </button>
          </div>
        </omni-toolbar>
      </omni-style>
    `;
  }
}

OmniElement.register('application-header', AdminHeader);

declare global {
  interface HTMLElementTagNameMap {
    'application-header': AdminHeader;
  }
}
