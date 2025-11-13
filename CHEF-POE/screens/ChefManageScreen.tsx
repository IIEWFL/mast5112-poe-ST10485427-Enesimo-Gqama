import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert} from "react-native";
import { Dish, Course } from "../types/index";
import MenuItemCard from "../components/MenuItemCard";
import { uid } from "../utils/uid";

export default function ChefManageScreen({
  items,
  onSave,
  onDelete
}: {
  items: Dish[];
  onSave: (d: Dish) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState<Dish | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState<Course>("Main");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setDescription(editing.description ?? "");
      setPrice(String(editing.price));
      setCourse(editing.course);
      setImage(editing.image ?? "");
    } else {
      setImage("");
      setName("");
      setDescription("");
      setPrice("");
      setCourse("Main");
    }
  }, [editing]);

  const startAdd = () => {
    setEditing({ id: uid(), name: "", description: "", price: 0, course: "Main" });

    setImage("");
  };
  

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Dish name is required");
      return;
    }
    const p = Number(price);
    if (Number.isNaN(p) || p < 0) {
      Alert.alert("Validation", "Please enter a valid price");
      return;
    }
    const dish: Dish = {
      id: editing?.id ?? uid(),
      name: name.trim(),
      description: description.trim(),
      price: p,
      course,
      image: image.trim(),
    };
    onSave(dish);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete dish", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(id)
      }
    ]);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Text style={styles.header}>Manage Order / Chef</Text>
        <Text style={styles.sub}>Add or edit dishes. Changes persist to device storage.</Text>

        <View style={{ marginVertical: 12 }}>
          <Button title="Add New Dish" onPress={startAdd} />
        </View>

        {editing ? (
          <View style={styles.form}>
            <Text style={styles.fieldLabel}>Dish Name</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} />

            <Text style={styles.fieldLabel}>Course</Text>
            <View style={styles.courseRow}>
              {(["Appetizer", "Main", "Dessert", "Side", "Drink"] as Course[]).map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setCourse(c)}
                  style={[styles.courseBtn, course === c ? styles.courseBtnActive : null]}
                >
                  <Text>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <Text style={styles.fieldLabel}>Price (e.g. 120.00)</Text>
            <TextInput value={price} onChangeText={setPrice} style={styles.input} keyboardType="decimal-pad" />

            <Text style={styles.fieldLabel}>Image Filename (e.g. tbone_steak.jpg)</Text>
            <TextInput 
              value={image}
              onChangeText={setImage}
              style={styles.input}
              placeholder="tbone_steak.jpg"/>

            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={() => setEditing(null)} />
              {editing?.id ? (
                <Button title="Delete" color="#797979ff" onPress={() => handleDelete(editing.id)} />
              ) : null}
            </View>
          </View>
        ) : null}

        <View style={{ marginTop: 18 }}>
          <Text style={{ fontWeight: "700", marginBottom: 8 }}>All Dishes</Text>
          {items.length === 0 ? <Text>No dishes yet. Add one above.</Text> : null}
          {items.map((d) => (
            <View key={d.id} style={{ marginBottom: 8 }}>
              <MenuItemCard dish={d} onEdit={(dish) => setEditing(dish)} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 20, fontWeight: "700" },
  sub: { color: "#444", marginTop: 6 },
  form: { marginTop: 12, padding: 10, borderWidth: 1, borderColor: "#eee", borderRadius: 8 },
  fieldLabel: { marginTop: 8, marginBottom: 4, fontSize: 13 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 6, backgroundColor: "#fff" },
  courseRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 8 },
  courseBtn: { padding: 8, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", marginRight: 8, marginBottom: 8 },
  courseBtnActive: { borderColor: "#000" }
});

