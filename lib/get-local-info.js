import Cookies from 'js-cookie'

export const getUserFromCookie = () => {
  const user = {}
  ;['userId', 'companyId', 'pToken'].forEach(item => {
    user[item] = Cookies.get(item)
  })
  return user
}
