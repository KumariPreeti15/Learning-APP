import { css, html, nothing, OmniElement } from 'omni-ui';
import { state } from '@lit/reactive-element/decorators.js';
import { TableConfig } from '../view/shop-view.module';

export class ApplicationTable extends OmniElement {
  static get styles() {
    return [
      ...super.styles,
      css`
        :omni-table::part(table-body-stage)::first-letter {
       text-transform: uppercase;
        }

      omni-table::part(table-header-id) {
           text-align: center;
        }

      omni-table::part(actions-cell) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
  
      omni-table::part(table) {
          color: var(--color-almost-black);
        }

      omni-table::part(table-body-cell) {
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
  
      omni-table::part(table-header-cell) {
          height: 52px;
        }
  
      omni-table::part(table-body-row):hover {
         transform: translateZ(2px);
        }

      omni-table::part(table-header) {
        position: sticky;
        top: 0px;
        z-index: 39;
      }
  
      omni-table::part(table-container) {
        max-height: calc(100vh - 180px);
        padding-bottom: 60px;
        overflow: auto scroll;
      } 
        #table-footer {
           position: absolute;
           bottom: -42px;
           right: 0;
           left: 0;
           height: 60px;
           background-color: #f5f8fb;
           padding-top: 9px;

      span {
          min-width: 150px;
          color: var(--color-almost-black);
       }
     } 
      `
    ];
  }

  @state() config: TableConfig = { columns: []};
  @state() data: any = [];
  @state() totalCount: number;
  constructor() {
    super();
  }

  render() {
    return html`
      <omni-style>
        <omni-table
          .columns="${this.config.columns}"
          .data="${this.data}"
          >
          ${this.totalCount
            ? html` <data-not-found .dataLoading=${this.totalCount}>
                <p class="m-0">Data Not Found</p>
              </data-not-found>`
            : nothing}

          <!--   <div slot="table-footer" id="table-footer">
           <pagination-component
              .totalRecords=${this.totalCount}></pagination-component>
            <span></span>
          </div> -->
        </omni-table>
      </omni-style>
    `;
  }
}

OmniElement.register('application-table', ApplicationTable);

declare global {
  interface HTMLElementTagNameMap {
    'application-table': ApplicationTable;
  }
}
