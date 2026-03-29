import {
  View, Text, StyleSheet,
  ScrollView, SafeAreaView, TouchableOpacity
} from 'react-native'

const MOCK_TRANSACTIONS = [
  { id: '1', from: 'المنارة', to: 'رفيديا', price: '3.50', vehicle: '🛵', date: 'اليوم 14:30' },
  { id: '2', from: 'المخفية', to: 'بيت وزن', price: '5.00', vehicle: '🚗', date: 'اليوم 11:00' },
  { id: '3', from: 'رفيديا', to: 'المنارة', price: '3.50', vehicle: '🛵', date: 'أمس 16:20' },
  { id: '4', from: 'نابلس', to: 'حوارة', price: '7.00', vehicle: '🚗', date: 'أمس 09:15' },
  { id: '5', from: 'بيت وزن', to: 'نابلس', price: '4.50', vehicle: '🛵', date: 'الأحد 13:00' },
]

export default function EarningsScreen({ navigation }) {
  const todayTotal = '8.50'
  const weekTotal = '23.50'
  const monthTotal = '187.00'

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>→ رجوع</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>أرباحي 💰</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.mainStat}>
            <Text style={styles.mainStatLabel}>هذا الشهر</Text>
            <Text style={styles.mainStatValue}>{monthTotal} ₪</Text>
          </View>
          <View style={styles.subStats}>
            <View style={styles.subStat}>
              <Text style={styles.subStatValue}>{todayTotal}₪</Text>
              <Text style={styles.subStatLabel}>اليوم</Text>
            </View>
            <View style={styles.subStatDivider} />
            <View style={styles.subStat}>
              <Text style={styles.subStatValue}>{weekTotal}₪</Text>
              <Text style={styles.subStatLabel}>هذا الأسبوع</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          {[
            { label: 'طلبات اليوم', value: '2' },
            { label: 'طلبات الأسبوع', value: '7' },
            { label: 'تقييمك', value: '4.8 ⭐' },
          ].map((s) => (
            <View key={s.label} style={styles.quickStat}>
              <Text style={styles.quickStatValue}>{s.value}</Text>
              <Text style={styles.quickStatLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Transactions */}
        <Text style={styles.sectionTitle}>سجل الطلبات</Text>
        {MOCK_TRANSACTIONS.map((t) => (
          <View key={t.id} style={styles.transactionCard}>
            <View style={styles.transactionRight}>
              <Text style={styles.transactionVehicle}>{t.vehicle}</Text>
            </View>
            <View style={styles.transactionMiddle}>
              <Text style={styles.transactionRoute}>
                {t.from} → {t.to}
              </Text>
              <Text style={styles.transactionDate}>{t.date}</Text>
            </View>
            <Text style={styles.transactionPrice}>+{t.price}₪</Text>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', backgroundColor: '#fff',
    paddingHorizontal: 20, paddingVertical: 14
  },
  back: { color: '#2563EB', fontSize: 16, width: 50 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },

  // Stats
  statsContainer: {
    backgroundColor: '#2563EB', margin: 20,
    borderRadius: 20, padding: 24
  },
  mainStat: { alignItems: 'center', marginBottom: 20 },
  mainStatLabel: { fontSize: 14, color: '#93b8f8' },
  mainStatValue: {
    fontSize: 44, fontWeight: '700',
    color: '#fff', marginTop: 4
  },
  subStats: {
    flexDirection: 'row', backgroundColor: '#1d4ed8',
    borderRadius: 12, padding: 16
  },
  subStat: { flex: 1, alignItems: 'center' },
  subStatValue: { fontSize: 20, fontWeight: '700', color: '#fff' },
  subStatLabel: { fontSize: 12, color: '#93b8f8', marginTop: 4 },
  subStatDivider: { width: 1, backgroundColor: '#2563EB' },

  // Quick Stats
  quickStats: {
    flexDirection: 'row', marginHorizontal: 20,
    gap: 10, marginBottom: 24
  },
  quickStat: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12,
    padding: 14, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  quickStatValue: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  quickStatLabel: { fontSize: 11, color: '#888', marginTop: 4 },

  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#1a1a1a',
    marginHorizontal: 20, marginBottom: 12
  },

  // Transactions
  transactionCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 20,
    borderRadius: 12, padding: 14, marginBottom: 10,
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  transactionRight: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#f0f4ff', justifyContent: 'center',
    alignItems: 'center', marginRight: 12
  },
  transactionVehicle: { fontSize: 22 },
  transactionMiddle: { flex: 1 },
  transactionRoute: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  transactionDate: { fontSize: 12, color: '#999', marginTop: 2 },
  transactionPrice: { fontSize: 16, fontWeight: '700', color: '#22c55e' },
})