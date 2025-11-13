import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Dish } from "../types/index";
import { formatPrice } from "../utils/format";
import { dishImages } from "../utils/imageLoader";

type Props = {
  dish: Dish;
  onEdit?: (d: Dish) => void;
};

export default function MenuItemCard({ dish, onEdit }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.course}>{dish.course}</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.price}>{formatPrice(dish.price)}</Text>
          {onEdit ? (
            <TouchableOpacity onPress={() => onEdit(dish)} style={styles.editBtn}>
              <Text style={styles.editTxt}>Edit</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {dish.image && dishImages[dish.image] ? (
        <Image 
        source={dishImages[dish.image]}
        style={{ width: "100%", height: 140, borderRadius: 8, marginTop: 10}}
        resizeMode="cover"/>
      ) : null}

      {dish.description ? <Text style={styles.desc}>{dish.description}</Text> : null}
    </View>

  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9b556ff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6"
  },
  row: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: 16, fontWeight: "700" },
  course: { fontSize: 12, color: "#666", marginTop: 4 },
  price: { fontWeight: "700" },
  desc: { marginTop: 8, color: "#333" },
  editBtn: { marginTop: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: "#ddd" },
  editTxt: { fontSize: 12 }
});


