import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { TextInput, Button } from 'react-native-paper'
import Toast from '../../components/Extras/Toast'
import { validateEmail, validatePassword } from "../../utilities/validations"
import { publicUrl, siteKey } from "../../utilities/constants"
import Recaptcha from 'react-native-recaptcha-that-works';
import * as functions from '../../utilities/functions'
import * as colors from "../../utilities/colors"
import * as fonts from "../../utilities/fonts"
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'

const Signup = ({ navigation, route }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPasswordl] = useState('')
  const [country, setCountry] = useState('Select your Country')
  const [city, setCity] = useState('Select your City')
  const [token, setToken] = useState(null)
  const [cityId, setcityId] = useState(null)
  const [countryId, setcountryId] = useState(null)
  const [togglePassword, setTogglePassword] = useState(true)
  const recaptchaRef = useRef();

  const send = () => {
    try {
      if (!email && !password && !cityId && !countryId && name) throw new Error('Enter the required feilds')
      if (!cityId && !countryId) throw new Error('Enter your country and city')
      if (!validateEmail(email)) throw new Error('Enter valid email')
      if (!password) throw new Error('Enter password')
      if (!name) throw new Error('Enter password')
      if (!validatePassword(password)) throw new Error('Enter minimum 6 digits password')
      setLoading(true)
      recaptchaRef.current.open()
    } catch (error) {
      Toast(error.message || "Server Error")
    }

  }

  const onVerify = async token => {
    setToken(token)
    await handleSignup()
  }

  const onExpire = () => {
    console.warn('expired!');
  }
  const handleSignup = async () => {
    try {
      if (token == null) {
        Toast("Waiting for recaptcha verification")
        send()
      }
      else if (name && validateEmail(email) && validatePassword(password)) {
        const payload = {
          name: name,
          email: email,
          password: password,
          password_confirmation: password,
          "g-recaptcha-response": token,
          country: countryId,
          city: cityId
        }
        const response = await functions.register(payload)
        if (!response.status) throw new Error(response.message)
        Toast("Register Successfully")
        navigation.replace("Login")
      }

    } catch (error) {
      Toast(error.message || "Server Error")
    }
    finally {
      setLoading(false)
    }
  }
  console.log(countryId, cityId);
  useEffect(() => {
    if (route.params?.data != undefined) {
      setCity(route.params?.data.city)
      setCountry(route.params?.data.country)
      setcountryId(route.params?.data.countryId)
      setcityId(route.params?.data.cityId)
    }
  }, [route.params])
  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView style={{ justifyContent: 'center', marginVertical: 16 }}>
        <Text style={styles.h1}>Signup to BuisnessHub</Text>
        <TextInput
          theme={{ colors: { text: colors.black, placeholder: colors.gray, } }}
          label="Full Name"
          onChangeText={(txt) => setName(txt)}
          mode='outlined'
          activeOutlineColor={colors.gray}
          style={styles.input}
        />
        <TextInput
          theme={{ colors: { text: colors.black, placeholder: colors.gray, } }}
          label="Email"
          onChangeText={(txt) => setEmail(txt)}
          mode='outlined'
          activeOutlineColor={colors.gray}
          style={styles.input}
        />
        <TextInput
          theme={{ colors: { text: colors.black, placeholder: colors.gray, } }}
          label="Password"
          onChangeText={(txt) => setPasswordl(txt)}
          mode='outlined'
          secureTextEntry={togglePassword}
          activeOutlineColor={colors.gray}
          style={styles.input}
          right={<TextInput.Icon
            icon={togglePassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            forceTextInputFocus={false}
            onPress={() => setTogglePassword(!togglePassword)}
          />}
        />
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PlaceAd", "signup")}
            activeOpacity={0.6}
            style={[styles.selectButton]}>
            <Text style={[styles.selectLabel]}>{country}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PlaceAd", "signup")}
            activeOpacity={0.6}
            style={[styles.selectButton]}>
            <Text style={[styles.selectLabel]}>{city}</Text>
          </TouchableOpacity>
        </View>
        <Recaptcha
          ref={recaptchaRef}
          siteKey={siteKey}
          baseUrl={publicUrl}
          onVerify={onVerify}
          onExpire={onExpire}
          size="invisible"
        />
        <Button
          loading={loading}
          onPress={send}
          mode="contained"
          style={[styles.button, { marginTop: 16, backgroundColor: colors.primary }]}
          labelStyle={[styles.ButtonLabel, { color: colors.white }]}
        >SIGNUP</Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,

  },
  h1: {
    color: colors.black,
    fontSize: 20,
    zIndex: 2,
    fontFamily: fonts.MEDIUM,
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
    marginHorizontal: 12,
  },
  button: {
    width: '95%',
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1
  },
  ButtonLabel: {
    fontSize: hp("2.2"),
    color: colors.black,
    fontFamily: fonts.SEMIBOLD,
  },
  selectButton: {
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1,
    marginTop: 8
  },
  selectLabel: {
    fontSize: hp("2"),
    color: colors.gray,
    textAlign: 'justify',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: fonts.REGULAR,
  },
  input: {
    width: '95%',
    marginVertical: 8,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderBlockColor: colors.gray,
    color: colors.gray,
    fontFamily: fonts.SEMIBOLD
  },
})

export default Signup