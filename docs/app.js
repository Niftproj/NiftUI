const niftyNift = new NiftInstance();
const landingRoute = new NiftRoute('/docs/', new LandingPage("Hello"));
const landingRoute2 = new NiftRoute('/docs/index.html', new LandingPage("Hello"));
const shapesRoute = new NiftRoute('/docs/shapes.html', new ShapesPage("Hello"));
let routesArray = [landingRoute, landingRoute2, shapesRoute];
niftyNift.initialize(routesArray)
niftyNift.compile();

function Listener(e) {
    console.log(e)
}