import { createStyles } from 'antd-style';

const useStyles = createStyles({
  header:{
    fontFamily: 'Champ',
    fontWeight: 500,
    fontSize: 32,
    paddingBottom: 32,
  }
});

type THeader = {
  header: string
}

const Header = ({ header }: THeader) => {
  const { styles } = useStyles();

  return (
      <div  className={styles.header}>
        {header}
      </div>
  );
}

export default Header
