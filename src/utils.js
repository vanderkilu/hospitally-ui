const PREFIX = 'HOSPITALLY'
const storeToken = (token) => localStorage.setItem(PREFIX, token)
const getToken = () => localStorage.getItem(PREFIX)
const clearToken = () => localStorage.clear()

module.exports = {
    storeToken,
    getToken,
    clearToken
}