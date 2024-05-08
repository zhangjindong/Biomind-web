import styles from './image-header.module.css';

/* eslint-disable-next-line */
export interface ImageHeaderProps {}

export function ImageHeader(props: ImageHeaderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ImageHeader!</h1>
    </div>
  );
}

export default ImageHeader;
