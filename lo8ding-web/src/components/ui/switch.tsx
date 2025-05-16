import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-[1.15rem] w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent outline-none',
        'transition-colors duration-200', // Only transition colors, not dimensions
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'dark:data-[state=unchecked]:bg-input/80',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'relative', // Add relative positioning
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'absolute h-4 w-4 rounded-full', // Use absolute positioning
          'bg-white', // White in both modes
          'border border-gray-300',
          'shadow-md',
          'transition-transform duration-200 ease-in-out',
          // Fix the positioning - left side when unchecked, right side when checked
          'data-[state=unchecked]:left-[2px] data-[state=checked]:left-[calc(100%-18px)]'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
