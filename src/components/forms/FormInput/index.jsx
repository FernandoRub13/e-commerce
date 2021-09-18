import React from 'react'
import './styles.scss'
import {auth, handleUserProfile} from '../../../firebase/utils'

const FormInput = ({handleChange, label, ...otherProps}) => {
  return (
    <div className="formRow">
      {label && (
        <label>{label}</label>
      ) }

      <input onChange={handleChange} className="formInput" {...otherProps} />
    </div>
  )
}

export default FormInput;
