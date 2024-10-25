import { Select, Typography } from 'antd'
import { EditAndAddUserFormStyles } from './styles'
import { Controller } from 'react-hook-form'
import { GENDER } from '../../utils/types'
import { ControlledInput } from '../../sharedComponents/ControlledInput';
import { ErrorMessage } from '../../sharedComponents/ErrorMessage';

export const EditAndAddUserForm = ({ errors }: any) => {
  const { styles } = EditAndAddUserFormStyles()

  return (
    <div>
      <Typography>{'Gender'}</Typography>
      <Controller
        name='gender'
        render={({ field }) => (
        <Select
          {...field}
          className = {`${errors.gender ? styles.errorInput : styles.input} ${styles.styledSelect}`}
        >
          {Object.keys(GENDER).map((gender) => (
            <Select.Option value={gender} key={gender}>
              {gender}
            </Select.Option>
          ))}
        </Select>
        )}
      />
      {errors && errors.gender && <ErrorMessage message={errors.gender.message} />}
      <Typography>{'First name'}</Typography>
      <ControlledInput
        name='firstName'
        className = {errors.firstName ? styles.errorInput : styles.input}
      />
      {errors && errors.firstName && <ErrorMessage message={errors.firstName.message} />}
      <Typography>{'Last name'}</Typography>
      <ControlledInput
        name='lastName'
        className = {errors.lastName ? styles.errorInput : styles.input}
      />
        {errors && errors.lastName && <ErrorMessage message={errors.lastName.message} />}
      <Typography>{'Age'}</Typography>
      <ControlledInput
        name='age'
        type='number'
        className = {errors.age ? styles.errorInput : styles.input}
      />
      {errors && errors.age && <ErrorMessage message={errors.age.message} />}
  </div>
  )
}