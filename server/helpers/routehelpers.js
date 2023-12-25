function isACtiveRoute(route, currentRoute) {
    return route === currentRoute? "active" : "";
}

module.exports = {isACtiveRoute};