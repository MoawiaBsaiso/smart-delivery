import { useState, useEffect } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Animated
} from 'react-native'

const STEPS = [
  { key: 'searching', label: 'جاري البحث عن سائق', icon: '🔍' },
  { key: 'accepted', label: 'تم قبول طلبك', icon: '✅' },
  { key: 'heading', label: 'السائق في الطريق إليك', icon: '🛵' },
  { key: 'picked', label: 'تم استلام الطلب', icon: '📦' },
  { key: 'delivered', label: 'تم التوصيل', icon: '🎉' },
]

const MOCK_DRIVER = {
  name: 'محمد أبو علي',
  agency: 'مكتب السرعة للتوصيل',
  vehicle: '🛵',
  plate: 'ب - 1234',
  rating: '4.8',
  phone: '0599111222'
}

export default function OrderTrackingScreen({ navigation, route }) {
  const { from, to, vehicle, price } = route.params
  const [currentStep, setCurrentStep] = useState(0)
  const [driver, setDriver] = useState(null)
  const pulse = new Animated.Value(1)

  // محاكاة تقدم الطلب
  useEffect(() => {
    const timers = []

    timers.push(setTimeout(() => {
      setDriver(MOCK_DRIVER)
      setCurrentStep(1)
    }, 2000))

    timers.push(setTimeout(() => setCurrentStep(2), 5000))
    timers.push(setTimeout(() => setCurrentStep(3), 9000))
    timers.push(setTimeout(() => setCurrentStep(4), 13000))

    return () => timers.forEach(clearTimeout)
  }, [])

  // أنيميشن النبض للخطوة الحالية
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15, duration: 600, useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 1, duration: 600, useNativeDriver: true
        }),
      ])
    ).start()
  }, [currentStep])

  const isDone = currentStep === 4

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>تتبع طلبك</Text>
        <Text style={styles.headerSub}>{from} → {to}</Text>
      </View>

      {/* Status Card */}
      <View style={styles.statusCard}>
        <Animated.Text
          style={[styles.statusIcon, { transform: [{ scale: pulse }] }]}
        >
          {STEPS[currentStep].icon}
        </Animated.Text>
        <Text style={styles.statusText}>{STEPS[currentStep].label}</Text>
        {!isDone && (
          <Text style={styles.statusSub}>يرجى الانتظار...</Text>
        )}
      </View>

      {/* Progress Steps */}
      <View style={styles.stepsContainer}>
        {STEPS.map((step, index) => (
          <View key={step.key} style={styles.stepRow}>
            <View style={styles.stepLeft}>
              <View style={[
                styles.stepDot,
                index <= currentStep && styles.stepDotActive,
                index === currentStep && styles.stepDotCurrent
              ]} />
              {index < STEPS.length - 1 && (
                <View style={[
                  styles.stepLine,
                  index < currentStep && styles.stepLineActive
                ]} />
              )}
            </View>
            <Text style={[
              styles.stepLabel,
              index <= currentStep && styles.stepLabelActive,
              index === currentStep && styles.stepLabelCurrent
            ]}>
              {step.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Driver Card */}
      {driver && !isDone && (
        <View style={styles.driverCard}>
          <View style={styles.driverRight}>
            <Text style={styles.driverVehicle}>{driver.vehicle}</Text>
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.driverAgency}>{driver.agency}</Text>
            <View style={styles.driverMeta}>
              <Text style={styles.driverRating}>⭐ {driver.rating}</Text>
              <Text style={styles.driverPlate}>{driver.plate}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={styles.callIcon}>📞</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Price */}
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>السعر الإجمالي</Text>
        <Text style={styles.priceValue}>{price} ₪</Text>
      </View>

      {/* Done Button */}
      {isDone && (
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => navigation.navigate('Rating', {
            driver, price, from, to
          })}
        >
          <Text style={styles.doneBtnText}>تقييم الخدمة ⭐</Text>
        </TouchableOpacity>
      )}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },

  header: {
    backgroundColor: '#fff', padding: 20,
    borderBottomWidth: 1, borderBottomColor: '#e8e8e8'
  },
  headerTitle: {
    fontSize: 20, fontWeight: '700', color: '#1a1a1a'
  },
  headerSub: { fontSize: 13, color: '#888', marginTop: 2 },

  // Status
  statusCard: {
    backgroundColor: '#2563EB', margin: 20,
    borderRadius: 16, padding: 24, alignItems: 'center'
  },
  statusIcon: { fontSize: 48, marginBottom: 12 },
  statusText: {
    fontSize: 18, fontWeight: '700',
    color: '#fff', textAlign: 'center'
  },
  statusSub: { fontSize: 13, color: '#93b8f8', marginTop: 4 },

  // Steps
  stepsContainer: {
    backgroundColor: '#fff', marginHorizontal: 20,
    borderRadius: 16, padding: 20, marginBottom: 16
  },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', minHeight: 44 },
  stepLeft: { alignItems: 'center', marginRight: 14, width: 16 },
  stepDot: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#e0e0e0', marginTop: 2
  },
  stepDotActive: { backgroundColor: '#2563EB' },
  stepDotCurrent: {
    backgroundColor: '#2563EB',
    width: 16, height: 16, borderRadius: 8
  },
  stepLine: { width: 2, flex: 1, backgroundColor: '#e0e0e0', minHeight: 28 },
  stepLineActive: { backgroundColor: '#2563EB' },
  stepLabel: { fontSize: 14, color: '#aaa', paddingVertical: 2 },
  stepLabelActive: { color: '#555' },
  stepLabelCurrent: { color: '#2563EB', fontWeight: '700' },

  // Driver
  driverCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 20,
    borderRadius: 16, padding: 16, marginBottom: 16,
    borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  driverRight: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#f0f4ff', justifyContent: 'center',
    alignItems: 'center', marginRight: 12
  },
  driverVehicle: { fontSize: 26 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  driverAgency: { fontSize: 12, color: '#888', marginTop: 2 },
  driverMeta: { flexDirection: 'row', gap: 10, marginTop: 4 },
  driverRating: { fontSize: 12, color: '#f59e0b' },
  driverPlate: { fontSize: 12, color: '#666' },
  callBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#f0f4ff', justifyContent: 'center', alignItems: 'center'
  },
  callIcon: { fontSize: 20 },

  // Price
  priceRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 20, borderRadius: 12,
    padding: 16, borderWidth: 1.5, borderColor: '#e8e8e8'
  },
  priceLabel: { fontSize: 14, color: '#666' },
  priceValue: { fontSize: 20, fontWeight: '700', color: '#2563EB' },

  // Done
  doneBtn: {
    backgroundColor: '#22c55e', marginHorizontal: 20,
    marginTop: 16, borderRadius: 12, height: 54,
    justifyContent: 'center', alignItems: 'center'
  },
  doneBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
})