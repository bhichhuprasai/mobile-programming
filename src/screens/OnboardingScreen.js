import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/colors';

export default function OnboardingScreen({ navigation }) {
  const [step] = useState(1); // for the dots indicator (0,1,2)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="location" size={28} color={colors.accent} style={styles.pin} />
          <Ionicons name="home" size={48} color={colors.white} />
        </View>

        <Text style={styles.title}>HostelFinder</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Nepal</Text>
        </View>

        <Text style={styles.tagline}>
          Find your perfect hostel{'\n'}anywhere in Nepal
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.dotsRow}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === step ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  pin: {
    position: 'absolute',
    top: -18,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.white,
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginTop: 8,
  },
  badgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  tagline: {
    color: colors.white,
    textAlign: 'center',
    marginTop: spacing.lg,
    fontSize: 15,
    opacity: 0.9,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: colors.accent,
    width: '100%',
    paddingVertical: 16,
    borderRadius: radius.full,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  getStartedText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: colors.white,
    width: 20,
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
