import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={48} color="#fff" />
        </View>
        <Text style={styles.name}>Student User</Text>
        <Text style={styles.email}>student@example.com</Text>
      </View>
      <BottomNavBar active="Profile" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FB' },
  header: {
    backgroundColor: '#5B4FE9',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatarCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#5B4FE9', alignItems: 'center',
    justifyContent: 'center', marginBottom: 16,
  },
  name: { fontSize: 18, fontWeight: '800', color: '#1E1E2D' },
  email: { fontSize: 13, color: '#8A8AA3', marginTop: 4 },
});
