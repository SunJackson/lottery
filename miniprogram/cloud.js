const configs = {
  lottery: {
    prod: {
      env: 'lowcode-4guet6pc69809275', // 抽奖精选 wxb53ba1bee1a3319a
      traceUser: true
    }
  }
}

module.exports = {
  config: configs.lottery.prod
}