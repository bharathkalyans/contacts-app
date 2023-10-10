import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from 'expo-contacts';

const AddContact = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const addToContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
            const contact = {
                [Contacts.Fields.FirstName]: name,
                [Contacts.Fields.Emails]: [email],
                [Contacts.Fields.PhoneNumbers]: [number],
            };
            const contactId = await Contacts.addContactAsync(contact);
            console.log(`Contact : ${contactId} has been added!`);
            navigation.goBack();
        } else {
            setError("Permission to access contacts is denied");
            console.log('Persmission Denied!');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: "100%",
                    height: 60,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Image
                        source={require("../../src/images/back.png")}
                        style={{ width: 34, height: 34, marginTop: 45 }}
                    />
                </TouchableOpacity>
            </View>
            <Image
                source={require("../../src/images/user.png")}
                style={{ width: 60, height: 60, marginTop: 50, alignSelf: "center" }}
            />
            <TextInput
                placeholder="Enter Name"
                value={name}
                onChangeText={(txt) => setName(txt)}
                style={{
                    width: "90%",
                    height: 50,
                    borderWidth: 0.5,
                    borderRadius: 10,

                    paddingLeft: 15,
                    alignSelf: "center",
                    marginTop: 50,
                }}
            />
            <TextInput
                placeholder="Enter Email"
                value={email}
                onChangeText={(txt) => setEmail(txt)}
                style={{
                    width: "90%",
                    height: 50,
                    borderWidth: 0.5,
                    borderRadius: 10,

                    paddingLeft: 15,
                    alignSelf: "center",
                    marginTop: 20,
                }}
            />
            <TextInput
                placeholder="Enter Mobile"
                value={number}
                onChangeText={(txt) => setNumber(txt)}
                maxLength={10}
                keyboardType="number-pad"
                style={{
                    width: "90%",
                    height: 50,
                    borderWidth: 0.5,
                    borderRadius: 10,

                    paddingLeft: 15,
                    alignSelf: "center",
                    marginTop: 20,
                }}
            />
            <TouchableOpacity
                style={{
                    borderRadius: 10,
                    height: 50,
                    width: "90%",
                    marginTop: 50,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#000000",
                    borderStyle: "solid",
                    backgroundColor: "#000",
                }}
                onPress={() => {
                    addToContacts();
                }}
            >
                <Text style={{ color: "white" }}>Save Contact</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddContact;
