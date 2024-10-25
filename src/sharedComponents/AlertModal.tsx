import { Button, Typography } from 'antd'
import { ModalComponent } from '../sharedComponents/ModalComponent'

type TAlertModal = {
  title?: string,
  open: boolean,
  onOk: () => void,
  onCancel: () => void,
  closable?: boolean,
  submitTitle?: string,
  alert: string
}

export const AlertModal = ({title, open, onOk, onCancel,closable, submitTitle, alert}: TAlertModal) => {
  return (
    <ModalComponent
      closable={closable}
      title={title}
      open={open}
      footer={[
        <Button key='1' onClick={onOk} htmlType='submit'>{submitTitle}</Button>,
        <Button key='2' onClick={onCancel}>Cancel</Button>
      ]}>
        <Typography>{alert}</Typography>
    </ModalComponent>
  )
}
