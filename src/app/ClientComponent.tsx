'use client';

import React, { forwardRef, HTMLAttributes, useRef } from 'react';
import { styled as linariaStyled } from '@linaria/react';
import { styled as styledComponentStyled } from 'styled-components';

const PigmentComponent = linariaStyled.p`
  color: red;
`;

const StyledComponent = styledComponentStyled.p`
  color: green;
`

type StylableInputProps = { label: string } & Pick<HTMLAttributes<HTMLInputElement>, 'className' | 'style'>;

const StylableInput = ({ label, className, style }: StylableInputProps) => (
  <p>
    <label>
      {label}{" "}
      <input className={ className } style={ style } />
    </label>
  </p>
);

const StylableInputFwdRef = forwardRef<HTMLInputElement, StylableInputProps>(({ label, className, style }, ref) =>
  <p>
    <label>
      {label}{" "}
      <input ref={ref} className={ className } style={ style } />
    </label>
  </p>
);

const InputLinaria = linariaStyled(StylableInputFwdRef)`
  border: 2px inset blue;
`;

const InputStyledComponents = styledComponentStyled(StylableInputFwdRef)`
  border: 2px inset blue;
`;

const Form = () => {
  const ref = useRef<HTMLInputElement>(null);

  function focusInput() {
    if (!ref.current) {
      throw new Error('ref is not set');
    }
    ref.current.focus();
  }

  return (
    <form>
      <StylableInput label="StylableInput" />
      <StylableInputFwdRef label="MyInput" />
      <InputLinaria ref={ref} label="StyledInput" />
      {/* <InputStyledComponents ref={ref} label="StyledInputStyledComponents" /> */}
      <button type="button" onClick={focusInput}>
        Focus field
      </button>
    </form>
  );
}

export const ClientComponent = () => (
  <React.Fragment>
    <h2>ClientComponent</h2>
    <PigmentComponent>PigmentComponent</PigmentComponent>
    <StyledComponent>StyledComponent</StyledComponent>
    <Form />
  </React.Fragment>
);  
