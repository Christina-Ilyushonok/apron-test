import { Spin, Table, Typography, message } from 'antd'
import Column from 'antd/es/table/Column'
import { DeleteOutlined } from '@ant-design/icons'
import { ButtonComponent } from '../../sharedComponents/ButtonComponent'
import { useEffect, useState } from 'react'
import { EditAndAddUserModal } from '../EditAndAddUserModal'
import { useForm, FormProvider } from 'react-hook-form'
import { EditAndAddUserForm } from '../EditAndAddUserForm'
import { usersColumns } from '../../utils/usersColumns'
import { yupResolver } from '@hookform/resolvers/yup'
import { AlertModal } from '../../sharedComponents/AlertModal'
import { IUser, IUserForm } from '../../utils/types';
import { userValidationSchema } from '../../utils/userValidationSchema'
import { userTableStyles } from './styles'
import { ApiManager } from '../../ApiManager/ApiManager'

export const UsersTable =  () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [mode, setMode] = useState('')
  const [users, setUsers] = useState<IUser[] | []>([])
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const [isLoading, setIsloading ] = useState(false)
  const [isServerErrorInModal, setIsServerErrorInModal ] = useState(false)
  const [isServerError, setIsServerError ] = useState(false)

const [messageApi, contextHolder] = message.useMessage()

const { styles } = userTableStyles()

  const info = (message: string) => {
    messageApi.open({
      icon: <div></div>,
      content: message,
      duration: 3
    })
  }

  const getUsers = async () => {
    try {
      const response = await ApiManager.getUsersApi() as IUser[]

      setUsers(response)
      setIsloading(false)
    } catch {
      setIsServerError(true)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(userValidationSchema),
  })

  const resetForm = () => {
    methods.reset(
     //@ts-ignore
      { firstName: '', lastName: '', age: '', gender: ''}
    )
  }

  const addUser = async (user: IUser) => {
    try {
      const response = await ApiManager.addUserApi({...user}) as IUser

      setUsers((prevState) => [...prevState, {...response}])
      setIsModalOpen(false)
      info('User added')
    } catch {
      setIsServerErrorInModal(true)
    }
  }

  const updateUser = async (user: IUser) => {
    try {
      const response = await ApiManager.updateUserApi(user.id, user) as IUser

      resetForm()
      setUsers((prevState) => prevState.map(item => item.id === response.id ? response : item))
      setIsModalOpen(false)
      info('User updated')
    } catch {
      setIsServerErrorInModal(true)
    }
  }

  const deleteUser = async (id: string) => {
    try {
        await ApiManager.deleteUserApi(id)
        setUsers(users.filter((user: IUser) => user.id !== id))
        setIsAlertModalOpen(false)
        info('User deleted')
      } catch {
        setIsServerErrorInModal(true)
      }
    }

  const handleEditAndAddUser = () => {
    if (Object.keys(methods.formState.errors).length !== 0) return

    if (mode === 'Edit') {
      //@ts-ignore
      methods.handleSubmit((data: IUser) => updateUser(data))()
    } else {
      //@ts-ignore
      methods.handleSubmit((data: IUserForm) => addUser(data))()
    }
  }

    const handleDelete = () => {
      currentUser && deleteUser(currentUser.id)
    }

  const handleEditAndAddUserCancel = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const openEditUserModal = (record: IUser) => {
    setIsServerErrorInModal(false)
    methods.reset(
      {
        firstName: record.firstName,
        lastName: record.lastName,
        age: record.age,
        id: record.id,
        gender: record.gender,
      }
    )
    setMode('Edit')
    setIsModalOpen(true)
  }

  const openDeleteUserAlertModal = (record: IUser) => {
    setCurrentUser(record)
    setIsAlertModalOpen(true)
  }

  const openAddUserModal = () => {
    setIsServerErrorInModal(false)
    setMode('Add')
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <Spin />
  }

  return (
    <>
      {contextHolder}
      {isServerError && <Typography>Something went wrong..</Typography>}
      <ButtonComponent
        title={`Add user`}
        handleClick={openAddUserModal}
        className={styles.addButton}
      />
      <Table
        dataSource={users}
        className={styles.tableContainer}
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
        rowKey='id'
      >
        {usersColumns.map((column) => {
            return (
              <Column
                key={column.key}
                title={column.title}
                dataIndex={column.dataIndex}
                //@ts-ignore
                sorter={column.sorter}
              />
            )}
        )}
        <Column
          key='actions'
          render={(_: any, record: IUser) => (
            <div className={styles.buttonsContainer}>
              <ButtonComponent
                title={'Edit'}
                handleClick={() => openEditUserModal(record)}
                className={styles.editButton}
              />
              <DeleteOutlined
                onClick={() => openDeleteUserAlertModal(record)}
                className='delete'
              />
            </div>
          )}
        />
      </Table>
      <EditAndAddUserModal
        title={(mode === 'Edit') ? `Edit user` : 'Add user'}
        open={isModalOpen}
        onOk={handleEditAndAddUser}
        onCancel={handleEditAndAddUserCancel}
        closable={false}
      >
        <FormProvider {...methods}>
          <form>
            <EditAndAddUserForm errors={methods.formState.errors}/>
          </form>
          {isServerErrorInModal && <Typography>Something went wrong..</Typography>}
        </FormProvider>
      </EditAndAddUserModal>
      <AlertModal
        open={isAlertModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsAlertModalOpen(false)}
        closable={false}
        submitTitle={'DELETE'}
        alert="Are you sure you want to delete user? You won't be able to pay or publish it. 
               Some documents may be useful for bookkeeping in the future."
      />
    </>
  )
}
