
import { router, useNavigation } from "expo-router";

import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
} from "react-native";
import Index from ".";


//componente


export default function telaConfirmacaoScreen() {


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Adote Peludos</Text>
            </View>


            <View>

                <Image source={require('../assets/images/verifica.png')} style={styles.imgConf} />

                <Text>
                    Solicitação enviada!
                </Text>
                <Text>A equipe entrara em contato
                    em breve via WhatsApp.</Text>
            </View>

            <View>
                <Text>
                    Próximos Passos
                </Text>
                <Text>
                    1. Aguardar contato por WhatsApp.
                    2. Visita ao animal;
                    3. Assinar termo de adoção,
                </Text>
            </View>


            <View>

                <Text style={{ textAlign: 'center' }}>
                    Ver minha solicitação
                </Text>

                <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
                    <Text>
                        Voltar ao início
                    </Text>
                </TouchableOpacity>
            </View>

            <View>

                <Button
                    title="Botao teste ir para home"
                    onPress={() => router.push("/(tabs)")}
                />
            </View>

        </ScrollView>
    );
}
/*estilos */

const styles = StyleSheet.create({

    container: { flex: 1, backgroundColor: "#fff" },

    header: {
        backgroundColor: "#FF6B00",
        paddingTop: 56,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
    headerSub: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 2 },

    body: { padding: 16 },

    sectionLabel: {
        fontSize: 11,
        color: "#999",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        fontWeight: "600",
        marginBottom: 12,
    },

    imgConf: {
        width: 100,
        height: 100,
        alignItems: "center",
    },

})

