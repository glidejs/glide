import Core from './core'

class Transition {
    constructor() {
        this.jumping = false
    }

    /**
     * Gets value of transition.
     *
     * @param {String} property
     * @return {String}
     */
    get(property = 'all') {
        let settings = Core.settings

        if (! this.jumping) {
            return `${property} ${settings.animationDuration}ms ${settings.animationTimingFunc}`
        }

        return `${property} 0ms ${settings.animationTimingFunc}`
    }

    /**
     * Sets value of transition.
     *
     * @param {HTMLElement} el
     * @return {self}
     */
    set(el) {
        el.style.transition = this.get()

        return this
    }
}

export default new Transition()
