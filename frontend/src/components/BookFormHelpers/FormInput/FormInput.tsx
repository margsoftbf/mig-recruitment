import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './FormInput.module.css';

interface FormInputProps {
	label: string;
	id: string;
	type: string;
	register: ReturnType<UseFormRegister<any>>;
	errorMessage?: string;
}

const FormInput = ({
	label,
	id,
	type,
	register,
	errorMessage,
}: FormInputProps) => {
	return (
		<div className={styles.formGroup}>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			<div className={styles.formInputGroup}>
				<input type={type} id={id} {...register} className={styles.input} />
				{errorMessage && <p className={styles.error}>{errorMessage}</p>}
			</div>
		</div>
	);
};

export default FormInput;
