import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../theme/colors';

export default function Header({ onBack }) {
  return (
    <View style={styles.container}>
      {onBack
        ? <TouchableOpacity onPress={onBack} style={styles.back}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        : <View style={styles.ph} />
      }
      <View style={styles.logo}>
        <Image
          source={require('../assets/images/akreplogo.png')}
          style={styles.logoImg}
          resizeMode="contain"
        />
      </View>
      <View style={styles.ph} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  back: { width: 45, height: 45, borderRadius: 10, backgroundColor: colors.lightBlue, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: colors.primary, fontWeight: '300', lineHeight: 35 },
  logo: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  logoImg: { width: 40, height: 40 },
  ph: { width: 45 },
});