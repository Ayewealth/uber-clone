import React from "react";
import { FlatList, View } from "react-native";
import RideLayout from "@/components/RideLayout";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";
import DriverCard from "@/components/DriverCard";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id!))}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
