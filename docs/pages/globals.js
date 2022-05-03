class gHeader extends NiftComponent
{

    constructor(pageTitle, background) {
        super();
        this.pagetitle = pageTitle;
        this.background = background;
    }
    
    BeforRendering = () => {
        document.title = this.pagetitle;
    }

    render = () => {
        return (`
        
            <NiftParent x="0" y="0" w="${window.outerWidth}" h="60" background="${this.background}">
            </NiftParent>

        `);
    }

};

class gFooter extends NiftComponent
{

    constructor(background) {
        super();
        this.background = background;
    }

    render = () => {
        return (`
        
            <NiftParent x="0" y="100" w="${window.outerWidth}" h="160" background="${this.background}">
            </NiftParent>

        `);
    }

};