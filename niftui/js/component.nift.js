class NiftComponent extends NiftNode {

    constructor(props = [], parent = 'default') {
        super();

        if (parent == 'default')
            parent = document.getElementById("niftBody");

        this.parent = parent;
        
        this.selfBackdrop = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.backdropProps = [];
        
        this.self = false;
        this.selfDOM = false;
        this.props = props;

        this.childs = [];
    }

    // When It's Render chance comes
    BeforRendering = () => { }

    // When Rendered
    AfterRendering = () => { }

    render = () => { }

    innerRender = () => {

        // Parse the Doc
        this.selfDOM = GetDOMObjectFromString(this.render());

        // Get Component Name from Dictionary
        let componentName = Component[this.selfDOM.tagName];
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
        console.log(this.self)

        return false;
    }

};

class NiftBlock extends NiftComponent
{

    constructor(props = [])
    {
        super(props);
        this.self = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    }

    update = () => {
        
        this.props.map(prop => {
            this.self.setAttribute(prop.name, prop.value);
        });

    }

    render = () => {
        this.update();
    }

};