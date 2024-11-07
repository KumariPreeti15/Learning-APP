import { ModalPopupEventDetail } from './index';
import { buildMessage, buildNotification, buildTile, buildToastr } from '../popup/view.ts';

export function getIcon(style: string) {
  let icon: string;

  switch (style) {
    case 'warning':
      icon = 'alert';
      break;
    case 'danger':
      icon = 'error';
      break;
    default:
      icon = style;
      break;
  }

  return icon;
}

export function getContent(modal: ModalPopupEventDetail, isOpen: boolean, icon: string, closeFunc: () => void) {
  let content: any;

  switch (modal.type) {
    case 'tile':
      content = buildTile(modal, isOpen, closeFunc);
      break;
    case 'message':
      content = buildMessage(modal, isOpen, icon, closeFunc);
      break;
    case 'notification':
      content = buildNotification(modal, isOpen, icon, closeFunc);
      break;
    case 'toastr':
      content = buildToastr(modal, isOpen, icon, closeFunc);
      break;
    default:
      content = modal.content;
      break;
  }

  return content;
}
