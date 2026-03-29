import { useState } from 'react'
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native'
import { supabase } from '../../services/supabase'

export default function NameScreen({ navigation }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (name.trim().length < 2) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('users').upsert({
      id: user.id,
      name: name.trim(),
      phone: user.phone,
      role: 'customer'
    })
    setLoading(false)
    navigation.replace('CustomerHome')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>شو اسمك؟ 😊</Text>
      <Text style={styles.subtitle}>هاد بيساعدنا نخدمك بشكل أفضل</Text>

      <TextInput
        style={styles.input}
        placeholder="اسمك الكريم"
        value={name}
        onChangeText={setName}
        textAlign="right"
      />

      <TouchableOpacity
        style={[styles.button, (loading || name.length < 2) && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={loading || name.length < 2}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>ابدأ</Text>
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
  input: {
    borderWidth: 1.5, borderColor: '#e0e0e0',
    borderRadius: 12, height: 56, paddingHorizontal: 16,
    fontSize: 16, marginBottom: 20, color: '#1a1a1a'
  },
  button: {
    backgroundColor: '#2563EB', borderRadius: 12,
    height: 56, justifyContent: 'center', alignItems: 'center'
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' }
})