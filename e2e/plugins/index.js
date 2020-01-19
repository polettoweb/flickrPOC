module.exports = (on, config) => {
  return Object.assign({}, config, {
    integrationFolder: "e2e/specs"
  });
};
