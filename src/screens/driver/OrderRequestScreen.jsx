import { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ActivityIndicator
} from 'react-native'

export default function OrderRequestScreen({ navigation, route }) {
  const { order } = route.params
  const [loading, setLoading] = useState(null)

  const handleAccept = () => {
    setLoading('accept')
    setTimeout(() => {
      setLoading(null)
      navigation.replace('DriverDelivery', { order })
    }, 1000)
  }

  const handleReject = () => {
    setLoading('reject')
    setTimeout(() => {
      setLoading(null)
      navigation.goBack()
    }, 500)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <Text style={styles.title}>طلب جديد! 🔔</Text>
        <Text style={styles.subtitle}>هل تقبل هاد الطلب؟</Text>

        {/* Price Highlight */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>ستكسب</Text>
          <Text style={styles.priceValue}>{order.price} ₪</Text>
          <Text style={styles.priceSub}>{order.distance}</Text>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🟢</Text>
            <View>
              <Text style={styles.detailLabel}>الاستلام من</Text>
              <Text style={styles.detailValue}>{order.from}</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🔴</Text>
            <View>
              <Text style={styles.detailLabel}>التسليم إلى</Text>
              <Text style={styles.detailValue}>{order.to}</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📦</Text>
            <View>
              <Text style={styles.detailLabel}>حجم الطلب</Text>
              <Text style={styles.detailValue}>{order.size}</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>👤</Text>
            <View>
              <Text style={styles.detailLabel}>الزبون</Text>
              <Text style={styles.detailValue}>{order.customer}</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnsRow}>
          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={handleReject}
            disabled={!!loading}
          >
            {loading === 'reject'
              ? <ActivityIndicator color="#e53935" />
              : <Text style={styles.rejectBtnText}>رفض ✕</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={handleAccept}
            disabled={!!loading}
          >
            {loading === 'accept'
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.acceptBtnText}>قبول ✓</Text>
            }
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1, padding: 24 },

  title: {
    fontSize: 28, fontWeight: '700',
    color: '#1a1a1a', textAlign: 'center', marginBottom: 6
  },
  subtitle: {
    fontSize: 15, color: '#888',
    textAlign: 'center', marginBottom: 24
  },

  priceCard: {
    backgroundColor: '#2563EB', borderRadius: 16,
    padding: 24, alignItems: 'center', marginBottom: 20
  },
  priceLabel: { fontSize: 14, color: '#93b8f8' },
  priceValue: {
    fontSize: 48, fontWeight: '700',
    color: '#fff', marginVertical: 4
  },
  priceSub: { fontSize: 13, color: '#93b8f8' },

  detailsCard: {
    backgroundColor: '#fff', borderRadius: 16,
    padding: 16, marginBottom: 28,
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  detailRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, paddingVertical: 10
  },
  detailIcon: { fontSize: 20 },
  detailLabel: { fontSize: 12, color: '#888' },
  detailValue: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  detailDivider: { height: 1, backgroundColor: '#f0f0f0' },

  btnsRow: { flexDirection: 'row', gap: 12 },
  rejectBtn: {
    flex: 1, height: 56, borderRadius: 12,
    borderWidth: 2, borderColor: '#e53935',
    justifyContent: 'center', alignItems: 'center'
  },
  rejectBtnText: { color: '#e53935', fontSize: 17, fontWeight: '700' },
  acceptBtn: {
    flex: 2, height: 56, borderRadius: 12,
    backgroundColor: '#22c55e',
    justifyContent: 'center', alignItems: 'center'
  },
  acceptBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
})