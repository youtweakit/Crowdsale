import React from 'react'
import '../../assets/stylesheets/application.css';
import { VALIDATION_TYPES } from '../../utils/constants'
const { INVALID } = VALIDATION_TYPES

export const InputFieldExt = ({side, disabled, type, value, defaultValue, onChange, onBlur, title, valid, errorMessage, description }) => {
	const errorStyle={
		color: 'red',
		fontWeight: 'bold',
		fontSize: '12px',
		width: '100%',
		height: '10px'
	}
	const error = valid === INVALID ? errorMessage : ''
	return <div className={side}>
		<label className="label">{title}</label>
		<input disabled={disabled} type={type} className="input" onBlur={onBlur} value={value} defaultValue={defaultValue} onChange={onChange}/>
		<p className="description">
			{description}
		</p>
		<p style={errorStyle}>{error}</p>
	</div>
}