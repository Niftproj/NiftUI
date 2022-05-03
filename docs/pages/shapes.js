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

    AfterRendering = () => {
        this.navigationColor = "#ccc";
    }

    render = () => {
        return (`
        
            <!--<circle niftSkip="true" stroke-width="1" stroke="rgba(0,0,0,0)" stroke-linejoin="round" fill="${this.navigationColor}" cx="205" cy="309" r="95"></circle>-->
            <NiftParent niftSkip="false" x="0" y="0" w="${window.innerWidth/2}" h="60" background="${this.navigationColor}">
                <Heading fontsize=${80}>I am Rendered by Nift*UI: ${this.navigationText}.</Heading>
                <text niftSkip="true">${this.navigationText}</text>
            </NiftParent>

        `);
    }

}