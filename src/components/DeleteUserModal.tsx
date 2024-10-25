import { Button } from 'antd'
import { ModalComponent } from '../sharedComponents/ModalComponent'

type TDeleteUserModal = {
  title?: string,
  open: boolean,
  onOk: () => void,
  onCancel: () => void,
  closable?: boolean,
  children: JSX.Element
}

export const DeleteUserModal = ({ closable, open, onOk, onCancel, children }: TDeleteUserModal) => {
  return (
    <ModalComponent
      closable={closable}
      open={open}
      footer={[
        <Button key='1' onClick={onCancel}>Cancel</Button>,
        <Button key='2' onClick={onOk} htmlType='submit'>Save</Button>
      ]}
    >
      {children}
    </ModalComponent>
  )
}
