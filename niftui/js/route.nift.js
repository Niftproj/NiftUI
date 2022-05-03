class NiftRoute {
    constructor(path, component) {
        this.path = path;
        this.component = component;
    }

    getPath = () => {
        return this.path;
    }

    setupAndRender = () => {
        return this.component;
    }
}
