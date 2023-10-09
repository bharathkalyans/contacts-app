import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import * as Contacts from "expo-contacts";

export default function Contact({ navigation }) {
    const [error, setError] = useState(undefined);
    const [contactsList, setContactsList] = useState();

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.FirstName,
                        Contacts.Fields.LastName,
                        Contacts.Fields.PhoneNumbers,
                    ],
                });

                if (data.length > 0) {
                    setContactsList(data);
                } else {
                    setError("No contacts found");
                }
            } else {
                setError("Permission to access contacts is denied");
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={contactsList}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width: "90%",
                                height: 70,
                                alignSelf: "center",
                                borderWidth: 0.5,
                                borderRadius: 10,
                                marginTop: 10,
                                // justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image
                                    source={require("../../src/images/user.png")}
                                    style={{ width: 40, height: 40, marginHorizontal: 15 }}
                                />
                            </View>
                            <View style={{
                                padding: 10,

                            }}>
                                <Text>{item.name}</Text>
                                {item.phoneNumbers && <Text style={{ marginTop: 5 }}>{item.phoneNumbers[0].number}</Text>}
                            </View>
                            <View style={{ flexDirection: "row", paddingRight: 10, gap: 15 }}>
                                <TouchableOpacity >
                                    <Image
                                        source={require('../../src/images/email.png')}
                                        style={{ width: 24, height: 28, tintColor: "#000" }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Image
                                        source={require('../../src/images/call.png')}
                                        style={{ width: 20, height: 24, tintColor: "#000" }}
                                    />
                                </TouchableOpacity>
                            </View>


                        </View>
                    );
                }}
            />
            <TouchableOpacity
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#fff',
                    position: 'absolute',
                    right: 30,
                    bottom: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    navigation.navigate('AddContact');
                }}>
                <Image
                    source={require('../../src/images/add.png')}
                    style={{ width: 54, height: 54, }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
