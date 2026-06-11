import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch, Image, Modal, TextInput, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useUser } from '../context/UserContext';

import AnasayfaActive from '../assets/icons/anasayfaikonbasili.svg';
import AnasayfaInactive from '../assets/icons/anasayfaikonsonuk.svg';
import IstatistikActive from '../assets/icons/istatistikikonbasili.svg';
import IstatistikInactive from '../assets/icons/istatistikikonsonuk.svg';
import KutuActive from '../assets/icons/kutuikonbasili.svg';
import KutuInactive from '../assets/icons/kutuikonsonuk.svg';
import HedefActive from '../assets/icons/hedefikonbasili.svg';
import HedefInactive from '../assets/icons/hedefikonsonuk.svg';
import ProfilActive from '../assets/icons/profilikonbasili.svg';
import ProfilInactive from '../assets/icons/profilikonsonuk.svg';

const TABS = [
  { label: 'Profil', active: ProfilActive, inactive: ProfilInactive },
  { label: 'İstatistik', active: IstatistikActive, inactive: IstatistikInactive },
  { label: 'Ana Sayfa', active: AnasayfaActive, inactive: AnasayfaInactive },
  { label: 'Hedef', active: HedefActive, inactive: HedefInactive },
  { label: 'Oyun', active: KutuActive, inactive: KutuInactive },
];

function EditModal({ visible, title, onClose, onSave, children }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{title}</Text>
          {children}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
              <Text style={styles.saveText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function MenuItem({ label, value, isSwitch, onToggle, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.menuLabel}>{label}</Text>
      {isSwitch
        ? <Switch value={value} onValueChange={onToggle} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.white} />
        : <Text style={styles.menuValue}>{value || '›'}</Text>
      }
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const [notifs, setNotifs] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { username, setUsername } = useUser();
  const [tempUsername, setTempUsername] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleSaveUsername = () => {
    if (tempUsername.trim().length < 3) {
      Alert.alert('Hata', 'Kullanıcı adı en az 3 karakter olmalı.');
      return;
    }
    setUsername(tempUsername.trim());
    setShowUsernameModal(false);
    setTempUsername('');
  };

  const handleSavePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Hata', 'Yeni şifre en az 6 karakter olmalı.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert('Başarılı', 'Şifreniz güncellendi.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Kullanıcı Adı Modal */}
      <EditModal
        visible={showUsernameModal}
        title="Kullanıcı Adını Değiştir"
        onClose={() => { setShowUsernameModal(false); setTempUsername(''); }}
        onSave={handleSaveUsername}
      >
        <TextInput
          style={styles.modalInput}
          placeholder="Yeni kullanıcı adı"
          placeholderTextColor={colors.textLight}
          value={tempUsername}
          onChangeText={setTempUsername}
          autoCapitalize="none"
        />
      </EditModal>

      {/* Şifre Modal */}
      <EditModal
        visible={showPasswordModal}
        title="Şifre Değiştir"
        onClose={() => { setShowPasswordModal(false); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }}
        onSave={handleSavePassword}
      >
        <TextInput
          style={styles.modalInput}
          placeholder="Mevcut şifre"
          placeholderTextColor={colors.textLight}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Yeni şifre"
          placeholderTextColor={colors.textLight}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Yeni şifre tekrar"
          placeholderTextColor={colors.textLight}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </EditModal>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Image
              source={require('../assets/images/akreplogo.png')}
              style={styles.avatarImg}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.userName}>Merhaba {username}</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>Seviye 1</Text></View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>HESAP AYARLARI</Text>
        <View style={styles.menuCard}>
          <MenuItem
            label="Kullanıcı Adı"
            value={username}
            onPress={() => { setTempUsername(username); setShowUsernameModal(true); }}
          />
          <View style={styles.sep} />
          <MenuItem
            label="Şifre Değiştir"
            value="••••••"
            onPress={() => setShowPasswordModal(true)}
          />
          <View style={styles.sep} />
          <MenuItem label="Bildirimler" isSwitch value={notifs} onToggle={setNotifs} />
        </View>

        <Text style={styles.sectionTitle}>DİĞER</Text>
        <View style={styles.menuCard}>
          <MenuItem label="Yardım ve Destek" value="›" />
        </View>

        <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate('Splash')}>
          <Text style={styles.logoutText}>Oturumu Kapat</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.tabBar}>
        {TABS.map((tab, i) => {
          const TabIcon = activeTab === i ? tab.active : tab.inactive;
          const isActive = activeTab === i;
          return (
            <TouchableOpacity key={i} style={styles.tabItem} onPress={() => setActiveTab(i)}>
              <TabIcon width={26} height={26} style={styles.tabIcon} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 25, paddingBottom: 125 },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 20, padding: 20, marginTop: 20, marginBottom: 30, gap: 17.5 },
  avatar: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarImg: { width: 52.5, height: 52.5 },
  userName: { fontSize: 22.5, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  badge: { backgroundColor: colors.accent, borderRadius: 7.5, paddingHorizontal: 10, paddingVertical: 2.5, alignSelf: 'flex-start' },
  badgeText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.muted, letterSpacing: 1.5, marginBottom: 10, marginLeft: 5 },
  menuCard: { backgroundColor: colors.white, borderRadius: 17.5, marginBottom: 25, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20 },
  menuLabel: { fontSize: 17.5, color: colors.textPrimary, fontWeight: '500' },
  menuValue: { fontSize: 17.5, color: colors.muted },
  sep: { height: 1.5, backgroundColor: colors.border, marginHorizontal: 20 },
  logout: { alignItems: 'center', marginTop: 10 },
  logoutText: { color: colors.error, fontSize: 17.5, fontWeight: '600' },
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 92.5, paddingTop: 10, backgroundColor: colors.white, flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'flex-start' },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', gap: 4 },
  tabIcon: { width: 26, height: 26 },
  tabLabel: { fontSize: 11, color: colors.muted, fontWeight: '500' },
  tabLabelActive: { color: colors.primary, fontWeight: '700' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modal: { backgroundColor: colors.white, borderRadius: 20, padding: 30, width: '85%' },
  modalTitle: { fontSize: 21.5, fontWeight: '700', color: colors.textPrimary, marginBottom: 20 },
  modalInput: { backgroundColor: colors.accent, borderRadius: 12.5, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 17.5, height: 60, fontSize: 17.5, color: colors.textPrimary, marginBottom: 15 },
  modalButtons: { flexDirection: 'row', gap: 15, marginTop: 5 },
  cancelBtn: { flex: 1, height: 57.5, borderRadius: 12.5, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontSize: 17.5, fontWeight: '600', color: colors.muted },
  saveBtn: { flex: 1, height: 57.5, borderRadius: 12.5, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  saveText: { fontSize: 17.5, fontWeight: '600', color: colors.white },
});