import { useState, useEffect } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, Switch
} from 'react-native'

const MOCK_ORDERS = [
  {
    id: '1',
    from: 'المنارة، نابلس',
    to: 'رفيديا، نابلس',
    distance: '3.2 كم',
    price: '3.50',
    size: 'متوسط',
    vehicle: '🛵',
    customer: 'أحمد',
    time: 'الآن'
  },
  {
    id: '2',
    from: 'المخفية، نابلس',
    to: 'بيت وزن',
    distance: '6.5 كم',
    price: '5.00',
    size: 'كبير',
    vehicle: '🚗',
    customer: 'سارة',
    time: 'منذ دقيقة'
  },
]

export default function DriverHomeScreen({ navigation }) {
  const [isAvailable, setIsAvailable] = useState(false)
  const [orders, setOrders] = useState([])
  const [todayEarnings, setTodayEarnings] = useState('23.50')

  useEffect(() => {
    if (isAvailable) {
      setTimeout(() => setOrders(MOCK_ORDERS), 1500)
    } else {
      setOrders([])
    }
  }, [isAvailable])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>مرحباً محمد 👋</Text>
            <Text style={styles.agency}>مكتب السرعة للتوصيل</Text>
          </View>
          <TouchableOpacity
            style={styles.earningsBtn}
            onPress={() => navigation.navigate('DriverEarnings')}
          >
            <Text style={styles.earningsIcon}>💰</Text>
          </TouchableOpacity>
        </View>

        {/* Availability Toggle */}
        <View style={[
          styles.availabilityCard,
          isAvailable && styles.availabilityCardActive
        ]}>
          <View>
            <Text style={styles.availabilityTitle}>
              {isAvailable ? 'أنت متاح الآن ✅' : 'أنت غير متاح'}
            </Text>
            <Text style={styles.availabilitySub}>
              {isAvailable
                ? 'رح تصلك طلبات جديدة'
                : 'فعّل للبدء باستقبال الطلبات'}
            </Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: '#e0e0e0', true: '#93b8f8' }}
            thumbColor={isAvailable ? '#2563EB' : '#fff'}
          />
        </View>

        {/* Today Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{todayEarnings}₪</Text>
            <Text style={styles.statLabel}>أرباح اليوم</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>طلبات اليوم</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8⭐</Text>
            <Text style={styles.statLabel}>تقييمك</Text>
          </View>
        </View>

        {/* Orders */}
        <Text style={styles.sectionTitle}>
          {isAvailable
            ? orders.length > 0
              ? 'طلبات متاحة 🔥'
              : 'جاري البحث عن طلبات...'
            : 'فعّل التوفر لتبدأ'}
        </Text>

        {isAvailable && orders.length === 0 && (
          <View style={styles.searchingContainer}>
            <Text style={styles.searchingIcon}>🔍</Text>
            <Text style={styles.searchingText}>نبحث عن طلبات قريبة منك...</Text>
          </View>
        )}

        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderRequest', { order })}
          >
            {/* Order Header */}
            <View style={styles.orderHeader}>
              <View style={styles.orderVehicleBox}>
                <Text style={styles.orderVehicle}>{order.vehicle}</Text>
              </View>
              <View style={styles.orderMeta}>
                <Text style={styles.orderTime}>{order.time}</Text>
                <Text style={styles.orderDistance}>{order.distance}</Text>
              </View>
              <Text style={styles.orderPrice}>{order.price}₪</Text>
            </View>

            {/* Route */}
            <View style={styles.orderRoute}>
              <View style={styles.routeRow}>
                <Text style={styles.routeDot}>🟢</Text>
                <Text style={styles.routeText}>{order.from}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeRow}>
                <Text style={styles.routeDot}>🔴</Text>
                <Text style={styles.routeText}>{order.to}</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.orderFooter}>
              <Text style={styles.orderSize}>📦 {order.size}</Text>
              <Text style={styles.orderCustomer}>👤 {order.customer}</Text>
              <View style={styles.acceptBtn}>
                <Text style={styles.acceptBtnText}>عرض التفاصيل ›</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    paddingHorizontal: 20, paddingVertical: 16
  },
  greeting: { fontSize: 20, fontWeight: '700', color: '#1a1a1a' },
  agency: { fontSize: 13, color: '#888', marginTop: 2 },
  earningsBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#f0f4ff', justifyContent: 'center', alignItems: 'center'
  },
  earningsIcon: { fontSize: 20 },

  // Availability
  availabilityCard: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', backgroundColor: '#fff',
    margin: 20, borderRadius: 16, padding: 18,
    borderWidth: 1.5, borderColor: '#e0e0e0'
  },
  availabilityCardActive: {
    borderColor: '#2563EB', backgroundColor: '#f0f4ff'
  },
  availabilityTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  availabilitySub: { fontSize: 12, color: '#888', marginTop: 4 },

  // Stats
  statsRow: {
    flexDirection: 'row', paddingHorizontal: 20,
    gap: 10, marginBottom: 20
  },
  statCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12,
    padding: 14, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  statValue: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 4 },

  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#1a1a1a',
    marginHorizontal: 20, marginBottom: 12
  },

  // Searching
  searchingContainer: {
    alignItems: 'center', padding: 40
  },
  searchingIcon: { fontSize: 48, marginBottom: 12 },
  searchingText: { fontSize: 15, color: '#888' },

  // Order Card
  orderCard: {
    backgroundColor: '#fff', marginHorizontal: 20,
    borderRadius: 16, padding: 16, marginBottom: 12,
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  orderHeader: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 14, gap: 10
  },
  orderVehicleBox: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: '#f0f4ff', justifyContent: 'center', alignItems: 'center'
  },
  orderVehicle: { fontSize: 24 },
  orderMeta: { flex: 1 },
  orderTime: { fontSize: 12, color: '#888' },
  orderDistance: { fontSize: 13, fontWeight: '600', color: '#555' },
  orderPrice: { fontSize: 20, fontWeight: '700', color: '#2563EB' },

  // Route
  orderRoute: {
    backgroundColor: '#f8f9fa', borderRadius: 10,
    padding: 12, marginBottom: 12
  },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  routeDot: { fontSize: 10 },
  routeText: { fontSize: 14, color: '#333' },
  routeLine: {
    width: 1, height: 12, backgroundColor: '#ddd',
    marginLeft: 9, marginVertical: 2
  },

  // Footer
  orderFooter: {
    flexDirection: 'row', alignItems: 'center', gap: 10
  },
  orderSize: { fontSize: 12, color: '#666' },
  orderCustomer: { fontSize: 12, color: '#666', flex: 1 },
  acceptBtn: {
    backgroundColor: '#2563EB', borderRadius: 8,
    paddingVertical: 6, paddingHorizontal: 12
  },
  acceptBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
})