import { KeyboardEvent } from 'react';

type handlerWithE = (x: KeyboardEvent) => void;
type handlerWithoutE = () => void;

const enum KeyType {
  Enter = 'Enter',
  Alt = 'Alt',
  Ctrl = 'Ctrl',
  Meta = 'Meta',
  Shift = 'Shift',
}

export class Keydown {
  private value: KeyType[] = [];
  constructor(ele: KeyType) {
    this.value.push(ele);
  }

  static get enter() {
    return new Keydown(KeyType.Enter);
  }
  static get ctrl() {
    return new Keydown(KeyType.Ctrl);
  }

  get enter() {
    this.value.push(KeyType.Enter);
    return this;
  }
  get ctrl() {
    this.value.push(KeyType.Ctrl);
    return this;
  }

  then(wrapped: handlerWithE | handlerWithoutE) {
    const rules = this.value;
    return function (e: KeyboardEvent) {
      if (rules.includes(KeyType.Alt) && !e.altKey) return;
      if (rules.includes(KeyType.Ctrl) && !e.ctrlKey) return;
      if (rules.includes(KeyType.Meta) && !e.metaKey) return;
      if (rules.includes(KeyType.Shift) && !e.shiftKey) return;

      // 去掉控制键的干扰
      const keyRules = rules.filter(rule => ![KeyType.Alt, KeyType.Ctrl, KeyType.Meta, KeyType.Shift].includes(rule));
      if (!keyRules.map(String).includes(e.key)) return; // e.key接近常用,比如'Control',e.code太过细致,比如'ControlLeft'

      wrapped.apply(null, [e]);
    };
  }
}
