class ShapesPage extends NiftComponent
{

    constructor(navigationText)
    {
        super();    // IMPORTANT

        this.navigationText = navigationText;
    }

    BeforRendering = () => {
        this.navigationColor = "#000";
    }

    render = () => {
        return (`
        
        <NiftParent niftSkip="false" x="0" y="0" w="${window.innerWidth/2}" h="60" background="${this.navigationColor}">
            <Heading fontsize=${80}>I am Rendered by Nift*UI: ${this.navigationText}.</Heading>
            <text niftSkip="true">${this.navigationText}</text>
        </NiftParent>
        
        `);
    }

}