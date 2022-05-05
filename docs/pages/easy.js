import {NiftAsModule,
    NiftNode,
    NiftRoute,
    NiftProperty,
    NiftComponent,
    NiftInstance} from '../../build/js/niftui.all.min.js'

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

function CompileEasyPage() {
    const niftEngine = new NiftInstance();
    niftEngine.renderElement(new EasyPage("Undef"));
}

export {CompileEasyPage, EasyPage};