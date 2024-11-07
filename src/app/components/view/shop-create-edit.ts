import { html, OmniElement, css } from 'omni-ui';
import { property, state } from '@lit/reactive-element/decorators.js';
import { $http } from'../api-service'
import { varietyList } from './shopping-view';

type Mode = 'create' | 'edit';

export class InfluencerCreateEdit extends OmniElement {
  static get styles(){
    return [
        css `
        .box label{
            margin-bottom: 10px;
            margin-top: 10px;
            font-weight: bold;
        }
        .button {
            margin: 10px;
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }
        `
    ]
}
 constructor() {
    super();
  }

  @state() isDisabled: boolean = true;
  @state() isLoading: boolean = false;
  @state() influencerTitle: string = '';
  @state() titleName: string = '';
  @state() categoryName: string = '';
  @state() brandName: string = '';
  @state() availabilityStatus: string = '';
  @state() stock: number = 0;
  @state() price: number = 0;
  @state() shippingInformation: string = '';
  @state() searchText: string = '';
  @state() editOmniData: number;
  @property({ type: String, attribute: true }) mode: Mode = 'create';
  @state() tableData: varietyList;
  
  async connectedCallback() {
    super.connectedCallback();
    if (this.mode != "create"){
      this.initValues();
    }
  }

  private closeModalCommand(command: 'close' | 'open' = 'close') {
    this.dispatchNewEvent('modal-popup', { detail: { command: command } });
  }

  resetInitValues() {
    this.tableData = null;
  }

  async initValues() {
    this.tableData = await this.getTableData();
    this.titleName = this.tableData.title;
    this.categoryName = this.tableData.category;
    this.brandName = this.tableData.brand;
    this.availabilityStatus = this.tableData.availabilityStatus;
    this.stock = this.tableData.stock;
    this.price = this.tableData.price;
    this.shippingInformation = this.tableData.shippingInformation;
  }

  async getTableData() {
    this.isLoading = true;
    this.resetInitValues();
    const response = await $http.get(`https://dummyjson.com/products/` + this.editOmniData);
    this.isLoading = false;
    const data = await response.json();
    if (data.length === 0) return [];
      this.isLoading = false;
      return data;
    }

  async editTableData() {
    this.isLoading = true;
    this.resetInitValues();
    let editdata = {
        title: this.titleName,
        category:this.categoryName,
        brand: this.brandName, 
        availabilityStatus: this.availabilityStatus, 
        stock: Number(this.stock), 
        price: Number(this.price), 
        shippingInformation: this.shippingInformation 
    }
    const response = await $http.put(`https://dummyjson.com/products/` + this.editOmniData, editdata);
    this.isLoading = false;
    console.log(response);
    const data = await response.json;
    this.isLoading = false;
    return data;
  }

  async addTableData() {
    this.isLoading = true;
    this.resetInitValues();
    let editdata = {title: this.titleName,
       category:this.categoryName,
       brand: this.brandName, 
       availabilityStatus: this.availabilityStatus, 
       stock: Number(this.stock), 
       price: Number(this.price), 
       shippingInformation: this.shippingInformation 
      }
    const response = await $http.post(`https://dummyjson.com/products/add`, editdata);
    this.isLoading = false;
    const data = await response.json();
    if (data.length === 0) return [];
    this.isLoading = false;
    return data;
  }

  _onChangeHandler(event: any, type: string) {
    const { value } = event.target;
   switch (type) {
      case 'title':
        this.titleName = value;
        break;
      case 'category':
        this.categoryName = value;
        break; 
      case 'brand':
        this.brandName= value;
        break;
      case 'availabilityStatus':
        this.availabilityStatus = value;
        break;
      case 'stock':
        this.stock = value;
        break;
      case 'price':
          this.price = value;
        break;
      case 'shippingInformation':
          this.shippingInformation = value;
        break;
      }
  }

  async handleSubmit() {
    this.mode!= "create" ? this.editTableData() : this.addTableData();
  }

   displayContent( value: string, titleDisplay: string) {
    return html` 
       <label for="item">${titleDisplay.toUpperCase()}</label>
        <input class="input" type="text" placeholder=${titleDisplay.toUpperCase()} 
        .value="${value}" @keyup="${(e:any) => this._onChangeHandler(e, titleDisplay)}">
      `;
    }
   
  render() {
    return html`
      <omni-style>
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-card">
            <div class="modal-card-head header-separator">
              <p class="modal-card-title">
                ${this.mode === 'create' ? 'Add Product' : 'Edit Product'} 
              </p>
            </div>
            <form class="box" @submit=${this.handleSubmit} id="form">
                ${this.displayContent(this.titleName, 'title')}
                ${this.displayContent(this.categoryName, 'category')}
                ${this.displayContent(this.brandName, 'brand')}
                ${this.displayContent(this.availabilityStatus, 'availabilityStatus')}
                ${this.displayContent(String(this.stock), 'stock')}
                ${this.displayContent(String(this.price), 'price')}
                ${this.displayContent(this.shippingInformation, 'shippingInformation')}
                <div class="columns mx-0 pt-4 pb-3 is-justify-content-flex-end">
                <div class="column">
                  <div class="buttons are-medium is-right">
                    <button @click=${() => this.closeModalCommand('close')} class="button is-size-5 is-text">
                      Cancel
                    </button>
                    <button
                      class="button is-size-5 is-primary"
                      @click=${() => this.handleSubmit()}>
                      ${this.mode === 'create' ? 'Add' : 'Edit'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
             </div> 
        </div>
      </omni-style>
    `;
  }
}

OmniElement.register('shop-create-edit', InfluencerCreateEdit);

declare global {
  interface HTMLElementTagNameMap {
    'shop-create-edit': InfluencerCreateEdit;
  }
}
