class NiftComponent extends NiftNode {

    constructor(parent = 'default') {
        super();

        if (parent == 'default')
            parent = document.getElementById("niftBody");

        this.parent = parent;
        this.self = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.props = [];
        this.childs = [];
        this.selfDOM = false;
    }

    // When It's Render chance comes
    BeforRendering = () => { }

    // When Rendered
    AfterRendering = () => { }

    render = () => { }

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
        let x = 0, y = 0, w = x + 0, h = y + 0;
        let rawSvg = false;
        this.props.map(prop => {
            if (prop.name == 'x') {
                x = parseInt(prop.value);
            }
            else if (prop.name == 'y') {
                y = parseInt(prop.value);
            }
            else if (prop.name == 'w') {
                w = parseInt(prop.value);
            }
            else if (prop.name == 'h') {
                h = parseInt(prop.value);
            }
            else if (prop.name == 'background') {
                this.self.setAttribute("fill", prop.value);
            }
            else if (prop.name == 'niftskip') {
                if (prop.value == 'true')
                    rawSvg = true;
            }
            else {
                this.self.setAttribute(prop.name, prop.value);
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

        if (rawSvg == true) {
            return this.selfDOM;
        }
        return this.self;
    }

};
