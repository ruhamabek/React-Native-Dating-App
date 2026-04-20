import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native'
import Swiper from 'react-native-swiper'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import {
  useActionSheet,
  useTheme,
  useTranslations,
  ProfilePictureSelector,
} from '../../core/dopebase'
import { updateUser } from '../../core/users'
import { storageAPI } from '../../core/media'
import ActivityModal from '../../components/ActivityModal'
import { logout } from '../../core/onboarding/redux/auth'
import { setUserData } from '../../core/onboarding/redux/auth'
import dynamicStyles from './styles'
import { useIap } from '../../core/inAppPurchase/context'
import { useConfig } from '../../config'
import { useAuth } from '../../core/onboarding/hooks/useAuth'

const MyProfileScreen = props => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()
  const authManager = useAuth()

  const [loading, setLoading] = useState(false)
  const [myphotos, setMyphotos] = useState([])
  const { setSubscriptionVisible } = useIap()

  const { showActionSheetWithOptions } = useActionSheet()

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.user)

  var selectedItemIndex = -1

  const updatePhotos = photos => {
    let myUpdatePhotos = []
    let pphotos = photos ? [...photos] : []
    let temp = []

    pphotos.push({ add: true })
    pphotos.map((item, index) => {
      temp.push(item)

      if (index % 6 == 5) {
        myUpdatePhotos.push(temp)
        temp = []
      } else if (item && item.add) {
        myUpdatePhotos.push(temp)
        temp = []
      }
    })

    setMyphotos(myUpdatePhotos)
    selectedItemIndex = -1
  }

  useEffect(() => {
    if (currentUser) {
      updatePhotos(currentUser.photos)
    }

    StatusBar.setHidden(false)
  }, [])

  const detail = () => {
    props.navigation.navigate('AccountDetails', {
      form: config.editProfileFields,
      screenTitle: localized('Edit Profile'),
    })
  }

  const onUpgradeAccount = () => {
    setSubscriptionVisible(true)
  }

  const setting = () => {
    props.navigation.navigate('Settings', {
      userId: currentUser.id,
      form: config.userSettingsFields,
      screenTitle: localized('Settings'),
    })
  }

  const contact = () => {
    props.navigation.navigate('ContactUs', {
      form: config.contactUsFields,
      screenTitle: localized('Contact us'),
      phone: config.contactUsPhoneNumber,
    })
  }

  const blocked = () => {
    props.navigation.navigate('BlockedUsers')
  }

  const onLogout = () => {
    authManager?.logout(currentUser)
    dispatch(logout())
    props.navigation.navigate('LoadScreen')
  }

  const onSelectAddPhoto = () => {
    showActionSheetWithOptions(
      {
        title: localized('Profile Upload'),
        options: [
          localized('Launch Camera'),
          localized('Open Photo Gallery'),
          localized('Cancel'),
        ],
        cancelButtonIndex: 2,
      },
      onPhotoUploadDialogDone,
    )
  }

  const onPhotoUploadDialogDone = index => {
    if (index == 0) {
      onLaunchCamera()
    }

    if (index == 1) {
      onOpenPhotos()
    }
  }

  const updateUserPhotos = uri => {
    const { photos } = currentUser
    let pphotos = photos ? photos : []

    pphotos.push(uri)

    const data = {
      photos: pphotos,
    }

    updateUserInfo(data)
    updatePhotos(pphotos)
  }

  const onLaunchCamera = () => {
    ImagePicker.launchCameraAsync({
      allowsEditing: false,
      allowsMultipleSelection: false,
    }).then(result => {
      if (result.canceled !== true) {
        startUpload(result.assets[0], updateUserPhotos)
      }
    })
  }

  const onOpenPhotos = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: false,
    })
      .then(result => {
        if (result.canceled !== true) {
          startUpload(result.assets[0], updateUserPhotos)
        }
      })
      .catch(error => {
        console.log(error)
        alert(
          localized(
            'An errord occurred while loading image. Please try again.',
          ),
        )
      })
  }

  const startUpload = (source, updateUserData) => {
    setLoading(true)

    if (!source) {
      updateUserData(null)
      return
    }

    storageAPI
      .processAndUploadMediaFile(source)
      .then(({ downloadURL }) => {
        if (downloadURL) {
          updateUserData(downloadURL)
        } else {
          // an error occurred
          setLoading(false)
        }
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  const updateUserInfo = data => {
    const tempUser = currentUser
    // optimistically update the UI
    dispatch(setUserData({ user: { ...currentUser, ...data } }))

    updateUser(currentUser.id, data)
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        const { message } = error
        setLoading(false)
        dispatch(setUserData({ user: { ...tempUser } }))
        console.log('upload error', error)
      })
  }

  const updateProfilePictureURL = file => {
    startUpload(file, uri => updateUserInfo({ profilePictureURL: uri }))
  }

  const onSelectDelPhoto = index => {
    selectedItemIndex = index

    showActionSheetWithOptions(
      {
        title: localized('Photo Options'),
        options: [
          localized('Remove Photo'),
          localized('Cancel'),
          localized('Make Profile Picture'),
        ],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      onPhotoDialogDone,
    )
  }

  const onPhotoDialogDone = actionSheetActionIndex => {
    const { photos } = currentUser

    if (selectedItemIndex == -1 || selectedItemIndex >= photos.length) {
      return
    }

    if (actionSheetActionIndex == 0) {
      if (photos) {
        photos.splice(selectedItemIndex, 1)
      }

      updateUserInfo({ photos })
      updatePhotos(photos)
    }

    if (actionSheetActionIndex == 2) {
      const photoToUpdate = photos[selectedItemIndex]
      updateUserInfo({ profilePictureURL: photoToUpdate })
    }
  }

  const { firstName, lastName, profilePictureURL } = currentUser
  const userLastName = currentUser && lastName ? lastName : ' '
  const userfirstName = currentUser && firstName ? firstName : ' '

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.MainContainer}>
          <ScrollView style={styles.body}>
            <View style={styles.profilePictureContainer}>
              <ProfilePictureSelector
                setProfilePictureFile={updateProfilePictureURL}
                profilePictureURL={profilePictureURL}
              />
            </View>
            <View style={styles.nameView}>
              <Text style={styles.name}>
                {userfirstName + ' ' + userLastName}
              </Text>
            </View>
            <View
              style={[
                styles.myphotosView,
                myphotos[0] && myphotos[0].length <= 3
                  ? { height: Platform.OS === 'web' ? 320 : 158 }
                  : { height: Platform.OS === 'web' ? 530 : 268 },
              ]}>
              <View style={styles.itemView}>
                <Text style={styles.photoTitleLabel}>
                  {localized('My Photos')}
                </Text>
              </View>
              <Swiper
                removeClippedSubviews={false}
                showsButtons={false}
                loop={false}
                paginationStyle={{ top: -230, left: null, right: 0 }}
                dot={<View style={styles.inactiveDot} />}
                activeDot={
                  <View
                    style={{
                      backgroundColor: '#db6470',
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                }>
                {myphotos.map((photos, i) => (
                  <View key={'photos' + i} style={styles.slide}>
                    <View style={styles.slideActivity}>
                      <FlatList
                        horizontal={false}
                        numColumns={Platform.OS === 'web' ? 3 : 3}
                        data={photos}
                        scrollEnabled={false}
                        renderItem={({ item, index }) =>
                          item.add ? (
                            <TouchableOpacity
                              key={'item' + index}
                              style={[
                                styles.myphotosItemView,
                                {
                                  backgroundColor:
                                    theme.colors[appearance].primaryForeground,
                                },
                              ]}
                              onPress={onSelectAddPhoto}>
                              <Image
                                style={styles.icon}
                                source={theme.icons.cameraFilled}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              key={'item' + index}
                              style={styles.myphotosItemView}
                              onPress={() => onSelectDelPhoto(i * 6 + index)}>
                              <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: item }}
                              />
                            </TouchableOpacity>
                          )
                        }
                      />
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>
            <TouchableOpacity style={styles.optionView} onPress={detail}>
              <View style={styles.iconView}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: '#687cf0',
                    contentFit: 'cover',
                  }}
                  source={theme.icons.account}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textLabel}>
                  {localized('Account Details')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionView}
              onPress={onUpgradeAccount}>
              <View style={styles.iconView}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    contentFit: 'cover',
                  }}
                  source={theme.icons.vip}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textLabel}>
                  {localized('Upgrade Account')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionView} onPress={setting}>
              <View style={styles.iconView}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: '#9a91c4',
                    contentFit: 'cover',
                  }}
                  source={theme.icons.setting}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textLabel}>{localized('Settings')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionView} onPress={contact}>
              <View style={styles.iconView}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: '#88e398',
                    contentFit: 'cover',
                  }}
                  source={theme.icons.callIcon}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textLabel}>{localized('Contact Us')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionView} onPress={blocked}>
              <View style={styles.iconView}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: '#9a91c4',
                    contentFit: 'cover',
                  }}
                  source={theme.icons.blockedUser}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.textLabel}>
                  {localized('Blocked Users')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutView} onPress={onLogout}>
              <Text style={styles.textLabel}>{localized('Logout')}</Text>
            </TouchableOpacity>
          </ScrollView>

          <ActivityModal
            loading={loading}
            title={localized('Please wait')}
            size={'large'}
            activityColor={'white'}
            titleColor={'white'}
            activityWrapperStyle={{
              backgroundColor: '#404040',
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default MyProfileScreen
