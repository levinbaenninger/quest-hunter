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
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questId: string;
};

export const CancelQuestDialog = ({ open, onOpenChange, questId }: Props) => {
  const cancelQuest = useMutation(api.quests.cancel);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await cancelQuest({ questId: questId as Id<"quests"> });
      router.dismissAll();
    } catch {
      Alert.alert(
        "Fehler",
        "Quest konnte nicht abgebrochen werden. Bitte versuche es erneut.",
      );
    } finally {
      setIsCancelling(false);
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Quest abbrechen?</AlertDialogTitle>
          <AlertDialogDescription>
            Möchtest du die Quest wirklich abbrechen? Dein Fortschritt geht
            verloren.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isCancelling}>
            <Text>Abbrechen</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleCancel} disabled={isCancelling}>
            <Text>{isCancelling ? "Wird abgebrochen…" : "Quest beenden"}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
