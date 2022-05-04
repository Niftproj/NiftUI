class LandingPage extends NiftComponent
{

    constructor(navigationText)
    {
        super();    // IMPORTANT

        this.navigationText = navigationText;
    }

    BeforRendering = () => {
        this.navigationColor = "#00B432";
    }

    render = () => {

        // TESTING
        // let tag = "NiftBlock";
        // let rendered = new (eval(tag))(0,2,4,8);
        // console.log(rendered);

        // return (`
        
        // <NiftParent onclick="Listener(this)" niftSkip="false" x="0" y="0" w="${window.innerWidth}" h="60" background="${this.navigationColor}">
        //     <Heading fontsize=${80}>I am Rendered by Nift*UI: ${this.navigationText}.</Heading>
        //     <text niftSkip="true">${this.navigationText}</text>
        // </NiftParent>
        
        // `);
        return (`
            <NiftBlockA x="100" y="200"></NiftBlockA>
        `);
    }

}