import { css, html, OmniElement } from 'omni-ui';

export class NotFoundView extends OmniElement {
  static get styles() {
    return [
      ...super.styles,
      css`
        omni-style {
          height: calc(100vh - var(--omni-app-layout-header-height));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `
    ];
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <omni-style>
        <h2 class="is-size-2 has-text-grey-light">404 Not Found</h2>
        <p class="is-size-3 has-text-grey-light">The requested page was not found.</p>
      </omni-style>
    `;
  }
}

OmniElement.register('not-found-view', NotFoundView);
