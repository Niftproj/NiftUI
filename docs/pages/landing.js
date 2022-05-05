function OO() {
    console.log("hhh")
}

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

    AfterRendering = () => {
        // this.setProperty("hello", "yes!");
        // this.setProperty("after", "it is after render a time!");
        this.setProperty("fill", "royalblue");
        // this.removeProperty("hello");
        // this.removeProperty("after");
        // console.log(this.getProperty("fill"));
        // this.setProperty("hello", "yes!");
        // console.log(this.getProperty("hello"));
        // this.removeProperty("hello");
        // console.log(this.getProperty("hello"));

        // this.childs[0].setProperty("fill", "green");
        // this.childs[1].setProperty("fill", "blue");
    }

    listenMe = () => {
        console.log("Icalled")
    }

    render = () => {

        // return (`
        
        // <NiftParent onclick="Listener(this)" niftSkip="false" x="0" y="0" w="${window.innerWidth}" h="60" background="${this.navigationColor}">
        //     <Heading fontsize=${80}>I am Rendered by Nift*UI: ${this.navigationText}.</Heading>
        //     <text niftSkip="true">${this.navigationText}</text>
        // </NiftParent>
        // <NiftBlock niftName="iamparent" x="50" y="50" width="250" height="250">
        //         <!--<Child>
        //             <Subchild></Subchild>
        //         </Child>-->
        //         <NiftBlock niftName="iamchild" x="10" y="20" width="300" height="40"></NiftBlock>
        //         <NiftBlock niftName="iamchild2" x="102" y="210" width="600" height="10"></NiftBlock>
        //     </NiftBlock>
        //     <NiftBlock x="80" y="160" width="100" height="300"></NiftBlock>
        
        // `);
        
        /// TODO: fix height is inputed as end point
        /// TODO: fix click is not working because of backfall element is above on it
        return (`
            <NiftBlock niftName="iamparent" x="0" y="0" width="${window.outerWidth}" height="${window.outerHeight}" fill="${this.navigationColor}">
                <NiftBlock onclick="OO()" x="0" y="0" width="${window.outerWidth}" height="60" fill="#ffffff"></NiftBlock>
                <NiftBlock x="0" y="60" width="${window.outerWidth}" height="120" fill="rgba(255,255,255,0.8)"></NiftBlock>
                <NiftBlock x="0" y="120" width="${window.outerWidth}" height="180" fill="rgba(255,255,255,0.6)"></NiftBlock>
                <NiftBlock x="0" y="180" width="${window.outerWidth}" height="240" fill="rgba(255,255,255,0.4)"></NiftBlock>
                <NiftBlock x="0" y="240" width="${window.outerWidth}" height="300" fill="rgba(255,255,255,0.2)"></NiftBlock>
                <NiftBlock x="0" y="300" width="${window.outerWidth}" height="360" fill="rgba(255,255,255,0)"></NiftBlock>
                <NiftBlock x="0" y="360" width="${window.outerWidth}" height="420" fill="rgba(0,0,0,0.2)"></NiftBlock>
                <NiftBlock x="0" y="420" width="${window.outerWidth}" height="480" fill="rgba(0,0,0,0.4)"></NiftBlock>
                <NiftBlock x="0" y="480" width="${window.outerWidth}" height="540" fill="rgba(0,0,0,0.6)"></NiftBlock>
                <NiftBlock x="0" y="540" width="${window.outerWidth}" height="600" fill="rgba(0,0,0,0.8)"></NiftBlock>
                <NiftBlock x="0" y="600" width="${window.outerWidth}" height="660" fill="rgba(0,0,0,1)"></NiftBlock>
            </NiftBlock>
        `);
    }

}