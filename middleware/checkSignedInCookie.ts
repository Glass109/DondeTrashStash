//@ts-nocheck
export default defineNuxtRouteMiddleware(() => {
    const userCookie = useCookie('user')
    if (!userCookie.value) {
        return navigateTo('/500')
    }
})