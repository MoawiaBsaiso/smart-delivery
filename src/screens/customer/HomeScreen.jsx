import { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView
} from 'react-native'

const recentOrders = [
  {
    id: '1',
    from: 'المنارة',
    to: 'رفيديا',
    status: 'تم التوصيل',
    price: '3.5',
    vehicle: '🛵',
    date: 'أمس'
  },
  {
    id: '2',
    from: 'المخفية',
    to: 'بيت وزن',
    status: 'تم التوصيل',
    price: '5.0',
    vehicle: '🚗',
    date: 'منذ يومين'
  },
]

export default function CustomerHomeScreen({ navigation }) {
  const [userName] = useState('أحمد')

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>مرحباً {userName} 👋</Text>
            <Text style={styles.subGreeting}>وين بدك توصل اليوم؟</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Location Bar */}
        <TouchableOpacity style={styles.locationBar}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>موقعك الحالي</Text>
          <Text style={styles.locationArrow}>›</Text>
        </TouchableOpacity>

        {/* Order Button */}
        <TouchableOpacity
          style={styles.orderBtn}
          onPress={() => navigation.navigate('NewOrder')}
        >
          <Text style={styles.orderBtnIcon}>📦</Text>
          <View>
            <Text style={styles.orderBtnTitle}>اطلب توصيل</Text>
            <Text style={styles.orderBtnSub}>سريع، آمن، وبأفضل سعر</Text>
          </View>
          <Text style={styles.orderBtnArrow}>›</Text>
        </TouchableOpacity>

        {/* Vehicle Types */}
        <Text style={styles.sectionTitle}>وسائل التوصيل المتاحة</Text>
        <View style={styles.vehicleRow}>
          {[
            { icon: '🚲', label: 'دراجة', price: 'من 1₪' },
            { icon: '🛵', label: 'موتو', price: 'من 2₪' },
            { icon: '🚗', label: 'سيارة', price: 'من 4₪' },
            { icon: '🚐', label: 'بيك أب', price: 'من 6₪' },
          ].map((v) => (
            <View key={v.label} style={styles.vehicleCard}>
              <Text style={styles.vehicleIcon}>{v.icon}</Text>
              <Text style={styles.vehicleLabel}>{v.label}</Text>
              <Text style={styles.vehiclePrice}>{v.price}</Text>
            </View>
          ))}
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>آخر طلباتك</Text>
        {recentOrders.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            <View style={styles.orderCardRight}>
              <Text style={styles.orderVehicle}>{order.vehicle}</Text>
            </View>
            <View style={styles.orderCardMiddle}>
              <Text style={styles.orderRoute}>
                {order.from} → {order.to}
              </Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View style={styles.orderCardLeft}>
              <Text style={styles.orderPrice}>{order.price}₪</Text>
              <Text style={styles.orderStatus}>{order.status}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { icon: '🏠', label: 'الرئيسية', active: true },
          { icon: '📦', label: 'طلباتي', active: false },
          { icon: '👤', label: 'حسابي', active: false },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.navItem}>
            <Text style={styles.navIcon}>{item.icon}</Text>
            <Text style={[
              styles.navLabel,
              item.active && styles.navLabelActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20,
    paddingTop: 40, paddingBottom: 16, backgroundColor: '#fff'
  },
  greeting: { fontSize: 22, fontWeight: '700', color: '#1a1a1a' },
  subGreeting: { fontSize: 14, color: '#888', marginTop: 2 },
  notifBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#f0f4ff', justifyContent: 'center', alignItems: 'center'
  },
  notifIcon: { fontSize: 18 },

  // Location
  locationBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 20,
    marginBottom: 16, padding: 14, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  locationIcon: { fontSize: 16, marginRight: 8 },
  locationText: { flex: 1, fontSize: 15, color: '#555' },
  locationArrow: { fontSize: 20, color: '#aaa' },

  // Order Button
  orderBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#2563EB', marginHorizontal: 20,
    borderRadius: 16, padding: 18, marginBottom: 24,
    gap: 12
  },
  orderBtnIcon: { fontSize: 28 },
  orderBtnTitle: {
    fontSize: 17, fontWeight: '700', color: '#fff'
  },
  orderBtnSub: { fontSize: 12, color: '#93b8f8', marginTop: 2 },
  orderBtnArrow: { fontSize: 24, color: '#fff', marginLeft: 'auto' },

  // Vehicles
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#1a1a1a',
    marginHorizontal: 20, marginBottom: 12
  },
  vehicleRow: {
    flexDirection: 'row', paddingHorizontal: 20,
    gap: 10, marginBottom: 24
  },
  vehicleCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12,
    padding: 12, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  vehicleIcon: { fontSize: 24, marginBottom: 4 },
  vehicleLabel: { fontSize: 12, fontWeight: '600', color: '#333' },
  vehiclePrice: { fontSize: 11, color: '#2563EB', marginTop: 2 },

  // Recent Orders
  orderCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 20,
    borderRadius: 12, padding: 14, marginBottom: 10,
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  orderCardRight: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#f0f4ff', justifyContent: 'center',
    alignItems: 'center', marginRight: 12
  },
  orderVehicle: { fontSize: 22 },
  orderCardMiddle: { flex: 1 },
  orderRoute: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  orderDate: { fontSize: 12, color: '#999', marginTop: 2 },
  orderCardLeft: { alignItems: 'flex-end' },
  orderPrice: { fontSize: 15, fontWeight: '700', color: '#2563EB' },
  orderStatus: { fontSize: 11, color: '#22c55e', marginTop: 2 },

  // Bottom Nav
  bottomSpace: { height: 20 },
  bottomNav: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#e8e8e8',
    paddingVertical: 10, paddingHorizontal: 20,marginBottom: 20
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 11, color: '#999', marginTop: 2 },
  navLabelActive: { color: '#2563EB', fontWeight: '600' },
})