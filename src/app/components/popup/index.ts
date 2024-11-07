import { state } from '@lit/reactive-element/decorators.js';
import { css,html, DocumentElementClipMixin, OmniElement, nothing } from 'omni-ui';
import { TemplateResult } from 'lit-html';
import { getIcon, getContent } from '../popup/controller';

type ModalType = 'notification' | 'message' | 'tile' | 'toastr' | 'custom';

type ModalStyle = 'warning' | 'danger' | 'info' | 'success';

type ModalCommand = 'open' | 'close';

export interface ModalPopupContent {
  title: string;
  body: string;
  showCancelButton?: boolean;
  cancelText?: string;
  button?: (TemplateResult | string | typeof nothing)[];
}
export interface ModalPopupEventDetail<T = ModalPopupContent> {
  type?: ModalType;
  style?: ModalStyle;
  content?: T;
  command?: ModalCommand;
}

export class ModalPopup extends DocumentElementClipMixin(OmniElement) {
  static get styles() {
    return [...super.styles, css`:
        omni-tile {
           width: 600px !important;
           height: 400px !important;
        }

        omni-tile p {
           height: 100% !important;
        }

        omni-style {
           overflow-y: scroll !important;
        }
       .toastModal.modal {
           position: fixed;
           justify-content: flex-start;
           z-index: 999;
           top: 20px;
           left: 0;
           right: 0;

        article {
           padding: 0.75rem 0.75rem 0.75rem 4rem !important;

        omni-icon {
            width: 24px !important;
            height: 24px !important;
            left: -30px;
        }

        omni-icon.right {
           top: 0px;
           left: auto;
           right: 8px;
           cursor: pointer;
    }
   }
}
        `];
  }
  @state() isAlertOpen = false;
  @state() eventData: ModalPopupEventDetail;

  connectedCallback() {
    super.connectedCallback();
    const body = document.querySelector('body');
    if (body) {
      body.addEventListener('modal-popup', e => this.handleModalPopupEvent(e as CustomEvent));
    }
  }

  private handleModalPopupEvent({ detail }: CustomEvent<ModalPopupEventDetail>) {
    this.eventData = detail;
    if (detail?.command) {
      this[`${detail.command}Modal`]();
    } else {
      if (this.isAlertOpen) {
        this.closeModal();
      } else {
        this.openModal();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const body = document.querySelector('body');
    if (body) {
    }
  }

  openModal() {
    // this._clipDocumentElement();
    this.isAlertOpen = true;
  }

  closeModal() {
    // this._unclipDocumentElement();
    this.isAlertOpen = false;
  }

  render() {
    let content: TemplateResult = html``;
    const currData = this.eventData;
    if (currData) {
      const icon = getIcon(currData.style);
      content = getContent(currData, this.isAlertOpen, icon, this.closeModal);
    } else {
      //Error handeling here
    }

    return html` <omni-style> ${content} </omni-style> `;
  }
}

OmniElement.register('modal-popup', ModalPopup);
