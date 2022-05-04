class EasyPage extends NiftComponent
{
    constructor()
    {
        super();
    }

    render = () => {
        return (`
        
        <NiftParent onclick="Listener(this)" niftSkip="false" x="0" y="0" w="${window.outerWidth}" h="60" background="blue">
        </NiftParent>
        
        `);
    }
}