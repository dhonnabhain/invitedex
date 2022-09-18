import {library, config} from '@fortawesome/fontawesome-svg-core'
import {
    faCaretUp,
    faCaretDown,
    faCaretLeft,
    faCaretRight,
    faCheck,
    faHandshake,
    faUsers,
    faQrcode,
    faGear,
    faCircleQuestion,
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

config.autoAddCss = false

library.add(faCaretUp, faCaretDown, faCaretLeft, faCaretRight, faCheck, faHandshake, faUsers, faQrcode, faGear, faCircleQuestion, faPlusCircle)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})