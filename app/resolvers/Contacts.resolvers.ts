import {Contacts} from "../models/Contacts.model.ts";
import DB from "../../utils/DB.ts";

const status500 : any = {
    status: 500,
    msg: "Internal Server Error"
};

// this is a table if in sql

const Model = DB.collection("contacts");

export default {
    Query : {
        findAll: async(root : any, args : any, context : any, info : any) => {
            const contacts : Contacts[] | [] | undefined = await Model.find({});
            return contacts;
        },
        findOne: async(root : any, args : any, context : any, info : any) => {
            if (!!args.input._id) {
                const contact : Contacts | undefined = await Model.findOne({
                    _id: {
                        $oid: args.input._id
                    }
                });
                return contact;
            }
        }
    },

    Contact : {
        _id: async(root : any) => {
            // because mongoDB return _id with $oid / object id
            return root._id.$oid;
        }
    },

    Mutation : {
        addOne: async(root : any, args : any, context : any, info : any) => {
            try {
                const {name, phone_number} = args.input;

                // to check phone_number exist
                const findPost = await Model.findOne({phone_number});
                if (!!findPost) {
                    return {status: 403, msg: "this number already in Contact"};
                } else {
                    await Model.insertOne({name, phone_number});
                }
            } catch (e) {
                return status500;
            }

            return {status: 201, msg: "Save it"};
        },

        edit: async(root : any, args : any, context : any, info : any) => {
            const {name, phone_number} = args.input;
            const id = args.input._id;

            try {
                const findPost = await Model.findOne({
                    _id: {
                        $oid: id
                    }
                });

                if (!!findPost) {
                    await Model.updateOne({
                        _id: {
                            $oid: id
                        }
                    }, {name, phone_number});

                } else {
                    return {status: 509, msg: "Can't Found the id"};
                }
            } catch (e) {
                console.log(e)
                return status500;
            }

            return {status: 204, msg: "Updated"};
        },

        delete: async(root : any, args : any, context : any, info : any) => {
            const id = args._id;
            try {
                const findPost = await Model.findOne({
                    _id: {
                        $oid: id
                    }
                });

                if (!!findPost) {
                    await Model.deleteOne({
                        _id: {
                            $oid: id
                        }
                    });
                } else {
                    return {status: 509, msg: "Can't Found the id"};
                }
            } catch (e) {
                return status500;
            }
            return {status: 204, msg: "Deleted"};
        }
    }
};
