class NiftInstance {
    constructor(parent = 'default') {
        if (parent == 'default')
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

        // @TODO: move component.selfBackdrop to another svg container above the self
    }

    initialize = (routes) => {
        this.routes = routes;
    }

    renderElement = (element = new NiftComponent) => {

        element.BeforRendering();

        let svgNode = element.innerRender();
        
        if(svgNode.selfOutChilds !== false)
        {
            svgNode.selfOutChilds.map(child => {
                // for tree view rendering (parent-child relationship)
                // svgNode.selfOut.appendChild(child.selfOut);
                // svgNode.selfOut.appendChild(child.selfOutBackdrop);

                // stand on own visibily but not.
                this.niftarea.appendChild(child.selfOut);
                this.niftarea.appendChild(child.selfOutBackdrop);
            });
        }

        if(svgNode.selfOut !== false)
            this.niftarea.appendChild(svgNode.selfOut);
        if(svgNode.selfOutBackdrop !== false)
            this.niftarea.appendChild(svgNode.selfOutBackdrop);

        element.AfterRendering();

    }
    
}
