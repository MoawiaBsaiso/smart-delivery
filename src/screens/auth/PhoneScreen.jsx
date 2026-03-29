import { useState } from 'react'
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native'
import { supabase } from '../../services/supabase'

export default function PhoneScreen({ navigation }) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      setError('أدخل رقم هاتف صحيح')
      return
    }
    setLoading(true)
    setError('')

    // مؤقتاً نحول رقم الهاتف لإيميل داخلياً
    const fakeEmail = `dev${phone}@wasilni.app`

    const { error } = await supabase.auth.signInWithOtp({
      email: fakeEmail,
      options: {
        shouldCreateUser: true
      }
    })

    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigation.navigate('Otp', { phone, fakeEmail })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>أهلاً بك 👋</Text>
      <Text style={styles.subtitle}>أدخل رقم هاتفك للمتابعة</Text>

      <View style={styles.inputRow}>
        <Text style={styles.prefix}>+970</Text>
        <TextInput
          style={styles.input}
          placeholder="599 000 000"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSendOtp}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>إرسال الرمز</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    paddingHorizontal: 28, backgroundColor: '#fff'
  },
  title: {
    fontSize: 28, fontWeight: '700',
    textAlign: 'center', marginBottom: 8, color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 15, textAlign: 'center',
    color: '#666', marginBottom: 40
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#e0e0e0',
    borderRadius: 12, paddingHorizontal: 16,
    marginBottom: 12, height: 56
  },
  prefix: { fontSize: 16, color: '#333', marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: '#1a1a1a' },
  error: { color: '#e53935', textAlign: 'center', marginBottom: 12 },
  button: {
    backgroundColor: '#2563EB', borderRadius: 12,
    height: 56, justifyContent: 'center', alignItems: 'center'
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' }
})