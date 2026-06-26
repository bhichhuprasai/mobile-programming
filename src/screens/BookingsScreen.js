import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';
import BottomNavBar from '../components/BottomNavBar';

export default function BookingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="calendar-outline" size={60} color="#8A8AA3" />
        <Text style={styles.emptyText}>No bookings yet</Text>
        <Text style={styles.emptySubtext}>Your confirmed bookings will appear here</Text>
      </View>
      <BottomNavBar active="Bookings" navigation={navigation} />
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
  emptyText: { fontSize: 16, fontWeight: '700', color: '#1E1E2D', marginTop: 16 },
  emptySubtext: { fontSize: 13, color: '#8A8AA3', marginTop: 4 },
});
