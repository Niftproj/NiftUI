import {NiftAsModule,
    NiftNode,
    NiftRoute,
    NiftProperty,
    NiftComponent,
    NiftInstance} from '../../build/js/niftui.all.min.js'


class FtLandingPage extends NiftComponent
{
    constructor()
    {
        super();
    }

    render = () => {

        return (`
        
        <NiftBlock x="0" y="0" width="${window.outerWidth}" height="${window.outerHeight}" fill="#000">
        

        
        </NiftBlock>

        `);

    }
}

export {
    FtLandingPage
};