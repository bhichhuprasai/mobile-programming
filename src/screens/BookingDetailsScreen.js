import React, { useState, useMemo } from 'react';
import {
  View, Text, Image, TextInput,
  TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/colors';
import BottomNavBar from '../components/BottomNavBar';

const DURATIONS = [
  { label: '1 month', months: 1 },
  { label: '3 months', months: 3 },
  { label: '6 months', months: 6 },
  { label: '12 months', months: 12 },
];

export default function BookingDetailsScreen({ route, navigation }) {
  const { hostel } = route.params;
  const [checkInDate, setCheckInDate] = useState('06/22/2026');
  const [seats, setSeats] = useState(1);
  const [duration, setDuration] = useState(DURATIONS[2]);
  const [showDurationPicker, setShowDurationPicker] = useState(false);

  const totalPrice = useMemo(
    () => hostel.price * duration.months * seats,
    [hostel.price, duration, seats]
  );

  const handleConfirm = () => {
    navigation.navigate('BookingConfirmed', {
      hostel, checkInDate, duration, totalPrice,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hostelCard}>
          <Image source={{ uri: hostel.image }} style={styles.hostelImage} />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.hostelName}>{hostel.name}</Text>
            <Text style={styles.hostelLocation}>{hostel.location}</Text>
            <Text style={styles.hostelPrice}>NPR {hostel.price.toLocaleString()} / month</Text>
          </View>
        </View>

        <Text style={styles.fieldLabel}>Check in Date</Text>
        <TextInput
          style={styles.input}
          value={checkInDate}
          onChangeText={setCheckInDate}
          placeholder="MM/DD/YYYY"
        />

        <Text style={styles.fieldLabel}>No. of Seater</Text>
        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepperButton} onPress={() => setSeats((s) => Math.max(1, s - 1))}>
            <Ionicons name="remove" size={18} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.stepperValue}>{seats}</Text>
          <TouchableOpacity style={styles.stepperButton} onPress={() => setSeats((s) => s + 1)}>
            <Ionicons name="add" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Duration</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowDurationPicker((v) => !v)}>
          <Text style={styles.dropdownText}>{duration.label}</Text>
          <Ionicons name={showDurationPicker ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
        </TouchableOpacity>

        {showDurationPicker && (
          <View style={styles.dropdownList}>
            {DURATIONS.map((d) => (
              <TouchableOpacity
                key={d.label}
                style={styles.dropdownItem}
                onPress={() => { setDuration(d); setShowDurationPicker(false); }}
              >
                <Text style={styles.dropdownItemText}>{d.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>NPR {totalPrice.toLocaleString()} / months</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Booking</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar active="Bookings" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: colors.white, fontWeight: '700', fontSize: 16 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  hostelCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hostelImage: { width: 64, height: 64, borderRadius: radius.sm },
  hostelName: { fontWeight: '700', fontSize: 14, color: colors.text },
  hostelLocation: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  hostelPrice: { fontSize: 13, color: colors.primary, fontWeight: '600', marginTop: 4 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, marginTop: spacing.sm },
  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    backgroundColor: colors.white, fontSize: 14, color: colors.text, marginBottom: spacing.sm,
  },
  stepper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: 6,
    alignSelf: 'flex-start', marginBottom: spacing.sm,
  },
  stepperButton: { padding: 6, backgroundColor: '#EFEDFF', borderRadius: radius.full },
  stepperValue: { width: 40, textAlign: 'center', fontSize: 15, fontWeight: '600', color: colors.text },
  dropdown: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    backgroundColor: colors.white, marginBottom: spacing.sm,
  },
  dropdownText: { fontSize: 14, color: colors.text },
  dropdownList: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, marginBottom: spacing.sm, overflow: 'hidden',
  },
  dropdownItem: { paddingHorizontal: spacing.md, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  dropdownItemText: { fontSize: 14, color: colors.text },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.lg },
  totalLabel: { fontSize: 15, fontWeight: '700', color: colors.text },
  totalValue: { fontSize: 15, fontWeight: '800', color: colors.primary },
  confirmButton: { backgroundColor: colors.success, paddingVertical: 16, borderRadius: radius.full, alignItems: 'center' },
  confirmText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});