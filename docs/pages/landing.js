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
        this.setProperty("hello", "yes!");
        this.setProperty("after", "it is after render a time!");
        this.setProperty("fill", "royalblue");
        this.removeProperty("hello");
        this.removeProperty("after");
        console.log(this.getProperty("fill"));
        this.setProperty("hello", "yes!");
        console.log(this.getProperty("hello"));
        this.removeProperty("hello");
        console.log(this.getProperty("hello"));

        this.childs[0].setProperty("fill", "green");
        this.childs[1].setProperty("fill", "blue");
    }

    render = () => {

        // return (`
        
        // <NiftParent onclick="Listener(this)" niftSkip="false" x="0" y="0" w="${window.innerWidth}" h="60" background="${this.navigationColor}">
        //     <Heading fontsize=${80}>I am Rendered by Nift*UI: ${this.navigationText}.</Heading>
        //     <text niftSkip="true">${this.navigationText}</text>
        // </NiftParent>
        
        // `);
        return (`
            <NiftBlock niftName="iamparent" x="50" y="50" width="250" height="250">
                <!--<Child>
                    <Subchild></Subchild>
                </Child>-->
                <NiftBlock niftName="iamchild" x="10" y="20" width="300" height="40"></NiftBlock>
                <NiftBlock niftName="iamchild2" x="102" y="210" width="600" height="10"></NiftBlock>
            </NiftBlock>
            <NiftBlock x="80" y="160" width="100" height="300"></NiftBlock>
        `);
    }

}