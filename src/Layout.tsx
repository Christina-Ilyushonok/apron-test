
import { createStyles } from 'antd-style'
import Header from './sharedComponents/Header'

const useStyles = createStyles({

  container: {
    padding: 24,
    background:  '#FAF9F2',
    height: '100%',
  }
})

type IHeader = {
  header: string,
  children: JSX.Element
}

const Layout = ({ header, children }: IHeader) => {
  const { styles } = useStyles()

  return (
    <div className={styles.container}>
      <Header header={header}/>
      {children}
      {/* TODO footer */}
    </div>
  )
}

export default Layout