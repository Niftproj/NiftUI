const niftyNift = new NiftInstance();
const landingRoute = new NiftRoute('/', new LandingPage("Hello"));
const landingRoute2 = new NiftRoute('/index.html', new LandingPage("Hello"));
const shapesRoute = new NiftRoute('/shapes.html', new ShapesPage("Hello"));
let routesArray = [landingRoute, landingRoute2, shapesRoute];
niftyNift.initialize(routesArray)
niftyNift.compile();