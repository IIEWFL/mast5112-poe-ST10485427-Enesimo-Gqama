import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text, Button, StyleSheet} from 'react-native';

type Props = {
    onChoose: (course: string) => void;
    onBack: () => void;
};

export default function CourseSelectionScreen({ onChoose, onBack }: Props) {
    const courses = ["Starter", "Main", "Dessert", "Drink"];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select Course</Text>

            {courses.map((course) => (
                <View key={course} style={{ marginVertical: 6 }}>
                    <Button title={course} onPress={() => onChoose(course)}/>
                </View>
            ))}

            <View style={{ margin: 20}}>
                <Button title="Back" onPress={onBack}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16},
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});


