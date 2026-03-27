
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
//componente


export default function telaConfirmacaoScreen() {


    return (

        /* Header */
        <><View style={styles.header}>
            <Text style={styles.headerTitle}>Adote Peludos</Text>
        </View>

            <ScrollView style={styles.container}
                contentContainerStyle={styles.body}
                showsVerticalScrollIndicator={false}>

                <View style={styles.content}>
                    <View>

                        <Image source={require('../assets/images/verifica.png')} style={styles.imgConf} />

                        <Text style={[styles.textCenter,
                        { fontWeight: "bold", fontSize: 20, marginTop: 10, marginBottom: 20 }]}>
                            Solicitação enviada!
                        </Text>
                        <Text style={[styles.textCenter, { marginBottom: 20 }]}>A equipe entrara em contato
                            em breve via {"\n"}WhatsApp.</Text>
                    </View>

                    <View style={styles.containerInstrucoes}>
                        <Text style={[styles.textCenter, {
                            color: '#c0392b',
                            fontWeight: 'bold', marginBottom: 8,
                            textAlign: "left",
                        }]}>
                            Próximos Passos
                        </Text>
                        <Text style={[styles.textCenter, { color: '#c0392b', lineHeight: 22, textAlign: "left", }]}>
                            1. Aguardar contato por WhatsApp.{"\n"}
                            2. Visita ao animal;{"\n"}
                            3. Assinar termo de adoção,
                        </Text>
                    </View>


                    <View>

                        <TouchableOpacity onPress={() => router.replace("/perfil")}
                            style={styles.botaoMinhasSolicitaçoes}>
                            <Text style={[styles.textCenter, { color: "#fff", fontWeight: "bold" }]}>
                                Ver minha Solicitação
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.replace("/(tabs)")}
                            style={styles.botaoHome}
                        >
                            <Text style={styles.textCenter}>
                                Voltar ao início
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView ></>
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

    body: {
        flexGrow: 1, padding: 16, alignItems: "center",
        marginTop: 70,
        justifyContent: "flex-start",
    },

    sectionLabel: {
        fontSize: 11,
        color: "#999",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        fontWeight: "600",
        marginBottom: 12,
    },

    content: {
        width: "100%",
        alignItems: "center"
    },

    textCenter: {
        textAlign: "center",
        marginBottom: 8,
        fontSize: 16
    },

    imgConf: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    botaoMinhasSolicitaçoes: {
        paddingVertical: 8,
        paddingHorizontal: 80,
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: "#FF6B00"
    },
    botaoHome: {
        paddingVertical: 8,
        paddingHorizontal: 80,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#999"
    },

    containerInstrucoes: {
        borderWidth: 2,
        borderColor: '#e07060',
        backgroundColor: '#fde8e4',
        borderRadius: 10,
        padding: 12,
        marginTop: 20
    }

})

