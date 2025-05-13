import { BaseLoaderProps } from '../../common/types';

export const SimpleLoader = ({
  className = '',
  style,
  size = 'medium',
}: BaseLoaderProps) => {
  return (
    <div
      className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white dark:border-white ${className}`}
      style={style}
    >
      Demo
    </div>
  );
};
