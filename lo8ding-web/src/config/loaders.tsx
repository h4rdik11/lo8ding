import { ComponentType } from 'react';
import { SimpleLoader, ProgressBar } from '@h4rdik11/lo8ding-lib';

export interface LoaderConfig {
  id: string;
  name: string;
  description?: string;
  component: ComponentType<any>;
  props: Record<string, any>;
  getProps?: (globalState: any) => Record<string, any>; // For dynamic props
}

// Export the loaders configuration
export const loadersConfig: LoaderConfig[] = [
  {
    id: 'simple-loader',
    name: 'Simple Loader',
    component: SimpleLoader,
    props: {},
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    component: ProgressBar,
    props: {
      labelColorHex: '#ffffff',
      barColorHex: '#155dfc',
      trackColorHex: '#e5e7eb',
      striped: false,
    },
    getProps: (state) => ({
      progress: state.progress,
    }),
  },
  {
    id: 'progress-bar-inside',
    name: 'Progress Bar (label inside)',
    component: ProgressBar,
    props: {
      labelColorHex: '#ffffff',
      barColorHex: '#155dfc',
      trackColorHex: '#e5e7eb',
      showLabelInside: true,
      animated: true,
      striped: false,
    },
    getProps: (state) => ({
      progress: state.progress,
    }),
  },
  // Add new loaders here without modifying App.tsx
];
