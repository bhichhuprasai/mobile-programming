import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/colors';

export default function HostelCard({ hostel, onPress }) {
  const [saved, setSaved] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: hostel.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.heart}
          onPress={(e) => {
            e.stopPropagation?.();
            setSaved((s) => !s);
          }}
        >
          <Ionicons
            name={saved ? 'heart' : 'heart-outline'}
            size={18}
            color={saved ? colors.danger : colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{hostel.name}</Text>
        <Text style={styles.location}>{hostel.location}</Text>

        <View style={styles.row}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={colors.star} />
            <Text style={styles.ratingText}>
              {hostel.rating} ({hostel.reviews} reviews)
            </Text>
          </View>
        </View>

        <Text style={styles.price}>
          NPR {hostel.price.toLocaleString()} <Text style={styles.perMonth}>/ month</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  imageWrapper: {
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: radius.full,
    padding: 6,
  },
  info: {
    padding: spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  location: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: 4,
  },
  price: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  perMonth: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
  },
});
