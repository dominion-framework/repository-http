const ApiFactory                = require("api-declaration");
const RepositoryPrototype       = require("./repositoryPrototype");

class Repositories {
    static create(modelName, baseUrl, apiDefinition) {
        const className = "Repository" + modelName[0].toUpperCase() + modelName.slice(1);
        const Repository = {
            [className]: class extends RepositoryPrototype {
                constructor() {
                    super();
                    this.__model__ = modelName;
                    this.api = (new ApiFactory(baseUrl, apiDefinition))[this.__model__];
                }
            }
        }[className];

        return (new Repository()).api;
    }
}


module.exports = Repositories;
