module.exports = {
    // ... other configurations ..
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      },
    // transformIgnorePatterns: ['node_modules/(?!(axios|@testing-library|react-dom)/)'],
  //   moduleNameMapper: {
  //     axios: 'axios/dist/node/axios.cjs',
  // },
  };