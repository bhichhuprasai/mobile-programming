import { useState } from "react";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Palette ──────────────────────────────────────────────
const C = {
  bg: "#F5F3EE",
  card: "#FFFFFF",
  hero: "#E8EFE6",
  heroAccent: "#C8DBC4",
  mint: "#D4EAD1",
  mintText: "#3E7A4E",
  lavender: "#E5E0F0",
  lavenderText: "#5E4F8A",
  peach: "#FAE8DC",
  peachText: "#A0522D",
  sky: "#DDF0F5",
  skyText: "#1F7A99",
  primary: "#4A7C59",
  primaryLight: "#EAF2E8",
  text: "#2C2C2C",
  textMid: "#5A5A5A",
  textSoft: "#9A9A9A",
  divider: "#EDEBE6",
  badge: "#FDF6EC",
  badgeText: "#B07D3A",
  star: "#D4A843",
};

const CITIES = [
  { name: "Kathmandu", emoji: "🏙️", color: C.mint, textColor: C.mintText },
  { name: "Pokhara", emoji: "⛰️", color: C.sky, textColor: C.skyText },
  { name: "Chitwan", emoji: "🐘", color: C.peach, textColor: C.peachText },
  { name: "Butwal", emoji: "🌄", color: C.lavender, textColor: C.lavenderText },
  { name: "Lumbini", emoji: "🕌", color: C.mint, textColor: C.mintText },
  { name: "Biratnagar", emoji: "🎓", color: C.sky, textColor: C.skyText },
];

const HOSTELS = [
  {
    name: "Everest Student Home",
    city: "Kathmandu",
    rating: "4.8",
    tags: ["Study Room", "WiFi"],
    emoji: "🏠",
    tagStyle: { bg: C.mint, text: C.mintText },
    rooms: [
      { type: "1 Seater", monthly: "NPR 15,000", daily: "NPR 650" },
      { type: "2 Seater", monthly: "NPR 9,500", daily: "NPR 420" },
      { type: "3 Seater", monthly: "NPR 7,200", daily: "NPR 350" },
    ],
  },
  {
    name: "Himalayan Nest",
    city: "Pokhara",
    rating: "4.6",
    tags: ["Mess Included", "Laundry"],
    emoji: "🏡",
    tagStyle: { bg: C.sky, text: C.skyText },
    rooms: [
      { type: "1 Seater", monthly: "NPR 14,500", daily: "NPR 620" },
      { type: "2 Seater", monthly: "NPR 8,800", daily: "NPR 380" },
      { type: "4 Seater", monthly: "NPR 5,800", daily: "NPR 280" },
    ],
  },
  {
    name: "Scholar's Den",
    city: "Kathmandu",
    rating: "4.7",
    tags: ["Girls Only", "CCTV"],
    emoji: "🏘️",
    tagStyle: { bg: C.lavender, text: C.lavenderText },
    rooms: [
      { type: "1 Seater", monthly: "NPR 16,500", daily: "NPR 700" },
      { type: "2 Seater", monthly: "NPR 10,500", daily: "NPR 480" },
      { type: "3 Seater", monthly: "NPR 8,200", daily: "NPR 390" },
    ],
  },
];

const PERKS = [
  { emoji: "📚", title: "Study Spaces", desc: "Quiet rooms built for focus" },
  { emoji: "🍱", title: "Mess & Kitchen", desc: "Home-cooked meals available" },
  { emoji: "🔒", title: "Safe & Secure", desc: "CCTV, warden, safe entry" },
  { emoji: "📶", title: "Fast WiFi", desc: "High-speed for online classes" },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const handleCityPress = (cityName: string) => {
    if (activeCity === cityName) {
      // Deselect if tapping the same city
      setActiveCity(null);
      setSearchQuery("");
    } else {
      setActiveCity(cityName);
      setSearchQuery(cityName);
      Keyboard.dismiss();
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (activeCity && !text.toLowerCase().includes(activeCity.toLowerCase())) {
      setActiveCity(null);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveCity(null);
    Keyboard.dismiss();
  };

  const filteredHostels = HOSTELS.filter(
    (hostel) =>
      hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Nav */}
          <View style={styles.nav}>
            <View>
              <Text style={styles.navLogo}>🏠 HostelFinder</Text>
              <Text style={styles.navTagline}>For students, by students</Text>
            </View>
            <TouchableOpacity style={styles.navBtn} activeOpacity={0.7}>
              <Text style={styles.navBtnText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>🎓 Student Housing Nepal</Text>
            </View>
            <Text style={styles.heroTitle}>Your home away{"\n"}from home</Text>
            <Text style={styles.heroSubtitle}>
              Safe, affordable hostels with monthly plans — designed for
              students across Nepal.
            </Text>

            {/* Search Bar */}
            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <Text style={styles.searchEmoji}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="City, hostel or room type..."
                  placeholderTextColor={C.textSoft}
                  value={searchQuery}
                  onChangeText={handleSearchChange}
                  returnKeyType="search"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                {/* ✕ Clear button */}
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    onPress={handleClearSearch}
                    style={styles.clearBtn}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.clearBtnText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={styles.searchCta}
                activeOpacity={0.8}
                onPress={() => Keyboard.dismiss()}
              >
                <Text style={styles.searchCtaText}>Search</Text>
              </TouchableOpacity>
            </View>

            {/* Trust Pills */}
            <View style={styles.trustRow}>
              <View style={styles.trustPill}>
                <Text style={styles.trustText}>✅ Verified hostels</Text>
              </View>
              <View style={styles.trustPill}>
                <Text style={styles.trustText}>📋 Monthly plans</Text>
              </View>
              <View style={styles.trustPill}>
                <Text style={styles.trustText}>🆓 Free to browse</Text>
              </View>
            </View>
          </View>

          {/* Why Students Love Us */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why students choose us</Text>
            <View style={styles.perksGrid}>
              {PERKS.map((p) => (
                <View key={p.title} style={styles.perkCard}>
                  <Text style={styles.perkEmoji}>{p.emoji}</Text>
                  <Text style={styles.perkTitle}>{p.title}</Text>
                  <Text style={styles.perkDesc}>{p.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Cities — tappable to filter */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Browse by city</Text>
              {activeCity && (
                <TouchableOpacity onPress={handleClearSearch}>
                  <Text style={styles.seeAll}>Clear ✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.hScroll}
            >
              {CITIES.map((city) => {
                const isActive = activeCity === city.name;
                return (
                  <TouchableOpacity
                    key={city.name}
                    style={[
                      styles.cityChip,
                      { backgroundColor: city.color },
                      isActive && styles.cityChipActive,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleCityPress(city.name)}
                  >
                    <Text style={styles.cityChipEmoji}>{city.emoji}</Text>
                    <Text
                      style={[
                        styles.cityChipText,
                        { color: city.textColor },
                        isActive && { fontWeight: "900" },
                      ]}
                    >
                      {city.name}
                    </Text>
                    {isActive && (
                      <Text
                        style={[
                          styles.cityCheckmark,
                          { color: city.textColor },
                        ]}
                      >
                        ✓
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Featured / Filtered Hostels */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : "Featured Hostels"}
              </Text>
              {!searchQuery && (
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all →</Text>
                </TouchableOpacity>
              )}
            </View>

            {filteredHostels.length > 0 ? (
             
             filteredHostels.map((h) => (
                <TouchableOpacity
                  key={h.name}
                  style={styles.hostelCard}
                  activeOpacity={0.8}
                >
                  {/* Hostel Header */}
                  <View style={styles.hostelTop}>
                    <View style={styles.hostelEmojiBox}>
                      <Text style={styles.hostelEmoji}>{h.emoji}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.hostelName}>{h.name}</Text>
                      <Text style={styles.hostelCity}>📍 {h.city}</Text>
                      <View style={styles.hostelTagRow}>
                        {h.tags.map((tag) => (
                          <View
                            key={tag}
                            style={[
                              styles.hostelTag,
                              { backgroundColor: h.tagStyle.bg },
                            ]}
                          >
                            <Text
                              style={[
                                styles.hostelTagText,
                                { color: h.tagStyle.text },
                              ]}
                            >
                              {tag}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <View style={styles.starBadge}>
                      <Text style={styles.starText}>⭐ {h.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.hostelDivider} />

                  {/* Room Pricing */}
                  <Text style={styles.roomTypesTitle}>
                    Available Room Types
                  </Text>
                  {h.rooms.map((room, index) => (
                    <View
                      key={index}
                      style={[
                        styles.roomRow,
                        index === h.rooms.length - 1 && {
                          borderBottomWidth: 0,
                        },
                      ]}
                    >
                      <View style={styles.roomLabelBox}>
                        <Text style={styles.roomType}>{room.type}</Text>
                      </View>
                      <View style={styles.priceGroup}>
                        <Text style={styles.priceMain}>{room.monthly}</Text>
                        <Text style={styles.priceDaily}>
                          or {room.daily}/day
                        </Text>
                      </View>
                    </View>
                  ))}

                  <TouchableOpacity style={styles.viewBtn} activeOpacity={0.7}>
                    <Text style={styles.viewBtnText}>View Details →</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🔍</Text>
                <Text style={styles.emptyTitle}>No hostels found</Text>
                <Text style={styles.emptySubtitle}>
                  Try a different city or room type
                </Text>
                <TouchableOpacity
                  style={styles.emptyClearBtn}
                  onPress={handleClearSearch}
                >
                  <Text style={styles.emptyClearText}>Clear search</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Monthly Plan Banner */}
          <View style={styles.planBanner}>
            <Text style={styles.planEmoji}>🗓️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.planTitle}>Monthly plans save more</Text>
              <Text style={styles.planSubtitle}>
                Lock in a lower rate — no daily surprises, just simple monthly
                pricing.
              </Text>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.ctaCard} activeOpacity={0.8}>
            <Text style={styles.ctaEmoji}>🏫</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>Own a hostel?</Text>
              <Text style={styles.ctaSub}>
                List it free and reach students near you
              </Text>
            </View>
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>

          <View style={{ height: 60 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Nav
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 8,
  },
  navLogo: { fontSize: 17, fontWeight: "800", color: C.text },
  navTagline: { fontSize: 11, color: C.textSoft, marginTop: 2 },
  navBtn: {
    borderWidth: 1.5,
    borderColor: C.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  navBtnText: { color: C.primary, fontWeight: "700", fontSize: 13 },

  // Hero
  hero: {
    backgroundColor: C.hero,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 22,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: C.heroAccent,
  },
  heroPill: {
    backgroundColor: C.card,
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.heroAccent,
  },
  heroPillText: { fontSize: 12, color: C.primary, fontWeight: "600" },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: C.text,
    lineHeight: 40,
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 14,
    color: C.textMid,
    lineHeight: 21,
    marginBottom: 20,
  },

  // Search
  searchRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  searchBox: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: C.heroAccent,
  },
  searchEmoji: { fontSize: 15 },
  searchInput: { flex: 1, fontSize: 14, color: C.text },
  clearBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.textSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  clearBtnText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  searchCta: {
    backgroundColor: C.primary,
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  searchCtaText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  // Trust
  trustRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  trustPill: {
    backgroundColor: C.card,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: C.heroAccent,
  },
  trustText: { fontSize: 11, color: C.textMid, fontWeight: "500" },

  // Sections
  section: { paddingHorizontal: 16, paddingTop: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: C.text,
    marginBottom: 14,
  },
  seeAll: {
    color: C.primary,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 14,
  },

  // Perks
  perksGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  perkCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 14,
    width: "47.5%",
    borderWidth: 1,
    borderColor: C.divider,
  },
  perkEmoji: { fontSize: 26, marginBottom: 8 },
  perkTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: C.text,
    marginBottom: 3,
  },
  perkDesc: { fontSize: 12, color: C.textSoft, lineHeight: 17 },

  // Cities
  hScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  cityChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
    gap: 6,
  },
  cityChipActive: {
    borderWidth: 1.5,
    borderColor: C.primary,
  },
  cityChipEmoji: { fontSize: 16 },
  cityChipText: { fontSize: 13, fontWeight: "700" },
  cityCheckmark: { fontSize: 13, fontWeight: "800" },

  // Hostel cards
  hostelCard: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.divider,
  },
  hostelTop: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  hostelEmojiBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: C.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  hostelEmoji: { fontSize: 26 },
  hostelName: {
    fontSize: 15,
    fontWeight: "700",
    color: C.text,
    marginBottom: 3,
  },
  hostelCity: { fontSize: 12, color: C.textSoft, marginBottom: 6 },
  hostelTagRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  hostelTag: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  hostelTagText: { fontSize: 11, fontWeight: "600" },
  starBadge: {
    backgroundColor: C.badge,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  starText: { fontSize: 12, fontWeight: "700", color: C.star },
  hostelDivider: { height: 1, backgroundColor: C.divider, marginVertical: 12 },

  // Room types
  roomTypesTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: C.textMid,
    marginBottom: 6,
  },
  roomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  roomLabelBox: {
    backgroundColor: C.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roomType: { fontSize: 13, fontWeight: "600", color: C.primary },
  priceGroup: { alignItems: "flex-end" },
  priceMain: { fontSize: 16, fontWeight: "800", color: C.primary },
  priceDaily: { fontSize: 11, color: C.textSoft, marginTop: 1 },
  viewBtn: {
    marginTop: 12,
    backgroundColor: C.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  viewBtnText: { color: C.primary, fontWeight: "700", fontSize: 13 },

  // Empty state
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.divider,
  },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: C.text,
    marginBottom: 6,
  },
  emptySubtitle: { fontSize: 13, color: C.textSoft, marginBottom: 16 },
  emptyClearBtn: {
    backgroundColor: C.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
  emptyClearText: { color: C.primary, fontWeight: "700", fontSize: 13 },

  // Banners
  planBanner: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: C.mint,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: C.heroAccent,
  },
  planEmoji: { fontSize: 32 },
  planTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: C.mintText,
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 13,
    color: C.mintText,
    lineHeight: 18,
    opacity: 0.8,
  },

  ctaCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: C.lavender,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#CEC8E8",
  },
  ctaEmoji: { fontSize: 28 },
  ctaTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: C.lavenderText,
    marginBottom: 3,
  },
  ctaSub: { fontSize: 12, color: C.lavenderText, opacity: 0.8 },
  ctaArrow: { fontSize: 22, color: C.lavenderText, marginLeft: "auto" },
});
