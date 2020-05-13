import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, ImageBackground, StyleSheet  } from 'react-native'
import Avatar from "../shared/Avatar";
import { Container, Images, Theme } from "../../kancha";

const styles = StyleSheet.create({
  h1: {
    color: '#072a3d',
    fontSize: 24,
    fontWeight: '600'
  },

  h2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#587b81',
    marginBottom: 20
  },
  h3: {
    fontSize: 10,
    color: '#587b81'
  },
});
export const CustomPassportCredential = (props) => {
  return (
    <View>
      <Text p style={styles.h1}>{props.immunePassportClaimContent.name}</Text>
      <Text p style={styles.h1}>{props.immunePassportClaimContent.surname}</Text>
      <Text p style={styles.h3}>{props.immunePassportClaimContent.country}</Text>
      <View
        style={{
          flexDirection: "row",
          height: 120,
          padding: 5
        }}
      >
        <View>
          <Avatar
            source={{uri: props.immunePassportClaimContent.photo}}
            size={100}
            style={{ borderWidth: 2, borderColor: 'transparent', borderRadius: 5}}
          />
        </View>
        <View style={{paddingLeft: 10}}>
          <Text p style={styles.h3}>Passport</Text>
          <Text p style={styles.h2} >{props.immunePassportClaimContent.passport}</Text>
          <Text p style={styles.h3}>Phone</Text>
          <Text p style={styles.h2}>{props.immunePassportClaimContent.phone}</Text>
        </View>
      </View>
    </View>
  )
};
