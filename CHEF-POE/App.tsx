import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import GuestMenuScreen from "./screens/GuestMenuScreen";
import ChefManageScreen from "./screens/ChefManageScreen";
import KitchenMenuScreen from "./screens/KitchenMenuScreen";
import CourseSelectionScreen from "./screens/CourseSelectionScreen";
import DishDetailScreen from "./screens/DishDetailScreen";
import GuestFilterScreen from "./screens/GuestFilterScreen";
import { Dish } from "./types";
import { loadMenu, saveMenu, clearMenu } from "./storage/menuStorage";


/**
 * Root app — switches between modes (Guest, Chef Manage, Chef Kitchen)
 * Data lives in AsyncStorage; no hardcoded menu items.
 */

export default function App() {
  const [items, setItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  //update: added course_select, dish_details and guest_filter
  const [mode, setMode] = useState<"guest" | "chef_manage" | "chef_kitchen" | "course_select" | "dish_details" | "guest_filter">("guest");

  //State for selected course and selected dish
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  useEffect(() => {
    (async () => {
      const loaded = await loadMenu();
      setItems(loaded);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    // persist changes
    (async () => {
      await saveMenu(items);
    })();
  }, [items]);

  const handleSaveDish = (d: Dish) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === d.id);
      if (idx >= 0) {
        const arr = [...prev];
        arr[idx] = d;
        return arr;
      }
      return [...prev, d];
    });
  };

  const handleDelete = (id: string) => {
    setItems((p) => p.filter((x) => x.id !== id));
  };

  // Kitchen quick edit (simple modal-like prompts)
  const handleKitchenEdit = (d: Dish) => {
    // Keep lightweight: use Alert.prompt on iOS but since not cross-platform,
    // use two-step Alert with prompt-like behavior by instructing user to use Manage for complex edits.
    // We'll use a simple confirm to increase price by 0 or let chef use Manage for full edits.
    Alert.prompt?.(
      "Edit dish",
      "Edit dish name:",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: (text?: string) => {
            const newName = text ?? d.name;
            // ask for price
            Alert.prompt?.(
              "Price",
              "Enter new price (e.g. 120.00)",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "OK",
                  onPress: (priceStr: any) => {
                    const p = Number(priceStr);
                    if (Number.isNaN(p)) {
                      Alert.alert("Invalid price");
                      return;
                    }
                    handleSaveDish({ ...d, name: newName, price: p });
                  }
                }
              ],
              "plain-text",
              String(d.price)
            );
          }
        }
      ],
      "plain-text",
      d.name
    );
  };

  // On platforms where Alert.prompt isn't available (Android), fallback:
  const handleKitchenEditFallback = (d: Dish) => {
    Alert.alert("Quick Edit", "Use Chef Manage to perform full edits. Would you like to open Manage?", [
      { text: "Cancel", style: "cancel" },
      { text: "Open Manage", onPress: () => setMode("chef_manage") }
    ]);
  };

  const kitchenEditHandler = (d: Dish) => {
    if (typeof Alert.prompt === 'function') handleKitchenEdit(d);
    else handleKitchenEditFallback(d);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Christoffel's Cuisine</Text>
        <View style={styles.buttons}>
          <Button title="Guest View" onPress={() => setMode("guest")} />
          <Button title="Chef: Manage" onPress={() => setMode("chef_manage")} />
          <Button title="Chef: Kitchen" onPress={() => setMode("chef_kitchen")} />
          <Button title="Filter" onPress={() => setMode("guest_filter")}/>  
        </View>
      </View>

      <View style={{ flex: 1 }}>
         {mode === "guest" && (
          <GuestMenuScreen
            items={items}
            selectedCourse={selectedCourse} 
            onSelectCourse={() => setMode("course_select")}
            onSelectDish={(dish) => {                      
              setSelectedDish(dish);
              setMode("dish_details");
            }}
          />
        )}

        {mode === "course_select" && (
          <CourseSelectionScreen 
          onChoose={(course) => {
            setSelectedCourse(course);
            setMode("guest");
          }}
          onBack={() => setMode("guest")}
          />
        )}

        {mode === "dish_details" && selectedDish && (
          <DishDetailScreen
          dish={selectedDish}
          onBack={() => setMode("guest")}
          />
        )}

        {mode === "guest_filter" && (
          <GuestFilterScreen
          items={items}
          onBack={() => setMode("guest")}
          onSelectDish={(d) => {
            setSelectedDish(d);
            setMode("dish_details");
          }}/>
        )}

        {mode === "chef_manage" && (
          <ChefManageScreen items={items} onSave={handleSaveDish} onDelete={handleDelete} />
        )}
        {mode === "chef_kitchen" && (
          <KitchenMenuScreen items={items} onEdit={(d) => kitchenEditHandler(d)} />
        )}
      </View>

      <View style={styles.footer}>
        <Text style={{ color: "#666" }}>Data saved to device storage (AsyncStorage).</Text>
        <View style={{ height: 8 }} />
        <Button
          title="Clear All Menu Items (for testing)"
          color="#d9534f"
          onPress={() =>
            Alert.alert("Clear all", "Remove all menu items?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Clear",
                style: "destructive",
                onPress: async () => {
                  await clearMenu();
                  setItems([]);
                }
              }
            ])
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#f9b556ff"
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  buttons: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  footer: { padding: 12, borderTopWidth: 1, borderColor: "#eee" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" }
});


