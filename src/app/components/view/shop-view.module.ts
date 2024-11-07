import { TableColumn } from "omni-ui";

const Shopping_Columns: TableColumn[] = [
  {
    label: "Title",
    key: "title",
  },
  {
    label: "Category",
    key: "category",
  },
  {
    label: "Brand",
    key: "brand",
  },
  {
    label: "AvailabilityStatus",
    key: "availabilityStatus",
  },
  {
    label: "Stock",
    key: "stock",
  },
  {
    label: "Price",
    key: "price",
  },
  {
    label: "ShippingInformation",
    key: "shippingInformation",
  },
  {
    label: "ACTION",
    key: "action",
  },
];

export interface TableConfig {
  columns: TableColumn[]
}

export { Shopping_Columns};
 