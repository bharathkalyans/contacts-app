import {
    View,
    Text,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import Communications from 'react-native-communications';


const ContactDetails = ({ navigation }) => {
    const route = useRoute();
    const deleteContact = async (lookupKey) => {
        if (lookupKey !== undefined)
            await Contacts.removeContactAsync(lookupKey);
        console.log(`Deleted Contact with ID : ${lookupKey}`);
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 20,
                }}>
                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image
                        source={require('../../src/images/back.png')}
                        style={{ width: 24, height: 24, }}
                    />
                </TouchableOpacity> */}
            </View>
            <Image
                source={require('../../src/images/user.png')}
                style={{ width: 60, height: 60, marginTop: 50, alignSelf: 'center' }}
            />
            <Text style={{ alignSelf: 'center', marginTop: 20, fontWeight: "bold" }}>
                {route.params.data.firstName}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 60,
                    marginTop: 50,

                }}>
                {route.params.data.phoneNumbers && <Text
                    style={{
                        alignSelf: 'center',
                        marginTop: 20,
                        marginLeft: 20,
                        fontWeight: "bold"
                    }}>
                    {route.params.data.phoneNumbers[0].number}
                </Text>}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingRight: 15,
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() =>
                        route.params.data.phoneNumbers && Communications.text(`${route.params.data.phoneNumbers[0].number}`)
                    }>
                        <Image
                            source={require('../../src/images/email.png')}
                            style={{
                                width: 24,
                                height: 24,
                                marginRight: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        route.params.data.phoneNumbers &&
                            Communications.phonecall(
                                `${route.params.data.phoneNumbers[0].number}`,
                                true
                            );
                    }}>
                        <Image
                            source={require('../../src/images/call.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={{
                    width: '70%',
                    height: 50,
                    borderRadius: 10,
                    marginTop: 100,
                    borderWidth: 1,

                    borderColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={() => {
                    deleteContact(route.params.data.lookupKey);
                }}>
                <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ContactDetails