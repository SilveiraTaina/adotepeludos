import { router } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";

function ToggleSelector({ options, onChange }) {
    const [selected, setSelected] = useState(options[0].value);

    const handleSelect = (value) => {
        setSelected(value);
        onChange?.(value);
    };

    return (
        <View style={styles.row}>
            {options.map((option) => {
                const isSelected = selected === option.value;
                return (
                    <TouchableOpacity
                        key={option.value}
                        style={[styles.button, isSelected && styles.buttonSelected]}
                        onPress={() => handleSelect(option.value)}
                    >
                        <Text style={[styles.text, isSelected && styles.textSelected]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function formularioScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Adote Peludos</Text>
            </View>

            <Text style={{ textAlign: 'center', padding: 10, fontWeight: "bold", fontSize: 18 }}>
                Formulário de Adoção
            </Text>

            <View style={styles.containerQuest}>

                <Text style={styles.label}>Nome completo</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                />

                <Text style={styles.label}>Telefone/Whatsapp:</Text>
                <TextInput
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    maxLength={15}
                    style={styles.input}
                />

                <Text style={styles.label}>Tipo de moradia:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                />

                <Text style={styles.label}>Endereço:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                />
                <Text style={styles.label}>Motivo da Adoção:</Text>
                <TextInput
                    placeholder=""
                    style={styles.input}
                />
            </View>

            <View style={styles.botãoTemAnimais}>
                <Text style={styles.label}>Tem mais animais?</Text>
                <ToggleSelector
                    options={[
                        { label: 'Sim', value: 'sim' },
                        { label: 'Não', value: 'nao' },
                    ]}
                    onChange={(value) => console.log(value)}
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => router.push("/telaConfirmacao")} style={styles.botaoEnviarSolic}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", textAlign: "center" }}>
                        Enviar Solicitação
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        backgroundColor: "#FF6B00",
        paddingTop: 56,
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
    row: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f5f5f5',
    },
    botãoTemAnimais: {
        alignItems: 'center',
        marginVertical: 10,

    },

    buttonSelected: {
        borderColor: '#e07060',
        backgroundColor: '#fde8e4',
    },
    text: {
        fontSize: 15,
        color: '#555',
    },
    textSelected: {
        color: '#c0392b',
        fontWeight: 'bold',
    },
    containerQuest: {
        padding: 16,
        flexDirection: "column",
    },
    label: {
        marginBottom: 6,
        fontSize: 14,
        color: "#555",
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 12,
    },
    botaoEnviarSolic: {
        backgroundColor: "#FF6B00",
        paddingVertical: 14,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 20,

    }
});