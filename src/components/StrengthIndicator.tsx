import type { StrengthResult } from '../lib/password';

interface StrengthIndicatorProps {
  strength: StrengthResult;
}

const strengthConfig = {
  weak: {
    width: '25%',
    color: 'bg-red-500',
    textColor: 'text-red-500',
    label: 'Weak',
  },
  medium: {
    width: '50%',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    label: 'Medium',
  },
  strong: {
    width: '75%',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    label: 'Strong',
  },
  'very-strong': {
    width: '100%',
    color: 'bg-indigo-500',
    textColor: 'text-indigo-500',
    label: 'Very Strong',
  },
};

export function StrengthIndicator({ strength }: StrengthIndicatorProps) {
  const config = strengthConfig[strength.level];

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${config.color}`}
          style={{ width: config.width }}
        />
      </div>
      <span className={`text-sm font-medium min-w-[70px] text-right ${config.textColor}`}>
        {config.label}
      </span>
    </div>
  );
}
