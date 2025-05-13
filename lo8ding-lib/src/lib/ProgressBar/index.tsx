import { CSSProperties } from 'react';
import { BaseLoaderProps } from '../../common/types';

interface ProgressBarProps extends BaseLoaderProps {
  /** number from 0 to 100 */
  progress: number;
  /** custom text or % (defaults to “xx%”) */
  label?: string;
  /** render label inside the bar instead of below */
  showLabelInside?: boolean;
  /** Tailwind bg-* class for the filled portion */
  barColor?: string;
  /** Tailwind bg-* class for the track */
  trackColor?: string;
  /** Tailwind text-* class for the label */
  labelColor?: string;
  /** add simple stripes */
  striped?: boolean;
  /** animate stripes */
  animated?: boolean;
}

export const ProgressBar = ({
  progress = 50,
  className = '',
  style,
  size = 'medium',
  label,
  showLabelInside = false,
  barColor = 'bg-blue-600',
  trackColor = 'bg-gray-200',
  labelColor = 'text-gray-700',
  striped = false,
  animated = false,
}: ProgressBarProps) => {
  const heightMap: Record<string, string> = {
    small: 'h-2',
    medium: 'h-4',
    large: 'h-6',
  };
  const barHeight = heightMap[size] || heightMap.medium;
  const pct = Math.min(Math.max(progress, 0), 100);
  const displayText = label ?? `${pct}%`;

  const stripeStyles: CSSProperties = striped
    ? {
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 10px, transparent 10px, transparent 20px)',
      }
    : {};

  return (
    <>
      <div
        className={`w-full overflow-hidden rounded ${trackColor} ${className}`}
        style={style}
      >
        <div
          className={`relative ${barHeight} ${barColor} rounded transition-all duration-500 ease-in-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${pct}%`,
            ...stripeStyles,
          }}
        >
          {showLabelInside && (
            <span
              className={`absolute inset-0 flex items-center justify-center text-sm font-medium ${labelColor}`}
            >
              {displayText}
            </span>
          )}
        </div>
      </div>
      {!showLabelInside && (
        <div className={`text-center text-sm mt-1 font-medium ${labelColor}`}>
          {displayText}
        </div>
      )}
    </>
  );
};
