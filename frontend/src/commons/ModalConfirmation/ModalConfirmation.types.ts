export interface IModalConfirmation {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
}
