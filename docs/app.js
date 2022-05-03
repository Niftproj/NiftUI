const niftyNift = new NiftInstance();
const landingRoute = new NiftRoute('/', new LandingPage);
let arr = [landingRoute];
niftyNift.initialize(arr)
niftyNift.compile();