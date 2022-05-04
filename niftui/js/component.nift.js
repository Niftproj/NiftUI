class NiftComponent extends NiftNode {

    constructor(props = [], parent = 'default') {
        super();

        if (parent == 'default')
            parent = document.getElementById("niftBody");

        this.parent = parent;
        
        this.selfBackdrop = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.backdropProps = [];
        
        this.self = false;
        this.selfOutput = false;
        this.selfDOM = false;
        this.props = props;

        this.childs = [];

        this.error = false;
    }

    // When It's Render chance comes
    BeforRendering = () => { }

    // When Rendered
    AfterRendering = () => { }

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
            }
        }

    }

    setProperty = (name, value) => {
        this.props.push(new NiftProperty(name, value));
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

    innerRender = () => {

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

        let returnable = new NiftNode();
        returnable.selfOut = this.self.selfOutput;
        returnable.selfOutBackdrop = this.selfBackdrop;
        returnable.selfOutChilds = false;

        return returnable;
    }

    updateInners = () => {
        this.self.render();
    }

};

class NiftBlock extends NiftComponent
{

    constructor(props = [])
    {
        super(props);
        this.yet = false;
        this.create();
    }

    update = () => {
        this.props.map(prop => {
            this.selfOutput.setAttribute(prop.name, prop.value);
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