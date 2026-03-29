import { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView
} from 'react-native'

const DELIVERY_STEPS = [
  { key: 'heading', label: 'في الطريق لاستلام الطلب', btn: 'وصلت لمكان الاستلام', icon: '🛵' },
  { key: 'picked', label: 'تم استلام الطلب', btn: 'تم التوصيل للزبون', icon: '📦' },
  { key: 'delivered', label: 'تم التوصيل بنجاح!', btn: null, icon: '🎉' },
]

export default function DeliveryScreen({ navigation, route }) {
  const { order } = route.params
  const [step, setStep] = useState(0)

  const current = DELIVERY_STEPS[step]
  const isDone = step === 2

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Status */}
        <View style={[styles.statusCard, isDone && styles.statusCardDone]}>
          <Text style={styles.statusIcon}>{current.icon}</Text>
          <Text style={styles.statusText}>{current.label}</Text>
        </View>

        {/* Order Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🟢 الاستلام</Text>
            <Text style={styles.infoValue}>{order.from}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🔴 التسليم</Text>
            <Text style={styles.infoValue}>{order.to}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💰 الأجر</Text>
            <Text style={[styles.infoValue, styles.infoPrice]}>
              {order.price}₪
            </Text>
          </View>
        </View>

        {/* Customer Contact */}
        <TouchableOpacity style={styles.contactBtn}>
          <Text style={styles.contactIcon}>📞</Text>
          <Text style={styles.contactText}>التواصل مع الزبون</Text>
        </TouchableOpacity>

        {/* Action Button */}
        {!isDone && (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setStep(s => s + 1)}
          >
            <Text style={styles.actionBtnText}>{current.btn} ✓</Text>
          </TouchableOpacity>
        )}

        {/* Done */}
        {isDone && (
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => navigation.replace('DriverHome')}
          >
            <Text style={styles.doneBtnText}>العودة لاستقبال طلبات جديدة 🚀</Text>
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1, padding: 24 },

  statusCard: {
    backgroundColor: '#2563EB', borderRadius: 16,
    padding: 28, alignItems: 'center', marginBottom: 20
  },
  statusCardDone: { backgroundColor: '#22c55e' },
  statusIcon: { fontSize: 52, marginBottom: 12 },
  statusText: {
    fontSize: 18, fontWeight: '700',
    color: '#fff', textAlign: 'center'
  },

  infoCard: {
    backgroundColor: '#fff', borderRadius: 16,
    padding: 16, marginBottom: 16,
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 10
  },
  infoLabel: { fontSize: 14, color: '#888' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  infoPrice: { color: '#2563EB', fontSize: 16 },
  infoDivider: { height: 1, backgroundColor: '#f0f0f0' },

  contactBtn: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    borderWidth: 1.5, borderColor: '#e0e0e0',
    borderRadius: 12, height: 50, marginBottom: 16
  },
  contactIcon: { fontSize: 20 },
  contactText: { fontSize: 15, color: '#555', fontWeight: '600' },

  actionBtn: {
    backgroundColor: '#2563EB', borderRadius: 12,
    height: 56, justifyContent: 'center',
    alignItems: 'center', marginBottom: 12
  },
  actionBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  doneBtn: {
    backgroundColor: '#22c55e', borderRadius: 12,
    height: 56, justifyContent: 'center', alignItems: 'center'
  },
  doneBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
})