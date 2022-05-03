const NIFT_UI_SUPPORT_VERSION = 'ZERO_ONE';
const NIFT_UI_VERSION = '0.1';
const NIFT_CANVAS_ID = "niftCanvas"+NIFT_UI_SUPPORT_VERSION;

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
        this.niftarea.setAttribute("data-niftver", NIFT_UI_VERSION);
        this.niftarea.setAttribute("data-niftsupport", NIFT_UI_SUPPORT_VERSION);
        this.niftarea.setAttribute("id", NIFT_CANVAS_ID);
        this.niftarea.setAttribute("x", 0);
        this.niftarea.setAttribute("y", 0);
        this.parent.appendChild(this.niftarea);
        this.updateOn = 'mousevent';
    }

    initialize = (routes) => {
        this.routes = routes;
    }

    renderElement = (element = new NiftComponent) => {
        // this.niftarea.appendChild(element.self);
        element.BeforRendering();
        this.niftarea.appendChild(element.innerRender());
        element.AfterRendering();
        // this.niftarea.innerHTML = (element.innerRender());
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

class NiftProperty
{

    constructor(name, value)
    {
        this.name = name;
        this.value = value;
    }

}

class NiftNode
{
    constructor()
    {
        this.parent = 'default';
        this.self = false;
        this.selfDOM = false;
    }
};

class NiftComponent extends NiftNode
{

    constructor(parent = 'default')
    {
        super();

        if(parent == 'default')
            parent = document.getElementById("niftBody");

        this.parent = parent;
        this.self = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.props = [];
        this.childs = [];
        this.selfDOM = false;
    }

    // When It's Render chance comes
    BeforRendering = () => {}

    // When Rendered
    AfterRendering = () => {}

    render = () => {}

    innerRender = () => {

        let dom = new DOMParser();
        this.selfDOM = dom.parseFromString(this.render(), "text/html").all[3];

        for (const key in this.selfDOM.attributes) {
            if (Object.hasOwnProperty.call(this.selfDOM.attributes, key)) {
                const element = this.selfDOM.attributes[key];
                this.props.push(new NiftProperty(element.nodeName, element.nodeValue));
            }
        }
        
        // console.log(this.selfDOM)

        // Set Points
        let x = 0, y = 0, w = x+0, h = y+0;
        let rawSvg = false;
        this.props.map(prop => {
            if(prop.name == 'x')
            {
                x = parseInt(prop.value);
            }
            else if(prop.name == 'y')
            {
                y = parseInt(prop.value);
            }
            else if(prop.name == 'w')
            {
                w = parseInt(prop.value);
            }
            else if(prop.name == 'h')
            {
                h = parseInt(prop.value);
            }
            else if(prop.name == 'background')
            {
                this.self.setAttribute("fill", prop.value);
            }
            else if(prop.name == 'niftskip')
            {
                if(prop.value == 'true')
                    rawSvg = true;
            }
        });

        w += x;
        h += y;

        let points = [
            {
                x: x,
                y: y
            },
            {
                x: w,
                y: y
            },
            {
                x: w,
                y: h
            },
            {
                x: x,
                y: h
            }
        ];

        let pointsString = points.reduce((string, point) => {
            return string + parseInt(point.x) + "," + parseInt(point.y) + " ";
        }, "");

        this.self.setAttribute("points", pointsString);

        if(rawSvg == true)
        {
            return this.selfDOM;
        }
        return this.self;
    }

};