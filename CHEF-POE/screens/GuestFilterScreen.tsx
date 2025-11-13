import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {  View,  Text,  Button,  TouchableOpacity,  FlatList, StyleSheet } from "react-native";
import { Dish, Course } from "../types";
import MenuItemCard from "../components/MenuItemCard";

type Props = {
  items: Dish[];
  onBack: () => void;
  onSelectDish: (dish: Dish) => void;
};

const ALL_COURSES: Course[] = ["Appetizer", "Main", "Dessert", "Side", "Drink"];

export default function GuestFilterScreen({ items, onBack, onSelectDish }: Props) {
  const [selected, setSelected] = useState<Record<Course, boolean>>({
    Appetizer: false,
    Main: false,
    Dessert: false,
    Side: false,
    Drink: false
  });

  const toggle = (c: Course) => {
    setSelected((prev) => ({ ...prev, [c]: !prev[c] }));
  };

  const activeCourses = useMemo(() => {
    return (Object.keys(selected) as Course[]).filter((c) => selected[c]);
  }, [selected]);

  const filtered = useMemo(() => {
    if (activeCourses.length === 0) return items;
    return items.filter((d) => activeCourses.includes(d.course));
  }, [items, activeCourses]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Filter by Course</Text>
        <Button title="Back" onPress={onBack} />
      </View>

      <View style={styles.chipsRow}>
        {ALL_COURSES.map((c) => {
          const active = !!selected[c];
          return (
            <TouchableOpacity
              key={c}
              onPress={() => toggle(c)}
              style={[styles.chip, active ? styles.chipActive : null]}
            >
              <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {activeCourses.length === 0
            ? `Showing all dishes (${items.length})`
            : `Showing ${filtered.length} dish${filtered.length !== 1 ? "es" : ""} for: ${activeCourses.join(", ")}`}
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectDish(item)} style={{ marginBottom: 10 }}>
            <MenuItemCard dish={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ padding: 12 }}>No dishes match the selected courses.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10
  },
  title: { fontSize: 20, fontWeight: "700" },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    marginBottom: 8
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#fff"
  },
  chipActive: {
    backgroundColor: "#f0f0f0",
    borderColor: "#888"
  },
  chipText: { fontSize: 14 },
  chipTextActive: { fontWeight: "700" },
  summary: { paddingHorizontal: 12, marginBottom: 8 },
  summaryText: { color: "#555" }
});


