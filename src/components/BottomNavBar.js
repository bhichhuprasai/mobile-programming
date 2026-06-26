import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';

const tabs = [
  { name: 'Home', icon: 'home-outline' },
  { name: 'Bookings', icon: 'calendar-outline' },
  { name: 'Profile', icon: 'person-outline' },
];

export default function BottomNavBar({ active, navigation }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.name} style={styles.tab}>
          <Ionicons
            name={tab.icon}
            size={22}
            color={active === tab.name ? colors.primary : colors.textMuted}
          />
          <Text style={[styles.label, active === tab.name && styles.activeLabel]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5F0',
    paddingVertical: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    color: '#8A8AA3',
    marginTop: 2,
  },
  activeLabel: {
    color: '#5B4FE9',
    fontWeight: '600',
  },
});