import React from 'react';
import cx from 'classnames';
import styles from './ButtonCard.module.scss';

interface ButtonCardProps {
  icon: React.ReactNode;
  isActive?: boolean;
  label: string;
  onClick: () => void;
}

const ButtonCard: React.FC<ButtonCardProps> = ({
  icon,
  isActive,
  label,
  onClick,
}) => (
  <button
    className={cx({
      [styles.buttonCard]: true,
      [styles.active]: isActive,
    })}
    type="button"
    onClick={onClick}
  >
    <div className={styles.icon}>{icon}</div>
    <div className={styles.label}>{label}</div>
  </button>
);

ButtonCard.defaultProps = {
  isActive: false,
};

export default ButtonCard;
