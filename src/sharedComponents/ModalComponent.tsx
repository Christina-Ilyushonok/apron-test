import { Modal } from 'antd'

type TModalComponent = {
  title?: string,
  open: boolean,
  closable?: boolean,
  children?: JSX.Element,
  footer?: JSX.Element[],
}

export const ModalComponent = ({ title, open, footer, closable, children  }: TModalComponent) => {
  return (
    <Modal
      closable={closable}
      title={title}
      open={open}
      footer={footer}
      className='modal'
    >
      {children ? children : null}
    </Modal>
  )
}
