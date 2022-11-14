import { ReactElement, ReactNode } from 'react';

export interface FunctionItemProps {
  label: string;
  element: ReactNode;
}

export default function FunctionItem({ label, element }: FunctionItemProps): ReactElement | null {
  const warning = `<FunctionItem> can only be used inside a <FunctionSwitcher> element`;
  return <p>{warning}</p>;
}
