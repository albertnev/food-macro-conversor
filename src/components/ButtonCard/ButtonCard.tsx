import React from 'react';
import cx from 'classnames';

interface ButtonCardProps {
  className?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  label: string;
  onClick: () => void;
}

const ButtonCard: React.FC<ButtonCardProps> = ({
  className,
  icon,
  isActive,
  label,
  onClick,
}) => (
  <button
    className={cx({
      active: isActive,
      buttonCard: true,
      [className!]: !!className,
    })}
    type="button"
    onClick={onClick}
  >
    <div className="buttonCard__icon">{icon}</div>
    <div className="buttonCard__label">{label}</div>
  </button>
);

ButtonCard.defaultProps = {
  className: '',
  isActive: false,
};

export default ButtonCard;
