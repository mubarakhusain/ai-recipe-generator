import { ReactElement } from 'react';

export interface Preference {
  id: string;
  label: string;
  type: 'mood' | 'cuisine';
  icon: ReactElement;
} 