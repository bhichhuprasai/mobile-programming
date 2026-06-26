import React from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/colors';
import BottomNavBar from '../components/BottomNavBar';

export default function HostelDetailScreen({ route, navigation }) {
  const { hostel } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hostel Detail</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: hostel.image }} style={styles.image} />

        <Text style={styles.name}>{hostel.name}</Text>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={styles.location}> {hostel.location}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="star" size={14} color={colors.star} />
          <Text style={styles.rating}> {hostel.rating} ({hostel.reviews} reviews)</Text>
        </View>

        <Text style={styles.price}>NPR {hostel.price.toLocaleString()} / month</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{hostel.description}</Text>

        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilitiesRow}>
          {hostel.facilities.map((f) => (
            <View key={f} style={styles.facilityBadge}>
              <Text style={styles.facilityText}>{f}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookingDetails', { hostel })}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar active="Home" />
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
  image: { width: '100%', height: 200, borderRadius: radius.md, marginBottom: spacing.md },
  name: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  location: { fontSize: 13, color: colors.textMuted },
  rating: { fontSize: 13, color: colors.textMuted },
  price: { fontSize: 16, fontWeight: '700', color: colors.primary, marginTop: spacing.sm },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  description: { fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  facilitiesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  facilityBadge: {
    backgroundColor: '#EFEDFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  facilityText: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radius.full,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  bookButtonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});