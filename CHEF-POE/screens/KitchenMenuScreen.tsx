import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Dish } from "../types/index";
import MenuItemCard from "../components/MenuItemCard";

export default function KitchenMenuScreen({
  items,
  onEdit
}: {
  items: Dish[];
  onEdit: (d: Dish) => void;
}) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Kitchen Menu</Text>
        <Text style={{ color: "#444", marginBottom: 12 }}>Quick list for kitchen — tap Edit to modify.</Text>

        {items.length === 0 ? <Text>No items in menu yet.</Text> : null}
        {items.map((d) => (
          <MenuItemCard key={d.id} dish={d} onEdit={onEdit} />
        ))}
      </View>
    </ScrollView>
  );
}


