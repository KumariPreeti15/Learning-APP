import { classMap, css, html, OmniElement, TableColumn } from 'omni-ui';
import { state } from '@lit/reactive-element/decorators.js';
import '../application-table/application-table'
import { Shopping_Columns, TableConfig} from './shop-view.module';
import { ModalPopupEventDetail } from '../popup';
import { TemplateResult } from 'lit-html';
import  './shop-create-edit';
import { $http } from'../api-service'

export type varietyList = {
  title: string;
  category: string;
  brand: string;
  id: number;
  availabilityStatus: string;
  stock: number;
  price:number;
  shippingInformation: string;
}

export class ShoppingView extends OmniElement {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          min-height: calc(100vh - var(--app-header-height));
          max-height: calc(100vh - var(--app-header-height));
          display: flex;
          flex-direction: column;
        }

        omni-style {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          padding-top: var(--app-header-height);
        }

        omni-tile {
          padding: 40px 38px 0;
          max-height: calc(100vh - var(--app-header-height) - 80px);
          flex-grow: 1;
        }
        omni-tile::part(header-slot) {
          align-items: center;
          background-color: #fff;
          display: flex;
          min-height: 42px;
          padding-left: 16px;
        }
        omni-tile::part(body-slot) {
          background-color: #f5f8fb;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        omni-table::part(table-header-row) {
          background-color: black;
        }

        omni-tile:last-of-type::part(body-slot) {
          background-color: #f5f8fb;
        }

        div.content {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: calc(100vh - var(--omni-app-layout-header-height, 50px) - var(--app-header-height) - 42px - 110px);
          background-color: var(--table-background-color);
        }
        div.content p {
          color: var(--color-shark);
          margin: 22px 0;
          word-break: break-all;
        }

        
        header {
          width: 100%;
          padding-right: 20px;
        }
        omni-search {
          float: right;
        }

        

        p {
          max-width: 500px;
          color: var(--color-almost-black) !important;
        }

        .search-outer {
          min-height: 28px;
          min-width: 28px;
          display: flex;
          align-items: center;
        }

      omni-tile { 
          padding-top: 30px !important;
        }
      `
    ];
  }

  @state() config: TableConfig = {
    columns: [],
    sort: { key: 'id', dir: 'asc' }
  };
  @state() tableData: varietyList[] = [];
  selectedRowData: number = 0;
  @state() isLoading: boolean = false;
  @state() totalCount: number = 0;
  
constructor() {
    super();
}

connectedCallback() {
    super.connectedCallback();
    this.initValues();
}

disconnectedCallback() {
    super.disconnectedCallback();
}

async initValues() {
    this.config.columns = this.getColumnDetails(Shopping_Columns);
    this.tableData = await this.getTableData(`https://dummyjson.com/products`);
}

  resetInitValues() {
    this.totalCount = 0;
    this.tableData = [];
}
async getTableData(url: string) {
    this.isLoading = true;
    this.resetInitValues();
    const response = await $http.get(url);
    this.isLoading = false;
    const data = await response.json();
    const results = data.products;
    if (results.length === 0) return [];
      this.totalCount = results.length;
      this.isLoading = false;
      return results;
} 

async updateSearch(e: { detail: { value: string; }; }) {
  const searchText = e.detail.value.trim();
  let url = 'https://dummyjson.com/products/search?q=' + searchText;
  this.tableData = await this.getTableData(url);
}

handleEditModal(index: number) {
    this.selectedRowData = this.tableData[index].id;
    const eventDetail: ModalPopupEventDetail<TemplateResult> = {
      type: 'custom',
      content: html` <shop-create-edit  .editOmniData=${this.selectedRowData} mode="edit"> </shop-create-edit> `
    };

    this.dispatchNewEvent('modal-popup', { detail: eventDetail });
}

async deleteAction(ID: number) {
  this.isLoading = true;
      this.resetInitValues();
      const response = await $http.delete(`https://dummyjson.com/products/` + ID);
      this.isLoading = false;
      const data = await response.json();
      console.log(data);
      if (data.length === 0) return [];
        this.isLoading = false;
        return data;
}

handleDelete(index: number) {
    let getID = this.tableData[index].id; 
    this.deleteAction(getID);
    this.initValues();
}
  
getColumnDetails(data: TableColumn[]) {
    return data.map(column => {
      switch (column.label) {
        case 'ACTION':
          return {
            label: column.label,
            key: column.key,
            template: (_val: any, index:any) => html`
                  <button class="button is-text" @click=${(_e:any) => this.handleEditModal(index)}>Edit</button>
                  <button class="button is-primary" @click=${(_e:any)=>{this.handleDelete(index)}}>Delete</button>
            `
          };
        default:
          return {
            label: column.label,
            key: column.key,
            isSortable: true,
            template: (val: any) => html`
              <td part="table-body-cell">
                <span part="td-content">${val}</span>
              </td>
            `
          };
      }
    });
}

displayContent() {
    if (this.tableData.length) {
      return html` <application-table
        .config=${this.config}
        .data=${this.tableData}
        .totalCount=${this.totalCount}>
      </application-table>`;
    } 
}

render() {
    return html`
      <omni-style>
        <omni-tile>
          <header slot="header" class="is-flex is-justify-content-space-between is-align-items-center">
            Shopping List
            <div class=${classMap({ skeleton: this.isLoading, 'search-outer': true })}>
              <omni-search slot="end" ph="Search data" @search-update=${this.updateSearch}> </omni-search>
            </div>
          </header>
          ${this.displayContent()}
        </omni-tile>
      </omni-style>
    `;
  }
}

OmniElement.register('shopping-view', ShoppingView);

declare global {
  interface HTMLElementTagNameMap {
    'shopping-view': ShoppingView;
  }
}
