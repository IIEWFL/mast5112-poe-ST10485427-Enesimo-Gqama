import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Course } from "../types/index";

const COURSES: (Course | "All")[] = ["All", "Appetizer", "Main", "Dessert", "Side", "Drink"];

export default function FilterBar({
  selected,
  onChange
}: {
  selected: Course | "All";
  onChange: (c: Course | "All") => void;
}) {
  return (
    <View style={styles.row}>
      {COURSES.map((c) => {
        const active = c === selected;
        return (
          <TouchableOpacity
            key={c}
            style={[styles.btn, active ? styles.btnActive : null]}
            onPress={() => onChange(c)}
          >
            <Text style={[styles.txt, active ? styles.txtActive : null]}>{c}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
    marginBottom: 8
  },
  btnActive: { backgroundColor: "#eee", borderColor: "#333" },
  txt: { fontSize: 13 },
  txtActive: { fontWeight: "700" }
});


