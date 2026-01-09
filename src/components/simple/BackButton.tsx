import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#3d2817] hover:text-[#3d2817] hover:bg-[#3d2817]/5 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-lg font-semibold">Back</span>
    </Button>
  );
}
