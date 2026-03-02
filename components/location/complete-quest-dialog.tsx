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

export const CompleteQuestDialog = ({ open, onOpenChange, questId }: Props) => {
  const completeQuest = useMutation(api.quests.complete);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async (goToLeaderboard: boolean) => {
    setIsCompleting(true);
    try {
      await completeQuest({ questId: questId as Id<"quests"> });
      if (goToLeaderboard) {
        router.replace("/(tabs)/(leaderboard)");
      } else {
        router.dismissAll();
      }
    } catch {
      Alert.alert(
        "Fehler",
        "Quest konnte nicht abgeschlossen werden. Bitte versuche es erneut.",
      );
    } finally {
      setIsCompleting(false);
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Quest abgeschlossen!</AlertDialogTitle>
          <AlertDialogDescription>
            Du hast diese Quest erfolgreich abgeschlossen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onPress={() => handleComplete(false)}
            disabled={isCompleting}
          >
            <Text>OK</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            onPress={() => handleComplete(true)}
            disabled={isCompleting}
          >
            <Text>
              {isCompleting ? "Wird gespeichert…" : "Zum Leaderboard"}
            </Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
