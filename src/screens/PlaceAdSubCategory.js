import React from 'react';
import { Modal, FlatList, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as colors from "../utilities/colors"
import * as fonts from "../utilities/fonts"
import Separator from '../components/Extras/Separator'
import ArrowRow from '../components/Rows/ArrowRow'

const PlaceAdSubCategory = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'center', marginVertical: 16 }}>
        <Text style={styles.h2}>Now Choose the right category for your ad:</Text>
        <Text style={styles.h4}><Text onPress={()=>navigation.navigate('PlaceAdListing')} style={{ color: colors.primary }}>...</Text>  &gt;<Text onPress={()=>navigation.goBack()} style={{ color: colors.primary }}> Motors</Text>  &gt; Motocycles</Text>

      </View>
      <FlatList
        data={['Used Cars', 'Motorcycles', 'Auto Accessories', "Heavy Vehicles", 'Boats', 'Number Plated']}
        renderItem={({ item }) => (<ArrowRow name={item} navigation={navigation} />)}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={<Separator/>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,

  },
  h1: {
    color: colors.black,
    fontSize: 24,
    zIndex: 2,
    fontFamily: fonts.BOLD,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
  },
  h2: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.BOLD,
    marginBottom: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  h4: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.REGULAR,
    marginHorizontal: 12
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    paddingHorizontal: 14,
    width: wp('80'),
    marginTop: hp('2'),
    height: 54,
    borderColor: colors.black,
    borderWidth: .6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

export default PlaceAdSubCategory;