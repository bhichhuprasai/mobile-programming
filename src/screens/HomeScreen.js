import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/colors';
import { hostels, categories } from '../data/hostels';
import HostelCard from '../components/HostelCard';
import BottomNavBar from '../components/BottomNavBar';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredHostels = useMemo(() => {
    return hostels.filter((h) => {
      const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory
        ? h.category.toLowerCase() === activeCategory.toLowerCase()
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color={colors.white} />
        <Text style={styles.headerTitle}>HostelFinder</Text>
        <Ionicons name="notifications-outline" size={22} color={colors.white} />
      </View>

      <FlatList
        data={filteredHostels}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search hostels..."
                placeholderTextColor={colors.textMuted}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoryRow}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.label;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={styles.categoryItem}
                    onPress={() =>
                      setActiveCategory(isActive ? null : cat.label)
                    }
                  >
                    <View
                      style={[
                        styles.categoryIconWrap,
                        isActive && { backgroundColor: colors.primary },
                      ]}
                    >
                      <Ionicons
                        name={cat.icon}
                        size={20}
                        color={isActive ? colors.white : colors.primary}
                      />
                    </View>
                    <Text style={styles.categoryLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Recommended Hostel</Text>
          </>
        }
        renderItem={({ item }) => (
          <HostelCard
            hostel={item}
            onPress={() => navigation.navigate('HostelDetail', { hostel: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hostels match your search.</Text>
        }
      />

      <BottomNavBar active="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: '#EFEDFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: spacing.xl,
  },
});
