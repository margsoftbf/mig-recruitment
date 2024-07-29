import React, { ChangeEvent } from 'react';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload = ({ onChange }: ImageUploadProps) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor='file-upload' className={styles.label}>
        Image URL
      </label>
      <div className={styles.formInputGroup}>
        <input type='file' id='file-upload' className={styles.fileInput} onChange={onChange} />
      </div>
    </div>
  );
};

export default ImageUpload;