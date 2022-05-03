class LandingPage extends NiftComponent
{

    BeforRendering = () => {
        this.navigationColor = "#00B432";
    }

    render = () => {
        return (`
        
        <NiftParent x="0" y="0" w="${window.innerWidth}" h="60" background="${this.navigationColor}">
            <Heading fontsize=${80}>I am Rendered by Nift*UI.</Heading>
        </NiftParent>
        
        `);
    }

}