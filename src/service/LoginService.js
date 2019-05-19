export function Logout() {
    sessionStorage.setItem('isauthenticated', null)
    window.open('#login', '_parent');
}