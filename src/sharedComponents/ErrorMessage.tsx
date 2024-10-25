import { Typography } from 'antd'
import { createStyles } from 'antd-style';

export const ErrorMessageStyles = createStyles({
  errorMessage: {
    color: '#CB2525'
  },
});

type TErrorMessage =  {
  message: string
}

export const ErrorMessage = ({ message }: TErrorMessage) => {
  const { styles } = ErrorMessageStyles()

  return <Typography className={styles.errorMessage}>{message}</Typography>
}
