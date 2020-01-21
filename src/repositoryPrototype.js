const fetch                     = require("node-fetch");


globalThis.fetch = globalThis.fetch || fetch;

module.exports = class Repository {

    find (criteria, offset, limit, order) {
        const args = {};
        offset && (args["offset"] = offset);
        limit && (args["limit"] = limit);
        order && (args["order"] = order);

        return this.api.get(Object.assign(criteria, args));
    }

    save (model) {
        let primaryKey = Object.entries(this.factory.__model__.prototype.scheme).find(([keyName, property]) => property.isPrimaryKey);
        if(!primaryKey) {
            throw new Error("Can not save model without primary key.");
        }
        primaryKey = primaryKey[0];

        return this.api[model.__unsaved__? "post" : "put"]({[primaryKey]:model.id}, model.__properties__)
            .then(result => model.populate(result));
    }

    remove (model) {
        let primaryKey = Object.entries(this.factory.__model__.prototype.scheme).find(([keyName, property]) => property.isPrimaryKey);
        if(!primaryKey) {
            throw new Error("Can not remove model without primary key.");
        }
        primaryKey = primaryKey[0];

        return this.api.delete({[primaryKey]:model.id}, model.__properties__);
    }
};
