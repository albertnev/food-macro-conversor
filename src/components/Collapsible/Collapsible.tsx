import React, { useState } from 'react';
import cx from 'classnames';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';

import { StCollapsibleContainer } from './Collapsible.styled';

interface CollapsibleProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  className,
  id,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((current) => !current);
  };

  return (
    <StCollapsibleContainer
      className={cx({ collapsible: true, [className!]: !!className })}
    >
      <h2
        className={cx({
          collapsible__titleContainer: true,
          'collapsible__titleContainer--opened': isOpen,
        })}
        id={id}
      >
        <div role="presentation" onClick={toggleOpen}>
          <span className="collapsible__caretIcon">
            {isOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}
          </span>
          <span className="collapsible__title">{title}</span>
        </div>
      </h2>

      {isOpen && <div className="collapsible__content">{children}</div>}
    </StCollapsibleContainer>
  );
};

Collapsible.defaultProps = {
  className: '',
  id: '',
};

export default Collapsible;
