import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Button } from "react-native-paper"
import * as colors from "../../utilities/colors"
import * as fonts from "../../utilities/fonts"
import * as functions from '../../utilities/functions'
import Toast from "../../components/Extras/Toast";

const Profile = ({ navigation, route }) => {

    const handleDeleteAccount = async () => {
        try {
            const response = await functions.deleteAccount()
            if (!response.status) throw new Error(response.message)
            console.log(response);
            if (response.status) {
                await functions.removeItem("user")
                Toast("Your account has been deleted")
                navigation.replace("BottomNavigator")
            }
        } catch (error) {
            Toast(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: colors.white }}>
                <View style={styles.gapRow}>
                    <Text style={styles.topicHeading}>Personal Details</Text>
                    <Button
                        onPress={() => navigation.navigate('EditProfile', route.params)}
                        mode="contained"
                        icon={'pencil'}
                        style={styles.button}
                        labelStyle={styles.ButtonLabel}
                    >Edit</Button>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                    <Image style={styles.image} source={{ uri: route.params.image_url }} />
                    <View style={{ marginVertical: 12, marginHorizontal: 15, paddingHorizontal: 5, paddingVertical: 15, borderRadius: 10 }}>
                        <View style={[styles.header, {}]}>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <View style={styles.row}>
                                    <Icon name='account-outline' color={colors.gray} size={20} />
                                    <Text style={styles.h2}>{route.params.name}</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Icon name='email-outline' color={colors.gray} size={20} />
                                        <Text style={styles.h2}>{route.params.email}</Text>
                                    </View>
                                    {route.params.email == null ? <Icon name='close-circle' color={colors.red} size={20} /> :
                                        <Icon name='check-circle' color={colors.green} size={20} />}
                                </View>
                                <View style={styles.row}>
                                    <Icon name='cellphone' color={colors.gray} size={20} />
                                    <Text style={styles.h2}>{route.params.phone}</Text>
                                    {route.params.phone == null ? <Icon name='close-circle' color={colors.red} size={20} /> :
                                        <Icon name='check-circle' color={colors.green} size={20} />}
                                </View>
                                {/* <View style={styles.row}>
                                    <Icon name='facebook' color={colors.gray} size={20} />
                                    <Text style={styles.h2}>Arora Pawas </Text>
                                    <Icon name='check-circle' color={colors.green} size={20} />
                                </View> */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 20, marginTop: 30, backgroundColor: colors.white }}>
                <Text style={styles.topicHeading}> Account Settings</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={styles.selectRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name='lock-outline'
                            size={24}
                            color={colors.black} />
                        <Text style={styles.selectText}>Change your Password</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcon
                            name='arrow-forward-ios'
                            size={16}
                            color={colors.black} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("Sure", "Are you sure you want to delete your account?", [{
                            text: "Yes",
                            onPress: handleDeleteAccount
                        }, {
                            text: "Cancel",
                        }], {
                            cancelable: true
                        })
                    }}
                    style={styles.selectRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name='trash-can-outline'
                            size={24}
                            color={colors.black} />
                        <Text style={styles.selectText}>Delete Account</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcon
                            name='arrow-forward-ios'
                            size={16}
                            color={colors.black} />
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: -18
    },
    gapRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 5,
        marginRight: 12,
        borderRadius: 100,
        resizeMode: 'contain'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
    },
    h2: {
        fontSize: 13,
        color: colors.gray,
        fontFamily: fonts.SEMIBOLD,
        marginVertical: 8,
        marginHorizontal: 4
    },
    topicHeading: {
        color: colors.secondary,
        fontFamily: fonts.SEMIBOLD
    },
    selectRow: {
        marginHorizontal: 5,
        marginVertical: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    selectText: {
        fontSize: 16,
        color: colors.black,
        marginHorizontal: 15,
        fontFamily: fonts.SEMIBOLD
    },
    button: {
        width: '20%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderWidth: 1
    },
    ButtonLabel: {
        color: colors.primaryLight,
        fontSize: 12,
        fontFamily: fonts.SEMIBOLD
    },
})
export default Profile

