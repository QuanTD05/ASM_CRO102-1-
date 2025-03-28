import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './HomeScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = (props) => {
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [showPass, setshowPass] = useState(true);
    const [checkRemember, setcheckRemember] = useState(false);

    const CheckLogin = async () => {
        if (email === '' || pass === '') {
            alert('Email và mật khẩu không được bỏ trống!');
            return;
        }

        let url = `${URL}/users?email=${email}`;
        fetch(url)
            .then(res => res.json())
            .then(async data => {
                if (data.length !== 1) {
                    alert('Email không chính xác!');
                    return false;
                }
                const user = data[0];
                if (user.pass !== pass) {
                    alert('Mật khẩu không chính xác!');
                    return false;
                } else {
                    await AsyncStorage.setItem('User', JSON.stringify(user));
                    rememberAccount();
                    alert('Đăng nhập thành công!');
                    props.navigation.navigate('Main');
                }
            });
    };

    // Lưu tài khoản nếu chọn "Nhớ tài khoản"
    const rememberAccount = async () => {
        if (checkRemember) {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('pass', pass);
        } else {
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('pass');
        }
    };

    useEffect(() => {
        const retrieveData = async () => {
            const storedemail = await AsyncStorage.getItem('email');
            const storedPassword = await AsyncStorage.getItem('pass');
            if (storedemail && storedPassword) {
                setemail(storedemail);
                setpass(storedPassword);
                setcheckRemember(true);
            }
        };
        retrieveData();
    }, []);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                {/* Hình nền trên */}
                <Image source={require('../Image/logo_CRO102.png')} style={styles.headerImage} />

                {/* Form đăng nhập */}
                <View style={styles.loginContainer}>
                    <Text style={styles.welcomeText}>Chào mừng bạn</Text>
                    <Text style={styles.subText}>Đăng nhập tài khoản</Text>

                    {/* Nhập email */}
                    <TextInput
                        style={styles.input}
                        placeholder='Nhập email'
                        onChangeText={setemail}
                        value={email}
                        keyboardType="email-address"
                    />

                    {/* Nhập mật khẩu */}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder='Nhập mật khẩu'
                            secureTextEntry={showPass}
                            onChangeText={setpass}
                            value={pass}
                        />
                        <TouchableOpacity onPress={() => setshowPass(!showPass)}>
                            <Image
                                style={styles.icon}
                                source={showPass ? require('../Image/visible.png') : require('../Image/invisible.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Nhớ tài khoản & Quên mật khẩu */}
                    <View style={styles.options}>
                        <TouchableOpacity onPress={() => setcheckRemember(!checkRemember)} style={styles.rememberMe}>
                            <Image
                                style={styles.checkBox}
                                source={checkRemember ? require('../Image/check.png') : require('../Image/circle.png')}
                            />
                            <Text style={styles.rememberText}>Nhớ tài khoản</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Button đăng nhập */}
                    <TouchableOpacity style={styles.loginButton} onPress={CheckLogin}>
                        <Text style={styles.loginText}>Đăng nhập</Text>
                    </TouchableOpacity>

                    {/* Hoặc */}
                    <Text style={styles.orText}>Hoặc</Text>

                    {/* Đăng nhập bằng Google / Facebook */}
                    <View style={styles.socialLogin}>
                        <TouchableOpacity>
                            <Image style={styles.socialIcon} source={require('../Image/google.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.socialIcon} source={require('../Image/facebook.png')} />
                        </TouchableOpacity>
                    </View>

                    {/* Chuyển sang màn hình Đăng ký */}
                    <View style={styles.registerContainer}>
                        <Text>Bạn không có tài khoản?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                            <Text style={styles.registerText}>Tạo tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerImage: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 30,   // Góc trái dưới hơi bo nhẹ
        borderBottomRightRadius: 180, // Góc phải dưới bo lớn để tạo hiệu ứng cắt chéo
    },
    loginContainer: {
        padding: 20,
        marginTop: -50, // Kéo lên gần header
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 20,
        
        // Hiệu ứng đổ bóng
        elevation: 10, // Bóng mạnh hơn trên Android
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10, 
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        color: '#2e7d32', // Màu xanh lá cây
    },
    subText: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#777',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBox: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    rememberText: {
        fontSize: 16,
        color: '#444',
    },
    forgotText: {
        color: '#2e7d32',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#2e7d32',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 25,
        elevation: 3,
        shadowColor: '#2e7d32',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    orText: {
        textAlign: 'center',
        marginVertical: 20,
        color: '#888',
        fontSize: 16,
    },
    socialLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialIcon: {
        width: 50,
        height: 50,
        marginHorizontal: 20,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    registerText: {
        color: '#2e7d32',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
});