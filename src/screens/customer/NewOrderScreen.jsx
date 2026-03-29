import { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, SafeAreaView, ActivityIndicator
} from 'react-native'

const VEHICLES = [
  { type: 'bicycle', icon: '🚲', label: 'دراجة هوائية', base: 1, perKm: 0.3, maxKg: 5 },
  { type: 'motorcycle', icon: '🛵', label: 'دراجة نارية', base: 2, perKm: 0.5, maxKg: 20 },
  { type: 'car', icon: '🚗', label: 'سيارة', base: 4, perKm: 1.0, maxKg: 100 },
  { type: 'pickup', icon: '🚐', label: 'بيك أب', base: 6, perKm: 1.5, maxKg: 500 },
]

const SIZES = [
  { label: 'صغير', sublabel: 'مستندات، أدوية', icon: '📄', size: 'small' },
  { label: 'متوسط', sublabel: 'طلبات، ملابس', icon: '📦', size: 'medium' },
  { label: 'كبير', sublabel: 'أجهزة، صناديق', icon: '🗃️', size: 'large' },
  { label: 'كبير جداً', sublabel: 'أثاث، معدات', icon: '🛋️', size: 'xlarge' },
]

function assignVehicle(size) {
  if (size === 'small') return VEHICLES[0]
  if (size === 'medium') return VEHICLES[1]
  if (size === 'large') return VEHICLES[2]
  return VEHICLES[3]
}

function calculatePrice(vehicle, distanceKm) {
  return (vehicle.base + vehicle.perKm * distanceKm).toFixed(2)
}

export default function NewOrderScreen({ navigation }) {
  const [step, setStep] = useState(1)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [selectedSize, setSelectedSize] = useState(null)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  // مؤقتاً نفترض المسافة 3 كم
  const MOCK_DISTANCE = 3
  const assignedVehicle = selectedSize ? assignVehicle(selectedSize) : null
  const price = assignedVehicle ? calculatePrice(assignedVehicle, MOCK_DISTANCE) : null

  const handleConfirm = async () => {
    setLoading(true)
    // مؤقتاً بدون Supabase
    setTimeout(() => {
      setLoading(false)
      navigation.replace('OrderTracking', {
        from, to, vehicle: assignedVehicle, price
      })
    }, 1500)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>→ رجوع</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>طلب جديد</Text>
        <Text style={styles.stepIndicator}>{step}/3</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Step 1 — المواقع */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>من وين لوين؟ 📍</Text>

            <Text style={styles.inputLabel}>موقع الاستلام</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: المنارة، نابلس"
              value={from}
              onChangeText={setFrom}
              textAlign="right"
            />

            <Text style={styles.inputLabel}>موقع التسليم</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: رفيديا، نابلس"
              value={to}
              onChangeText={setTo}
              textAlign="right"
            />

            <Text style={styles.inputLabel}>ملاحظات إضافية (اختياري)</Text>
            <TextInput
              style={[styles.input, styles.noteInput]}
              placeholder="مثال: اتصل قبل الوصول"
              value={note}
              onChangeText={setNote}
              multiline
              textAlign="right"
            />

            <TouchableOpacity
              style={[styles.nextBtn,
                (!from || !to) && styles.nextBtnDisabled]}
              onPress={() => setStep(2)}
              disabled={!from || !to}
            >
              <Text style={styles.nextBtnText}>التالي ›</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2 — حجم الطلب */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>شو حجم الطلب؟ 📦</Text>
            <Text style={styles.stepSub}>
              بناءً على الحجم رح نختارلك أوفر وسيلة توصيل
            </Text>

            {SIZES.map((s) => (
              <TouchableOpacity
                key={s.size}
                style={[
                  styles.sizeCard,
                  selectedSize === s.size && styles.sizeCardActive
                ]}
                onPress={() => setSelectedSize(s.size)}
              >
                <Text style={styles.sizeIcon}>{s.icon}</Text>
                <View style={styles.sizeInfo}>
                  <Text style={[
                    styles.sizeLabel,
                    selectedSize === s.size && styles.sizeLabelActive
                  ]}>
                    {s.label}
                  </Text>
                  <Text style={styles.sizeSublabel}>{s.sublabel}</Text>
                </View>
                {selectedSize === s.size && (
                  <Text style={styles.sizeCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            <View style={styles.rowBtns}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => setStep(1)}
              >
                <Text style={styles.backBtnText}>‹ رجوع</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nextBtn, styles.nextBtnFlex,
                  !selectedSize && styles.nextBtnDisabled]}
                onPress={() => setStep(3)}
                disabled={!selectedSize}
              >
                <Text style={styles.nextBtnText}>التالي ›</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 3 — تأكيد */}
        {step === 3 && assignedVehicle && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>تأكيد الطلب ✅</Text>

            {/* ملخص */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>من</Text>
                <Text style={styles.summaryValue}>{from}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>إلى</Text>
                <Text style={styles.summaryValue}>{to}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>الحجم</Text>
                <Text style={styles.summaryValue}>
                  {SIZES.find(s => s.size === selectedSize)?.label}
                </Text>
              </View>
            </View>

            {/* المركبة المختارة */}
            <View style={styles.vehicleSelected}>
              <Text style={styles.vehicleSelectedTitle}>
                وسيلة التوصيل المناسبة
              </Text>
              <View style={styles.vehicleSelectedContent}>
                <Text style={styles.vehicleSelectedIcon}>
                  {assignedVehicle.icon}
                </Text>
                <View>
                  <Text style={styles.vehicleSelectedName}>
                    {assignedVehicle.label}
                  </Text>
                  <Text style={styles.vehicleSelectedSub}>
                    الأوفر لحجم طلبك
                  </Text>
                </View>
                <Text style={styles.vehicleSelectedPrice}>{price}₪</Text>
              </View>
            </View>

            {/* السعر */}
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>السعر الإجمالي</Text>
              <Text style={styles.priceValue}>{price} ₪</Text>
              <Text style={styles.priceSub}>شامل جميع الرسوم</Text>
            </View>

            <View style={styles.rowBtns}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => setStep(2)}
              >
                <Text style={styles.backBtnText}>‹ رجوع</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nextBtn, styles.nextBtnFlex,
                  loading && styles.nextBtnDisabled]}
                onPress={handleConfirm}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.nextBtnText}>اطلب الآن 🚀</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 20,
    paddingVertical: 14, backgroundColor: '#fff'
  },
  back: { color: '#2563EB', fontSize: 16 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#1a1a1a' },
  stepIndicator: { fontSize: 14, color: '#888' },
  progressBar: {
    height: 3, backgroundColor: '#e8e8e8', marginHorizontal: 0
  },
  progressFill: {
    height: 3, backgroundColor: '#2563EB', borderRadius: 2
  },
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  stepContainer: { padding: 20 },
  stepTitle: {
    fontSize: 22, fontWeight: '700',
    color: '#1a1a1a', marginBottom: 6
  },
  stepSub: {
    fontSize: 14, color: '#888',
    marginBottom: 20, lineHeight: 20
  },

  // Inputs
  inputLabel: {
    fontSize: 14, fontWeight: '600',
    color: '#444', marginBottom: 6, marginTop: 14
  },
  input: {
    backgroundColor: '#fff', borderWidth: 1.5,
    borderColor: '#e0e0e0', borderRadius: 12,
    padding: 14, fontSize: 15, color: '#1a1a1a'
  },
  noteInput: { height: 80, textAlignVertical: 'top' },

  // Size Cards
  sizeCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#e0e0e0',
    padding: 14, marginBottom: 10
  },
  sizeCardActive: { borderColor: '#2563EB', backgroundColor: '#f0f4ff' },
  sizeIcon: { fontSize: 28, marginRight: 14 },
  sizeInfo: { flex: 1 },
  sizeLabel: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  sizeLabelActive: { color: '#2563EB' },
  sizeSublabel: { fontSize: 12, color: '#888', marginTop: 2 },
  sizeCheck: { fontSize: 18, color: '#2563EB', fontWeight: '700' },

  // Summary
  summaryCard: {
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#e0e0e0',
    padding: 16, marginBottom: 16
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', paddingVertical: 8
  },
  summaryLabel: { fontSize: 14, color: '#888' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  divider: { height: 1, backgroundColor: '#f0f0f0' },

  // Vehicle Selected
  vehicleSelected: {
    backgroundColor: '#f0f4ff', borderRadius: 12,
    padding: 16, marginBottom: 16,
    borderWidth: 1.5, borderColor: '#2563EB'
  },
  vehicleSelectedTitle: {
    fontSize: 12, color: '#2563EB',
    fontWeight: '600', marginBottom: 10
  },
  vehicleSelectedContent: {
    flexDirection: 'row', alignItems: 'center', gap: 12
  },
  vehicleSelectedIcon: { fontSize: 32 },
  vehicleSelectedName: {
    fontSize: 15, fontWeight: '700', color: '#1a1a1a'
  },
  vehicleSelectedSub: { fontSize: 12, color: '#666', marginTop: 2 },
  vehicleSelectedPrice: {
    marginLeft: 'auto', fontSize: 20,
    fontWeight: '700', color: '#2563EB'
  },

  // Price
  priceBox: {
    backgroundColor: '#1a1a1a', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 20
  },
  priceLabel: { fontSize: 13, color: '#aaa' },
  priceValue: {
    fontSize: 36, fontWeight: '700',
    color: '#fff', marginVertical: 4
  },
  priceSub: { fontSize: 12, color: '#666' },

  // Buttons
  rowBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  nextBtn: {
    backgroundColor: '#2563EB', borderRadius: 12,
    height: 52, justifyContent: 'center', alignItems: 'center'
  },
  nextBtnFlex: { flex: 1 },
  nextBtnDisabled: { opacity: 0.4 },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  backBtn: {
    borderWidth: 1.5, borderColor: '#e0e0e0',
    borderRadius: 12, height: 52, paddingHorizontal: 20,
    justifyContent: 'center', alignItems: 'center'
  },
  backBtnText: { color: '#555', fontSize: 15 },
})