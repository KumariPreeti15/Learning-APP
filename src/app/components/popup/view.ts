import { html } from 'omni-ui';
import { TemplateResult } from 'lit-html';
import { ModalPopupEventDetail } from '../popup/index';
import { nothing } from 'lit-html';

export function buildTile(modal: ModalPopupEventDetail, isOpen: boolean, closeFunc: () => void): TemplateResult {
  return html`
    <div class="modal ${isOpen ? 'is-active' : ''}">
      <div class="modal-background"></div>
      <omni-tile drag-able>
        <omni-toolbar slot="header">
          <h3 slot="start" class="title is-4 has-text-weight-normal">${modal.content.title}</h3>
          <button @click=${closeFunc} slot="end" class="button is-text is-shadowless">
            <omni-icon class="is-size-1" icon-id="omni:interactive:close"></omni-icon>
          </button>
          ${modal.content.button}
        </omni-toolbar>
        <p>${modal.content.body}</p>
      </omni-tile>
    </div>
  `;
}

// Notification modals
export function buildNotification(
  modal: ModalPopupEventDetail,
  isOpen: boolean,
  icon: string,
  closeFunc: () => void
): TemplateResult {
  return html`
    <div class="modal ${isOpen ? 'is-active' : ''}">
      <div class="modal-background ${modal.style}"></div>
      <div class="modal-content">
        <article class="notification is-${modal.style}">
          <omni-icon icon-id="omni:informative:${icon}"></omni-icon>
          <button class="delete" aria-label="delete" @click=${closeFunc}></button>
          ${modal.content.body}
        </article>
      </div>
    </div>
  `;
}

// Message modals
export function buildMessage(
  modal: ModalPopupEventDetail,
  isOpen: boolean,
  icon: string,
  closeFunc: () => void
): TemplateResult {
  return html`
    <div class="modal ${isOpen ? 'is-active' : ''}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <article class="message is-${modal.style}">
          <div class="message-header">
            <p>
              <omni-icon icon-id="omni:informative:${icon}"></omni-icon>
              ${modal.content.title}
            </p>
          </div>
          <div class="message-body">${modal.content.body}</div>
          <div class="message-footer">
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                ${modal.content.showCancelButton
                  ? html`<button class="button is-text is-${modal.style}" @click=${closeFunc}>
                      ${modal.content.cancelText ?? 'Cancel'}
                    </button>`
                  : nothing}
              </div>
              ${modal.content.button}
            </div>
          </div>
        </article>
      </div>
    </div>
  `;
}

// Toastr modals
export function buildToastr(
  modal: ModalPopupEventDetail,
  isOpen: boolean,
  icon: string,
  closeFunc: () => void
): TemplateResult {
  return html`
    <div class="toastModal modal ${isOpen ? 'is-active' : ''}">
      <div class="modal-content">
        <article class="notification is-clipped is-${modal.style}">
          <div class="control">
          <omni-icon icon-id="omni:informative:${icon}"></omni-icon>
          ${modal.content.body}
          <omni-icon class="right" icon-id="omni:interactive:close" @click=${closeFunc}></omni-icon>
          </div>
        </article>
      </div>
    </div>
  `;
}
