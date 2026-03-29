import { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, SafeAreaView, ActivityIndicator
} from 'react-native'

export default function RatingScreen({ navigation, route }) {
  const { driver, price, from, to } = route.params
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return
    setLoading(true)
    // مؤقتاً بدون Supabase
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 1000)
  }

  if (done) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.doneContainer}>
          <Text style={styles.doneIcon}>🎉</Text>
          <Text style={styles.doneTitle}>شكراً لك!</Text>
          <Text style={styles.doneSub}>
            تقييمك بيساعدنا نحسن الخدمة
          </Text>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.replace('CustomerHome')}
          >
            <Text style={styles.homeBtnText}>العودة للرئيسية</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <Text style={styles.title}>كيف كانت تجربتك؟ ⭐</Text>
        <Text style={styles.subtitle}>
          {from} → {to} • {price}₪
        </Text>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <Text style={styles.driverVehicle}>{driver.vehicle}</Text>
          <View>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.driverAgency}>{driver.agency}</Text>
          </View>
        </View>

        {/* Stars */}
        <Text style={styles.ratingLabel}>تقييمك للسائق</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
            >
              <Text style={[
                styles.star,
                star <= rating && styles.starActive
              ]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rating Labels */}
        {rating > 0 && (
          <Text style={styles.ratingText}>
            {rating === 1 && 'سيء جداً 😞'}
            {rating === 2 && 'سيء 😕'}
            {rating === 3 && 'مقبول 😐'}
            {rating === 4 && 'جيد 😊'}
            {rating === 5 && 'ممتاز! 🤩'}
          </Text>
        )}

        {/* Comment */}
        <Text style={styles.commentLabel}>تعليق إضافي (اختياري)</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="شاركنا تجربتك..."
          value={comment}
          onChangeText={setComment}
          multiline
          textAlign="right"
        />

        {/* Quick Tags */}
        <View style={styles.tagsRow}>
          {['سريع', 'محترم', 'دقيق', 'أمين'].map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.tag}
              onPress={() => setComment(c =>
                c ? `${c}، ${tag}` : tag
              )}
            >
              <Text style={styles.tagText}>+ {tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            (rating === 0 || loading) && styles.submitBtnDisabled
          ]}
          onPress={handleSubmit}
          disabled={rating === 0 || loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.submitBtnText}>إرسال التقييم</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace('CustomerHome')}
        >
          <Text style={styles.skipText}>تخطي</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 24 },

  title: {
    fontSize: 26, fontWeight: '700',
    color: '#1a1a1a', textAlign: 'center', marginBottom: 6
  },
  subtitle: {
    fontSize: 14, color: '#888',
    textAlign: 'center', marginBottom: 24
  },

  // Driver
  driverCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f8f9fa', borderRadius: 12,
    padding: 16, gap: 14, marginBottom: 28
  },
  driverVehicle: { fontSize: 36 },
  driverName: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  driverAgency: { fontSize: 12, color: '#888', marginTop: 2 },

  // Stars
  ratingLabel: {
    fontSize: 14, fontWeight: '600',
    color: '#444', marginBottom: 12, textAlign: 'center'
  },
  starsRow: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 12, marginBottom: 8
  },
  star: { fontSize: 44, color: '#e0e0e0' },
  starActive: { color: '#f59e0b' },
  ratingText: {
    fontSize: 16, textAlign: 'center',
    color: '#555', marginBottom: 24, fontWeight: '600'
  },

  // Comment
  commentLabel: {
    fontSize: 14, fontWeight: '600',
    color: '#444', marginBottom: 8
  },
  commentInput: {
    borderWidth: 1.5, borderColor: '#e0e0e0',
    borderRadius: 12, padding: 14,
    fontSize: 15, height: 90,
    textAlignVertical: 'top', color: '#1a1a1a',
    marginBottom: 12
  },

  // Tags
  tagsRow: {
    flexDirection: 'row', gap: 8,
    marginBottom: 28, flexWrap: 'wrap'
  },
  tag: {
    borderWidth: 1.5, borderColor: '#2563EB',
    borderRadius: 20, paddingVertical: 6,
    paddingHorizontal: 14
  },
  tagText: { color: '#2563EB', fontSize: 13 },

  // Submit
  submitBtn: {
    backgroundColor: '#2563EB', borderRadius: 12,
    height: 54, justifyContent: 'center',
    alignItems: 'center', marginBottom: 14
  },
  submitBtnDisabled: { opacity: 0.4 },
  submitBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  skipText: {
    textAlign: 'center', color: '#aaa', fontSize: 14
  },

  // Done
  doneContainer: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 32
  },
  doneIcon: { fontSize: 72, marginBottom: 20 },
  doneTitle: {
    fontSize: 28, fontWeight: '700',
    color: '#1a1a1a', marginBottom: 8
  },
  doneSub: {
    fontSize: 15, color: '#888',
    textAlign: 'center', marginBottom: 32
  },
  homeBtn: {
    backgroundColor: '#2563EB', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 40
  },
  homeBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
})