import { useState, useEffect } from 'react'
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native'
import { supabase } from '../../services/supabase'

export default function OtpScreen({ navigation, route }) {
  const { phone, fakeEmail } = route.params
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t > 0 ? t - 1 : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleVerify = async () => {
    if (otp.length < 6) {
      setError('أدخل الرمز كاملاً')
      return
    }
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.verifyOtp({
      email: fakeEmail,
      token: otp,
      type: 'email'
    })

    setLoading(false)
    if (error) {
      setError('الرمز غير صحيح أو انتهت صلاحيته')
      return
    }

    const { data: profile } = await supabase
      .from('users')
      .select('name')
      .eq('id', data.user.id)
      .single()

    if (!profile?.name) {
      navigation.navigate('Name')
    } else {
      navigation.replace('CustomerHome')
    }
  }

  const handleResend = async () => {
    setTimer(30)
    await supabase.auth.signInWithOtp({
      email: fakeEmail,
      options: { shouldCreateUser: true }
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>→ رجوع</Text>
      </TouchableOpacity>

      <Text style={styles.title}>أدخل رمز التحقق</Text>
      <Text style={styles.subtitle}>
        أرسلنا رمزاً إلى +970{phone}{'\n'}
        تحقق من بريدك الإلكتروني
      </Text>

      <TextInput
        style={styles.otpInput}
        placeholder="------"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
        textAlign="center"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>تحقق</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleResend}
        disabled={timer > 0}
      >
        <Text style={[styles.resend, timer > 0 && styles.resendDisabled]}>
          {timer > 0
            ? `إعادة الإرسال بعد ${timer}ث`
            : 'إعادة إرسال الرمز'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    paddingHorizontal: 28, backgroundColor: '#fff'
  },
  back: { color: '#2563EB', fontSize: 16, marginBottom: 32 },
  title: {
    fontSize: 26, fontWeight: '700',
    textAlign: 'center', marginBottom: 8, color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 14, textAlign: 'center',
    color: '#666', marginBottom: 36, lineHeight: 22
  },
  otpInput: {
    borderWidth: 1.5, borderColor: '#e0e0e0',
    borderRadius: 12, height: 64, fontSize: 28,
    letterSpacing: 12, marginBottom: 12
  },
  error: { color: '#e53935', textAlign: 'center', marginBottom: 12 },
  button: {
    backgroundColor: '#2563EB', borderRadius: 12,
    height: 56, justifyContent: 'center',
    alignItems: 'center', marginBottom: 20
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  resend: { color: '#2563EB', textAlign: 'center', fontSize: 14 },
  resendDisabled: { color: '#aaa' }
})