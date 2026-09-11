import type { ReactNode } from 'react';

export type LocalizedCopy = {
  zh: string;
  en: string;
};

export function Localized({ zh }: { zh: ReactNode; en: ReactNode }) {
  return <>{zh}</>;
}

export function Copy({ value }: { value: LocalizedCopy }) {
  return <>{value.zh}</>;
}
