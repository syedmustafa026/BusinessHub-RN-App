import React from 'react';
import { FlatList, StyleSheet, View, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import * as colors from "../utilities/colors"
import * as fonts from "../utilities/fonts"
import ThinNameRow from '../components/Rows/ThinNameRow';

const ResultsSubCategory = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ justifyContent: 'center', marginBottom: 1 }}>
            <ThinNameRow name={'All in Community'} style={{ fontFamily: fonts.SEMIBOLD }} navigation={navigation} dir={'SearchedResults'} />
            <FlatList
              data={['Motorcycles', "Heavy Vehicles", 'Boats', 'Motorcycles', 'Auto Accessories', 'Auto Accessories', "Heavy Vehicles", 'Boats', 'Motorcycles', 'Auto Accessories', "Heavy Vehicles", 'Boats', 'Number Plated']}
              renderItem={({ item }) => (<ThinNameRow name={item} navigation={navigation} dir={'SearchedResults'} />)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    width: wp('100'),
    height: hp('105'),
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.SEMIBOLD,
  },
  h4: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.REGULAR,
    textAlign: 'center'
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

export default ResultsSubCategory;