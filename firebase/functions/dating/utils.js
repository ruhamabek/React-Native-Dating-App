const defaultUserSettings = {
  distance_radius: 'unlimited',
  gender: 'none',
  gender_preference: 'all',
  show_me: true,
}

exports.defaultUserSettings = defaultUserSettings

exports.getUserSettingsChanged = (prevUserData, newUserData) => {
  const { settings: prevUserSettings = defaultUserSettings } = prevUserData
  const { settings: newUserSettings = defaultUserSettings } = newUserData

  const distanceRadiusUpdated =
    prevUserSettings.distance_radius !== newUserSettings.distance_radius
  const genderPreferenceUpdated =
    prevUserSettings.gender_preference !== newUserSettings.gender_preference
  const showMeUpdated = prevUserSettings.show_me !== newUserSettings.show_me
  return distanceRadiusUpdated || genderPreferenceUpdated
}

exports.getCanComputeRecommendations = newUserData => {
  const {
    firstName,
    email,
    phone,
    profilePictureURL,
    hasComputedRcommendations,
  } = newUserData
  return (
    (firstName || '').trim() &&
    (email || phone) &&
    profilePictureURL &&
    !hasComputedRcommendations
    // &&
    // profilePictureURL != defaultAvatar // Uncomment this line if you don't want users with no avatar show up in the recommendations
  )
}

exports.generateDistanceField = (lat1, lon1, lat2, lon2, unit = 'M') => {
  if (lat1 === lat2 && lon1 === lon2) {
    return '< 1 mile away'
  } else {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const theta = lon1 - lon2
    const radtheta = (Math.PI * theta) / 180
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

    if (dist > 1) {
      dist = 1
    }

    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515

    if (unit === 'K') {
      dist = dist * 1.609344
    }

    if (unit === 'N') {
      dist = dist * 0.8684
    }

    return getDistanceString(dist)
  }
}

const getDistanceString = dist => {
  const distance = Math.round(dist)
  if (distance >= 2.0) {
    return distance + ' ' + 'miles away'
  }
  return '1 mile away'
}

exports.getDistanceString = getDistanceString

exports.getUserSettingsDistanceRadius = user => {
  const userSettings = user.settings || defaultUserSettings
  const distanceRadius = (userSettings.distance_radius &&
    userSettings.distance_radius.toLowerCase() !== 'unlimited' &&
    userSettings.distance_radius.split(' ')) || ['unlimited']

  return distanceRadius[0]
}
