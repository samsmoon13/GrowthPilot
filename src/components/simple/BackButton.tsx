import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <div className="absolute top-4 left-4 z-50">
      <Button
        onClick={onClick}
        variant="ghost"
        className="flex items-center gap-2 text-[#3d2817] hover:text-[#3d2817] hover:bg-[#3d2817]/10 font-semibold transition-all duration-200 hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Button>
    </div>
  );
}
