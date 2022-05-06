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

        this.mytext = (`
        
        <NiftBlock x="0" y="0" width="${window.outerWidth}" height="${window.outerHeight}" fill="#000">
        
            <NiftImage x="${(window.outerWidth/2)-120/2}" y="60" width="120" href="https://niftproj.github.io/NiftUI/docs/assets/brand.svg"></NiftImage>
            <NiftText x="${(window.outerWidth/2)-95/2}" y="${150+70}" content="Nift*UI" fill="#fff" style="font-size: 30px; font-family: sans-serif;"></NiftText>
            <NiftText x="${(window.outerWidth/2)-250}" y="${150+70+30+20}" content="Fully Featured Frontend framework based on Vector Graphics." fill="rgba(255,255,255,0.7)" style="font-size: 18px; font-family: sans-serif;"></NiftText>

            <NiftBlock x="${(window.outerWidth/2)-250}" y="${150+70+30+20+20}" width="${(window.outerWidth/2)-250+500}" height="${150+70+30+20+20+300}" fill="rgba(0,66,255,0.05)"></NiftBlock>

            <NiftText x="${(window.outerWidth/2)-250+20}" y="${150+70+30+20+20+20}" content=""></NiftText>

            </NiftBlock><NiftBlock x="0" y="0" width="${window.outerWidth}" height="${window.outerHeight}" fill="#000">
                
            <NiftImage x="${(window.outerWidth/2)-120/2}" y="60" width="120" href="https://niftproj.github.io/NiftUI/docs/assets/brand.svg"></NiftImage>
            <NiftText x="${(window.outerWidth/2)-95/2}" y="${150+70}" content="Nift*UI" fill="#fff" style="font-size: 30px; font-family: sans-serif;"></NiftText>
            <NiftText x="${(window.outerWidth/2)-250}" y="${150+70+30+20}" content="Fully Featured Frontend framework based on Vector Graphics." fill="rgba(255,255,255,0.7)" style="font-size: 18px; font-family: sans-serif;"></NiftText>

            <NiftBlock x="${(window.outerWidth/2)-250}" y="${150+70+30+20+20}" width="${(window.outerWidth/2)-250+500}" height="${150+70+30+20+20+300}" fill="rgba(0,66,255,0.05)"></NiftBlock>

            <NiftText x="${(window.outerWidth/2)-250+20}" y="${150+70+30+20+20+20}" content=""></NiftText>

        </NiftBlock>`);

    }

    AfterRendering = () => {
        // this.childs[4].setProperty("content", this.mytext);
    }

    render = () => {

        return (`
        
        <NiftBlock x="0" y="0" width="${window.outerWidth}" height="${window.outerHeight}" fill="#000">
        
            <NiftImage x="${(window.outerWidth/2)-120/2}" y="60" width="120" href="https://niftproj.github.io/NiftUI/docs/assets/brand.svg"></NiftImage>
            <NiftText x="${(window.outerWidth/2)-95/2}" y="${150+70}" content="Nift*UI" fill="#fff" style="font-size: 30px; font-family: sans-serif;"></NiftText>
            <NiftText x="${(window.outerWidth/2)-250}" y="${150+70+30+20}" content="Fully Featured Frontend framework based on Vector Graphics." fill="rgba(255,255,255,0.7)" style="font-size: 18px; font-family: sans-serif;"></NiftText>

            <NiftBlock x="${(window.outerWidth/2)-250}" y="${150+70+30+20+20}" width="${(window.outerWidth/2)-250+500}" height="${150+70+30+20+20+300}" fill="rgba(0,66,255,0.05)"></NiftBlock>

            <NiftText x="${(window.outerWidth/2)-60}" y="${150+70+30+20+20+40}" fill="rgba(255,255,255,1)" style="font-size: 16px; font-family: sans-serif; font-weight: 600;" content="A Nift* Project."></NiftText>

        </NiftBlock>

        `);

    }
}

export {
    FtLandingPage
};