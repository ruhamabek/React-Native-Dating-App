import  { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
   StatusBar,
  SafeAreaView,
 } from 'react-native'
 import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
 import {
  useActionSheet,
  useTheme,
  useTranslations,
 } from '../../core/dopebase'
import { updateUser } from '../../core/users'
import { storageAPI } from '../../core/media'
import ActivityModal from '../../components/ActivityModal'
import { logout } from '../../core/onboarding/redux/auth'
import { setUserData } from '../../core/onboarding/redux/auth'
import GraceLogo from '../../components/GraceLogo/GraceLogo'
import dynamicStyles from './styles'
import { useIap } from '../../core/inAppPurchase/context'
import { useConfig } from '../../config'
import { useAuth } from '../../core/onboarding/hooks/useAuth'

const MyProfileScreen = props => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const colors = theme.colors[appearance]
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
            'An error occurred while loading image. Please try again.',
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

  const { firstName, lastName, profilePictureURL, bio, school, age } = currentUser
  const userLastName = currentUser && lastName ? lastName : ' '
  const userfirstName = currentUser && firstName ? firstName : ' '

  // Menu items configuration
  const menuItems = [
    {
      label: localized('Account Details'),
      icon: theme.icons.account,
      iconTint: colors.primaryForeground,
      onPress: detail,
    },
    {
      label: localized('Upgrade Account'),
      icon: theme.icons.vip,
      iconTint: '#FFB800',
      onPress: onUpgradeAccount,
    },
    {
      label: localized('Settings'),
      icon: theme.icons.setting,
      iconTint: colors.secondaryText,
      onPress: setting,
    },
    {
      label: localized('Contact Us'),
      icon: theme.icons.callIcon,
      iconTint: '#44D48C',
      onPress: contact,
    },
    {
      label: localized('Blocked Users'),
      icon: theme.icons.blockedUser,
      iconTint: colors.secondaryText,
      onPress: blocked,
    },
  ]

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.MainContainer}>
          <GraceLogo />
          <ScrollView
            style={styles.body}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
             <View style={styles.heroContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  showActionSheetWithOptions(
                    {
                      title: localized('Change Profile Photo'),
                      options: [
                        localized('Launch Camera'),
                        localized('Open Photo Gallery'),
                        localized('Cancel'),
                      ],
                      cancelButtonIndex: 2,
                    },
                    index => {
                      if (index == 0) onLaunchCamera()
                      if (index == 1) onOpenPhotos()
                    },
                  )
                }}
              >
                <Image
                  source={{ uri: profilePictureURL }}
                  style={styles.heroImage}
                  contentFit="cover"
                />
                <View
                  style={styles.heroGradient}
                >
                  <Text style={styles.heroName}>
                    {userfirstName}{userLastName !== ' ' ? ' ' + userLastName : ''}{age ? ', ' + age : ''}
                  </Text>
                  {school && (
                    <View style={styles.locationRow}>
                      <Image
                        style={styles.locationIcon}
                        source={theme.icons.markerIcon}
                      />
                      <Text style={styles.locationText}>{school}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>

             {bio ? (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {localized('About Me')}
                </Text>
                <Text style={styles.bioText}>{bio}</Text>
              </View>
            ) : null}

            {/* ─── My Photos / Moments ─── */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {localized('Moments')}
              </Text>
              <View style={styles.photosGrid}>
                {myphotos.map((photos, pageIndex) =>
                  photos.map((item, index) =>
                    item.add ? (
                      <TouchableOpacity
                        key={'add-' + pageIndex + '-' + index}
                        style={[
                          styles.myphotosItemView,
                          styles.addPhotoButton,
                        ]}
                        onPress={onSelectAddPhoto}
                      >
                        <Image
                          style={styles.addPhotoIcon}
                          source={theme.icons.cameraFilled}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        key={'photo-' + pageIndex + '-' + index}
                        style={styles.myphotosItemView}
                        onPress={() =>
                          onSelectDelPhoto(pageIndex * 6 + index)
                        }
                      >
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={{ uri: item }}
                          contentFit="cover"
                        />
                      </TouchableOpacity>
                    ),
                  ),
                )}
              </View>
            </View>

             <View style={styles.menuContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={'menu-' + index}
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.menuIconContainer,
                      { backgroundColor: item.iconTint + '15' },
                    ]}
                  >
                    <Image
                      style={[
                        styles.menuIcon,
                        { tintColor: item.iconTint },
                      ]}
                      source={item.icon}
                    />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuChevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

             <TouchableOpacity
              style={styles.logoutView}
              onPress={onLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.logoutText}>{localized('Logout')}</Text>
            </TouchableOpacity>
          </ScrollView>

          <ActivityModal
            loading={loading}
            title={localized('Please wait')}
            size={'large'}
            activityColor={theme.colors[appearance].primaryForeground}
            titleColor={theme.colors[appearance].primaryText}
            activityWrapperStyle={{
              backgroundColor: theme.colors[appearance].primaryBackground,
              borderRadius: theme.borderRadii.card,
              borderWidth: 1,
              borderColor: theme.colors[appearance].hairline,
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default MyProfileScreen
