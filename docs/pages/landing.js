class LandingPage extends NiftComponent
{

    render = () => {
        return (`
        
        <NiftParent x="0" y="0" w="300" h="30" background="blue">
            <Heading fontsize=${80}>I am Rendered by Nift*UI.</Heading>
        </NiftParent>
        
        `);
    }

}