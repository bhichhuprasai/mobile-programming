import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/colors';
import BottomNavBar from '../components/BottomNavBar';

export default function BookingConfirmedScreen({ route, navigation }) {
  const { hostel, checkInDate, duration, totalPrice } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={48} color={colors.white} />
        </View>

        <Text style={styles.title}>Booking confirmed!</Text>
        <Text style={styles.subtitle}>Your booking has been confirmed Successfully</Text>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Booking Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hostel</Text>
            <Text style={styles.detailValue}>{hostel.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Check in</Text>
            <Text style={styles.detailValue}>{checkInDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{duration.label}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Price</Text>
            <Text style={styles.detailValue}>NPR {totalPrice.toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Bookings')}>
          <Text style={styles.primaryButtonText}>View My Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>

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
  content: { flex: 1, alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl },
  checkCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: colors.success, alignItems: 'center',
    justifyContent: 'center', marginBottom: spacing.lg,
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: spacing.lg, textAlign: 'center' },
  detailsCard: {
    width: '100%', backgroundColor: colors.white, borderRadius: radius.md,
    padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xl,
  },
  detailsTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  detailLabel: { fontSize: 13, color: colors.textMuted },
  detailValue: { fontSize: 13, fontWeight: '600', color: colors.text },
  primaryButton: {
    width: '100%', backgroundColor: colors.primary,
    paddingVertical: 16, borderRadius: radius.full,
    alignItems: 'center', marginBottom: spacing.md,
  },
  primaryButtonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  secondaryButton: {
    width: '100%', paddingVertical: 14, borderRadius: radius.full,
    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
  },
  secondaryButtonText: { color: colors.text, fontWeight: '600', fontSize: 15 },
});