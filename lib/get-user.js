const Cookie = reuqire('js-cookie')

exports.getUserFromCookie = () => {
  const user = {}
  ;[('userId', 'companyId', 'pToken')].forEach(item => {
    user[item] = Cookie.get(item)
  })
  return user
}
