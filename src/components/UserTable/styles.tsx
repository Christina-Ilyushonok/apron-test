import { createStyles } from 'antd-style'

export const userTableStyles = createStyles({
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: '0 24px' ,
    fontFamily: 'Champ',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  editButton: {
    marginRight: 12
  },
  addButton: {
    position: 'absolute',
    top: 32,
    right: 16
  }
});