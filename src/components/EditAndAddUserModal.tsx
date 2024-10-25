import { Button } from 'antd'
import { ModalComponent } from '../sharedComponents/ModalComponent'

type TEditAndAddUserModal = {
  title?: string,
  open: boolean,
  onOk: () => void,
  onCancel: () => void,
  closable?: boolean,
  children: JSX.Element
}

export const EditAndAddUserModal = ({title, open, onOk, onCancel,closable, children}: TEditAndAddUserModal) => {
  return (
    <ModalComponent
      closable={closable}
      title={title}
      open={open}
      footer={[
        <Button key='1' onClick={onCancel}>Cancel</Button>,
        <Button key='2' onClick={onOk} htmlType='submit'>Save</Button>
      ]}>
      {children}
    </ModalComponent>
  )
}
