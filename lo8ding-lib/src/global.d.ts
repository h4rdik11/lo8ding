// lo8ding-lib/src/global.d.ts
import './index';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * simple-loader component
       * - loader-class: extra Tailwind classes
       * - disabled: boolean flag
       * - customStyle: JS style object
       */
      'simple-loader': {
        'loader-class'?: string;
        disabled?: boolean;
        customStyle?: Partial<CSSStyleDeclaration>;
      } & React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {}; // ensure this file is a module
