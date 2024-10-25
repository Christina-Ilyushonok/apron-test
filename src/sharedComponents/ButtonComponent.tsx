import { Button } from 'antd';
import { createStyles } from 'antd-style';

type ButtonType = {
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed',
  title: string,
  handleClick?: () => void
  className?: string
  htmlType?: 'button' | 'submit' | 'reset' | undefined
}

const useStyles = createStyles({
  buttonStyle: {
    border: '2px solid #ECEBE3'
  }
});

export const ButtonComponent = ({title, type, handleClick, className, htmlType}: ButtonType) => {
  const { styles } = useStyles();

  return (
    <Button
        htmlType={htmlType}
        onClick={handleClick}
        type={type}
        className={`${className} ${styles.buttonStyle}`}
      >
        {title}
    </Button>
    )
}
