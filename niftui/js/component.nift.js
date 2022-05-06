class NiftComponent extends NiftNode {

    constructor(props = [], parent = 'default') {
        super();

        if (parent == 'default')
            parent = document.getElementById("niftBody");

        this.parent = parent;
        
        this.selfBackdrop = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        
        this.backdropProps = [];
        this.selfBackdrop.setAttribute("niftType", "backfall");
        
        this.self = false;
        this.selfOutput = false;
        this.selfDOM = false;
        this.props = props;
        this.renderedProps = [];

        this.childs = [];
        this.ready = false;

        this.error = false;
    }

    // When It's Render chance comes
    BeforRendering = () => { }

    // When Rendered
    AfterRendering = () => { }

    // Stylize Backdrop
    stylizeBackdrop = () => {
        this.selfBackdrop.setAttribute("fill", "transparent");
    }

    getChilds = (domChilderns) => {

        for (const key in domChilderns) {
            if (Object.hasOwnProperty.call(domChilderns, key)) {
                const child = domChilderns[key];
                let childComponentName = GetDictionaryName(child.tagName);
                if(childComponentName == undefined)
                {
                    return NiftErrorHandler(`Undefined tag ${child.tagName} called.`);
                }

                let childProps = [];

                // Map DOM attributes to Nift Props.
                for (const key in child.attributes) {
                    if (Object.hasOwnProperty.call(child.attributes, key)) {
                        const element = child.attributes[key];
                        childProps.push(new NiftProperty(element.nodeName, element.nodeValue));
                    }
                }

                this.childs.push(new (eval(childComponentName))(childProps)); 
                this.childs[this.childs.length-1].ready = true;
                // this.childs[this.childs.length-1].innerText = child.innerText;
            }
        }

    }

    setProperty = (name, value) => {
        this.props.push(new NiftProperty(name, value));
        this.updateInners();
    }

    getProperty = (name) => {
        let res = undefined;
        this.self.renderedProps.map(prop => {
            if(prop.name == name && prop.toRemove == false)     // toRemove(deleted) Barrier
                res = prop.value;
        });
        return res;
    }

    removeProperty = (name) => {
        let index = -1;
        this.props.map(prop => {
            if(prop.name == name && index == -1)
            {
                prop.toRemove = true;
                index = 0;
            }
        });
        this.updateInners();
    }

    mapDOMAttributesToNiftProps = (domAttrs) => {
        let props = [];
        
        for (const key in domAttrs) {
            if (Object.hasOwnProperty.call(domAttrs, key)) {
                const node = domAttrs.attributes[key];
                props.push(new NiftProperty(node.nodeName, node.nodeValue));
            }
        }

        return props;
    }

    updateBackdropAreaCapture = (points) => {
        this.selfBackdrop.setAttribute("points", points);
    }

    innerRender = () => {

        if(!this.ready)
        {
            // Parse the Doc
            this.selfDOM = GetDOMObjectFromString(this.render());

            // Get Component Name from Dictionary
            let componentName = GetDictionaryName(this.selfDOM.tagName);
            if(componentName == undefined)
            {
                return NiftErrorHandler(`Undefined tag ${this.selfDOM.tagName} called.`);
            }

            // Map DOM attributes to Nift Props.
            for (const key in this.selfDOM.attributes) {
                if (Object.hasOwnProperty.call(this.selfDOM.attributes, key)) {
                    const element = this.selfDOM.attributes[key];
                    this.props.push(new NiftProperty(element.nodeName, element.nodeValue));
                }
            }

            this.self = new (eval(componentName))(this.props);
            this.self.render();
            
            // Currently: level 1 is only supported yet.
            this.getChilds(this.selfDOM.children);
        }

        let renderedChilds = this.childs.map(child => {
            child.render();
            child.BeforRendering();
            child.AfterRendering();
            let res = child.innerRender();
            child.updateInners();
            return res;
        });

        // this.ready is id of parent

        this.stylizeBackdrop();

        let returnable = new NiftNode();
        if(!this.ready)
            returnable.selfOut = this.self.selfOutput;
        else
            returnable.selfOut = this.selfOutput;
        
        returnable.selfOutBackdrop = this.selfBackdrop;
        returnable.selfOutChilds = renderedChilds;

        return returnable;
    }

    updateInners = () => {
        if(!this.ready)
        {
            this.self.render();
            this.updateBackdropAreaCapture(this.self.rectArea.pointsString);
        }
        else
        {
            this.render();
            this.updateBackdropAreaCapture(this.rectArea.pointsString);
        }
    }

};

class NiftRect
{
    constructor(x=0, y=0, w=0, h=0)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.pointsString = '';
        this.points = [
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
    }

    buildPolygonPoints = () => {
        this.points = [
            {
                x: this.x,
                y: this.y
            },
            {
                x: this.w,
                y: this.y
            },
            {
                x: this.w,
                y: this.h
            },
            {
                x: this.x,
                y: this.h
            }
        ];

        return this.points;
    }

    getPointsString = () => {
        this.pointsString = this.points.reduce((str, p) => {
            return str + parseInt(p.x) + ',' + parseInt(p.y) + ' ';
        }, '');

        return this.pointsString;
    }
}

class NiftText extends NiftComponent
{
    constructor(props = [])
    {
        super(props);
        this.yet = false;
        this.rectArea = new NiftRect;
        this.textContent = '';
        this.create();
    }

    propertyWorker = (prop = new NiftProperty) => {

        let newName = prop.name;
        let newValue = prop.value;

        switch (prop.name) {
            case 'x':
                this.rectArea.x = parseInt(prop.value);
                newName = 'points';
                break;
            case 'y':
                this.rectArea.y = parseInt(prop.value);
                newName = 'points';
                break;
            case 'width':
                this.rectArea.w = parseInt(prop.value);
                newName = 'points';
                break;
            case 'height':
                this.rectArea.h = parseInt(prop.value);
                newName = 'points';
                break;
            case 'content':
                newName = 'content';
                this.textContent = prop.value;
                break;
            default:
                break;
        }

        if(newName == 'points')
        {
            this.rectArea.buildPolygonPoints();
            newValue = this.rectArea.getPointsString();
        }
        else if(newName == 'content')
        {
            newValue = this.textContent;
        }

        let index = -1;
        let i = 0;
        this.renderedProps.map(pr => {
            if(pr.name == newName)
            {
                pr.value = newValue;
                pr.toRemove = prop.toRemove;
                index = i;
            }
            i++;
        });

        if(newName == 'points')
        {
            if(prop.name == 'x' || prop.name == 'y')
            {
                if(index == -1)
                {
                    this.renderedProps.push(new NiftProperty(prop.name, parseInt(prop.value), prop.toRemove));
                    return this.renderedProps[this.renderedProps.length-1];
                }
                else
                {
                    return this.renderedProps[index];
                }
            }
            return false;
        }
        else
        {
            if(index == -1)
            {
                this.renderedProps.push(new NiftProperty(newName, newValue, prop.toRemove));
                return this.renderedProps[this.renderedProps.length-1];
            }
            else
            {
                return this.renderedProps[index];
            }
        }

    }

    update = () => {
        let i = 0;
        this.props.map(prop => {
            let newProp = this.propertyWorker(prop);
            if(newProp)
            {
                if(!newProp.toRemove)
                    this.selfOutput.setAttribute(newProp.name, newProp.value);
                else
                {
                    this.selfOutput.removeAttribute(newProp.name);
                    this.props.splice(i, 1);
                }
                i++;
            }
        });

        this.selfOutput.textContent = this.textContent;
    }

    create = () => {
        this.selfOutput = document.createElementNS("http://www.w3.org/2000/svg", "text");
    }

    render = () => {
        if(this.yet)
        {
            this.update();
        }
        else
        {
            this.create();
            this.update();
            this.yet = true;
        }
    }
}

class NiftBlock extends NiftComponent
{

    constructor(props = [])
    {
        super(props);
        this.yet = false;
        this.rectArea = new NiftRect;
        this.create();
    }

    propertyWorker = (prop = new NiftProperty) => {

        let newName = prop.name;
        let newValue = prop.value;

        switch (prop.name) {
            case 'x':
                this.rectArea.x = parseInt(prop.value);
                newName = 'points';
                break;
            case 'y':
                this.rectArea.y = parseInt(prop.value);
                newName = 'points';
                break;
            case 'width':
                this.rectArea.w = parseInt(prop.value);
                newName = 'points';
                break;
            case 'height':
                this.rectArea.h = parseInt(prop.value);
                newName = 'points';
                break;
            default:
                break;
        }

        if(newName == 'points')
        {
            this.rectArea.buildPolygonPoints();
            newValue = this.rectArea.getPointsString();
        }

        let index = -1;
        let i = 0;
        this.renderedProps.map(pr => {
            if(pr.name == newName)
            {
                pr.value = newValue;
                pr.toRemove = prop.toRemove;
                index = i;
            }
            i++;
        });

        if(index == -1)
        {
            this.renderedProps.push(new NiftProperty(newName, newValue, prop.toRemove));
            return this.renderedProps[this.renderedProps.length-1];
        }
        else
        {
            return this.renderedProps[index];
        }
    }

    update = () => {
        let i = 0;
        this.props.map(prop => {
            let newProp = this.propertyWorker(prop);
            if(!newProp.toRemove)
                this.selfOutput.setAttribute(newProp.name, newProp.value);
            else
            {
                this.selfOutput.removeAttribute(newProp.name);
                this.props.splice(i, 1);
            }
            i++;
        });
    }

    create = () => {
        this.selfOutput = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    }

    render = () => {

        if(this.yet)
        {
            this.update();
        }
        else
        {
            this.create();
            this.update();
            this.yet = true;
        }
    }

};