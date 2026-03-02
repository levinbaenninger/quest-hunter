import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export const useHideTabBar = () => {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation]),
  );
};
