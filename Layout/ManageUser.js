import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'

const ManageUser = ({ navigation, route }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSave = () => {
    // TODO: Gửi dữ liệu về reducer hoặc server tại đây
    console.log({ fullname, email, address, phone, imageUri });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 20, height: 20 }} source={require('../Image/back.png')} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 80, fontSize: 18, fontWeight: 'bold' }}>Chỉnh sửa thông tin</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={imageUri ? { uri: imageUri } : require('../Image/pesonal.png')}
        />
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Thông tin của bạn</Text>
      </View>

      <View style={styles.textInput}>
        <TextInput style={styles.input} placeholder='Fullname' value={fullname} onChangeText={setFullname} />
        <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder='Address' value={address} onChangeText={setAddress} />
        <TextInput style={styles.input} placeholder='Number phone' value={phone} onChangeText={setPhone} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
        <Text style={{ color: 'white' }}>CHỌN ẢNH</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={{ color: 'white' }}>LƯU THÔNG TIN</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ManageUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30
  },
  avatarContainer: {
    width: '100%',
    height: 230,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10
  },
  textInput: {
    padding: 10,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center'
  }
})
