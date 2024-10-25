import * as yup from 'yup'
import { GENDER } from './types'

export const userValidationSchema = yup.object().shape({
  firstName: yup.string()
    .min(5, 'First name must be minimum 5 digits')
    .max(20, 'First name must be maximum 20 digits')
    .required('First name is required'),
  lastName: yup.string()
    .min(5, 'Last name must be minimum 5 digits')
    .max(20, 'Last name must be maximum 20 digits')
    .required('Last name is required'),
  id: yup.string(),
  gender: yup.mixed<GENDER>()
    .required('Gender is required')
    .oneOf(Object.values(GENDER)),
  age: yup.number()
  .typeError('Age is required and must be a number')
  .min(18)
  .required('Age is required')
  .when('gender', {
    is: 'FEMALE',
    then:(schema) => schema.max(117),
    otherwise: (schema) => schema.max(112),
  }),
})
