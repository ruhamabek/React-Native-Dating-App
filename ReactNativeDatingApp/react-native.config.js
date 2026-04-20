module.exports = {
  dependencies: {
  },
  project: {
    ios: {},
    android: {
     packageName: 'io.instamobile',
    }, // grouped into "project"
  },
  assets: ['./src/assets/fonts/'], // stays the same
}

// A dependency conflict will occur on Android platform if you do not comment out one of the two.
