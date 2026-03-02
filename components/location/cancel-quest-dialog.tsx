import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CancelQuestDialog = ({ open, onOpenChange }: Props) => {
  const handleLeave = () => {
    onOpenChange(false);
    router.dismissAll();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Quest verlassen?</AlertDialogTitle>
          <AlertDialogDescription>
            Dein Fortschritt wird gespeichert. Du kannst jederzeit weitermachen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Abbrechen</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleLeave}>
            <Text>Verlassen</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
