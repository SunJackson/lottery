const configs = {
  lottery: {
    prod: {
      env: 'lowcode-4guet6pc69809275',
      traceUser: true
    }
  }
}

module.exports = {
  config: configs.lottery.prod
}