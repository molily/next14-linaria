'use client';

import React, { forwardRef, HTMLAttributes, useRef } from 'react';
import { styled } from '@linaria/react';

type StylableInputProps = { label: string } & Pick<HTMLAttributes<HTMLInputElement>, 'className' | 'style'>;

const StylableInput = ({ label, className, style }: StylableInputProps) => (
  <p>
    <label>
      {label}{" "}
      <input className={ className } style={ style } />
    </label>
  </p>
);

const InputLinaria = styled(StylableInput)`
  border: 2px inset pink;
`;

const StylableInputFwdRef = forwardRef<HTMLInputElement, StylableInputProps>(({ label, className, style }, ref) =>
  <p>
    <label>
      {label}{" "}
      <input ref={ref} className={ className } style={ style } />
    </label>
  </p>
);

const InputLinariaFwdRef = styled(StylableInputFwdRef)`
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
      <InputLinaria label="InputLinaria" />
      
      <StylableInputFwdRef label="MyInput" />      
      <InputLinariaFwdRef ref={ref} label="StyledInput" />

      <button type="button" onClick={focusInput}>
        Focus field
      </button>
    </form>
  );
}

export const ClientComponent = () => (
  <React.Fragment>
    <h2>ClientComponent</h2>
    <Form />
  </React.Fragment>
);  
  