import React from 'react'


export default ({input, label, meta: {error, touched} }) => {

  return (
    <div>
      <label>{label}</label>
        <input {...input} style={{marginbottom: '5px'}}/>
        <div className='red-text' style={{marginbottom: '20px'}}>
          {touched && error}
        </div>
    </div>
  )
}