import React from 'react'
import './styles.scss'
import {auth, handleUserProfile} from '../../../firebase/utils'

const FormInput = ({hanldeChange, label, ...otherProps}) => {
  return (
    <div className="formRow">
      {label && (
        <label>{label}</label>
      ) }

      <input onChange={hanldeChange} className="formInput" {...otherProps} />
    </div>
  )
}

export default FormInput;
