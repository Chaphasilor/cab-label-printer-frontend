export default class Router {

  constructor(state, routesObject) {
    this.state = state
    console.log(`routesObject:`, routesObject)
    this.routes = routesObject
  }

  routeToName(route) {
    return route.toLowerCase().replace(/[\s_]/g, `-`)
  }

  nameToRoute(name) {
    return Object.entries(this.routes).find(([key, value]) => value.toLowerCase().replace(/[\s_]/g, `-`) === name)[0]
  }
  
  restore() {
    const hash = window.location.hash
    if (hash) {
      console.log(`this.routes:`, this.routes)
      const tab = Object.values(this.routes).find(tab => this.routeToName(tab) === hash.slice(1))
      if (tab) {
        this.state.nav = tab
      }
    }
  }

  to(tab) {
    window.location.hash = this.routeToName(tab)
    this.state.nav = tab
  }

}
