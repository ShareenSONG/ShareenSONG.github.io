import type { ReactNode } from 'react';

export type LocalizedCopy = {
  zh: string;
  en: string;
};

export function Localized({ zh, en }: { zh: ReactNode; en: ReactNode }) {
  return (
    <>
      <span className="lang lang-zh" lang="zh-CN">{zh}</span>
      <span className="lang lang-en" lang="en">{en}</span>
    </>
  );
}

export function Copy({ value }: { value: LocalizedCopy }) {
  return <Localized zh={value.zh} en={value.en} />;
}
