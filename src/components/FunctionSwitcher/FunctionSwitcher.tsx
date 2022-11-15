import { Children, isValidElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { FunctionItem } from './FunctionItem';
import styles from './FunctionSwitcher.module.css';

interface FunctionSwitcherProps {
  children?: ReactNode;
}

export function FunctionSwitcher({ children }: FunctionSwitcherProps) {
  const [currentLabel, setCurrentLabel] = useState<string>('');

  const configMap = useMemo(() => {
    const m: Map<string, ReactNode> = new Map();
    const arrayChildren = Children.toArray(children);
    arrayChildren.forEach((child, index) => {
      if (!isValidElement(child)) {
        return;
      }

      if (child.type === FunctionItem) {
        m.set(child.props.label, child.props.element);
      }
    });

    return m;
  }, [children]);

  // select first element on init
  useEffect(() => {
    const keys = Array.from(configMap.keys());
    setCurrentLabel(keys[0]);
  }, []);

  return (
    <div className={styles.FunctionSwitcher}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ minHeight: '600px' }}>{configMap.get(currentLabel)}</div>
        <div>
          {Array.from(configMap.keys()).map((label: string, index: number) => (
            <button key={index} onClick={() => setCurrentLabel(label)} disabled={currentLabel === label}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
