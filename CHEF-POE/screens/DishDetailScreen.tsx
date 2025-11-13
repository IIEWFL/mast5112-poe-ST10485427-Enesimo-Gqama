import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Dish } from "../types";
import { dishImages  } from '../utils/imageLoader';

type Props = {
    dish: Dish;
    onBack: () => void;
};

export default function DishDetailScreen({ dish, onBack }: Props) {

    const imageSource = dish.image ? dishImages[dish.image] : null;
    
    return (
        <SafeAreaView style={styles.container}>
            <Button title="Back" onPress={onBack}/>

            {imageSource ? (
                <Image source={imageSource} style={styles.image} resizeMode="cover"/>
            ) : null}
            
            <Text style={styles.title}>{dish.name}</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Course:</Text>
                <Text style={styles.value}>{dish.course}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>{dish.price}</Text>
            </View>

            {dish.description ? (
                <View style={styles.section}>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{dish.description}</Text>
                </View>
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    section: { marginVertical: 10 },
    label: { fontSize: 16, fontWeight: "600"},
    value: { fontSize: 16, marginTop: 4},
});
