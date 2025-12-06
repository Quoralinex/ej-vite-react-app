import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface QualificationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function QualificationModal({
  open,
  onClose,
  title,
  description
}: QualificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-gray-700 whitespace-pre-line">
          {description}
        </div>
      </DialogContent>
    </Dialog>
  );
}
