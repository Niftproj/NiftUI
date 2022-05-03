const NIFT_UI_SUPPORT_VERSION = '0.1';
const NIFT_UI_VERSION = '0.1';

const getCurrentRoute = () => {
    return '/';
}

class NiftInstance
{
    constructor(parent = 'default')
    {
        if(parent == 'default')
            parent = document.getElementById("niftBody");

        this.parent = parent;
        this.routes = false;
        this.niftarea = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.niftarea.setAttribute("niftver", NIFT_UI_VERSION);
        this.niftarea.setAttribute("niftsupport", NIFT_UI_SUPPORT_VERSION);
        this.parent.appendChild(this.niftarea);
    }

    initialize = (routes) => {
        this.routes = routes;
    }

    renderElement = (element = new NiftComponent) => {
        // this.niftarea.appendChild(element.render());
        this.niftarea.innerHTML = (element.innerRender());
    }

    compile = () => {

        this.routes.map(route => {
            if(route.getPath() == getCurrentRoute())
            {
                this.renderElement(route.setupAndRender());
                return;
            }
        })

    }
}

class NiftRoute
{
    constructor(path, component)
    {
        this.path = path;
        this.component = component;
    }

    getPath = () =>
    {
        return this.path;
    }

    setupAndRender = () => {
        return this.component;
    }
}

class NiftComponent
{

    constructor(parent = 'default')
    {
        if(parent == 'default')
            parent = document.getElementById("niftBody");

        this.parent = parent;
        // this.self = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.selfDOM = false;
    }

    // When It's Render chance comes
    BeforRendering = () => {}

    // When Rendered
    AfterRendering = () => {}

    render = () => {}

    innerRender = () => {
        // let dom = new DOMParser();
        // this.selfDOM = dom.parseFromString(this.render, "text/html");
        // console.log(this.selfDOM)
        return this.render();
    }

};