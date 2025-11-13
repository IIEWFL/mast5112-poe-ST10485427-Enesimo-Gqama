import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import { Dish, Course } from "../types/index";
import MenuItemCard from "../components/MenuItemCard";
import FilterBar from "../components/FilterBar";

type Props = {
  items: Dish[];
  selectedCourse: string | null;
  onSelectCourse: () => void;
  onSelectDish: (dish: Dish) => void;
};

export default function GuestMenuScreen({ items, selectedCourse, onSelectCourse, onSelectDish }: Props) {
  const [filter, setFilter] = useState<Course | "All">("All");

  const filtered = useMemo(() => {
    let base = items;

    if (selectedCourse) {
      base = base.filter((i) => i.course === selectedCourse)
    }

    if (filter === "All") return base;
    return base.filter((i) => i.course === filter);
  }, [items, filter, selectedCourse]);

  const averages = useMemo(() => {
    const courseList: Course[] = ["Appetizer", "Main", "Dessert", "Side", "Drink"];

    return courseList.map((course) => {
      const dishes = items.filter((i) => i.course === course);
      const total = dishes.reduce((sum,d) => sum + d.price, 0);
      const avg = dishes.length > 0 ? total / dishes.length : 0;

      return {
        course,
        count: dishes.length,
        avg,
      };
    });
  }, [items]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Kitchen Menu (Guest)</Text>

        <View style={{marginTop: 10, padding: 10, backgroundColor: "#ffc95eff", borderRadius: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>Average Price by Course</Text> 

          {averages.map((a) => (
            <View 
            key={a.course}
            style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <Text>{a.course}</Text>
              <Text>{a.count === 0 ? "_" : "R" + a.avg.toFixed(2)}</Text>
            </View>
          ))}

        </View>

        <View style={{ marginVertical: 10 }}>
          <Button title="Choose Course" onPress={onSelectCourse}/>
        </View>

        <FilterBar selected={filter} onChange={setFilter} />
        {filtered.length === 0 ? <Text>No dishes match.</Text> : null}
        {filtered.map((d) => (
          <TouchableOpacity key={d.id} onPress={() => onSelectDish(d)}>
            <MenuItemCard dish={d}/>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}


