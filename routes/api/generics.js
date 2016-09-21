/**
 * Created by ayoung on 08/09/16.
 */
"use strict";
var format = require('string-format');
var conn = require('./../../db/queryDB');

var GENERICS = {admin:{}, user:{}, unprotected:{}};



GENERICS.unprotected.getAll = function (tableName, authorisedCheck) {
    return function (req, res) {
        var sql = format("SELECT * FROM {}", tableName);
        conn.queryDB(sql)
            .then(function (data) {
                return res.json({
                    data: data.results,
                    success: true,
                    message: format("select from {} successful", tableName)
                });
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    }
};



GENERICS.unprotected.getOne = function (tableName, authorisedCheck) {
    return function (req, res) {
        var id = req.params.id;
        var sql = format("SELECT * FROM {} WHERE id = {}", tableName, id);
        conn.queryDB(sql)
            .then(function (data) {
                if (data.results.length == 0) {
                    res.status(200).json({data:[], success: false, message:"0 results found"});
                }
                return res.json({
                    data: data.results,
                    success: true,
                    message: format("select specific from {} successful")
                });
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        })
    }
};

GENERICS.user.getAll = function (tableName, authorisedCheck) {
    return function (req, res) {
        if (!req.isAuthenticated())
            return res.status(403).json({success: false, data: reason});
        var sql = format("SELECT * FROM {} WHERE accountid={}", tableName, req.user.accountid);
        conn.queryDB(sql)
            .then(function (data) {
                return res.json({
                    data: data.results,
                    success: true,
                    message: format("select from {} successful", tableName)
                });
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        });
    }
};


GENERICS.user.getOne = function (tableName, authorisedCheck) {
    return function (req, res) {
        if (!req.isAuthenticated())
            return res.status(403).json({success: false, data: "unauthorised assess"});
        var id = req.params.id;
        var sql = format("SELECT * FROM {} WHERE id={} AND accountid={}", tableName, id, req.user.accountid);
        conn.queryDB(sql)
            .then(function (data) {
                if (data.results.length == 0) {
                    res.status(200).json({
                        data: data.results,
                        success: true,
                        message: format("unable to find specific from {} successful", tableName)
                    });
                }
                return res.status(200).json({
                    data: data.results,
                    success: true,
                    message: format("select specific from {} successful", tableName)
                });
            }).catch(function (reason) {
            return res.status(500).json({success: false, data: reason});
        })
    }
};


function genericDelete(req, res, tableName){
    if (tableName != "account" && !req.isAuthenticated())
        return res.status(403).json({success: false, data: reason});
    var id = req.params.id;
    var sql = format("DELETE FROM {} WHERE id={} RETURNING *", tableName, id);
    conn.queryDB(sql)
        .then(function (data) {
            return res.json({
                data: data.results,
                success: true,
                message: format("delete from {} successful", tableName)
            });
        }).catch(function (reason) {
        return res.status(500).json({success: false, data: reason});
    })
}

GENERICS.user.delete = function (tableName, authorisedCheck) {
    return function (req, res){
        if (!req.isAuthenticated()) {
            return res.status(403).json({success: false, data: "not Authorised"});
        }
        return genericDelete(req, res, tableName)
    };
};


GENERICS.admin.delete = function (tableName, authorisedCheck) {
    return function (req, res){
        if (!req.isAuthenticated() || !req.user.admin) {
            return res.status(403).json({success: false, data: "not Authorised"});
        }
        return genericDelete(req, res, tableName)
    };
};

function genericCreate(req, res, tableName){
    if (tableName != "account" && !req.isAuthenticated()) {
        return res.status(403).json({success: false, data: "not Authorised"});
    }
    var data = req.body;

    if(tableName=="betcase" || tableName=="bookie_account"){
        data.accountid=req.user.accountid;
    }

    var columnValues = [];
    var columnNames = Object.keys(req.body);
    for (var idx in columnNames) {
        columnValues.push("'" + data[columnNames[idx]] + "'")
    }
    var sql = "INSERT INTO " + tableName + "(" + columnNames.toString() + ") values(" + columnValues.toString() + ") RETURNING *";
    conn.queryDB(sql)
        .then(function (data) {
            return res.status(201).json({
                data: data.results,
                success: true,
                message: format("create in {} successful", tableName)
            });
        }).catch(function (reason) {
        return res.status(500).json({success: false, data: reason});
    });
}

GENERICS.user.create = function (tableName, authorisedCheck) {
    return function (req, res) {
        if (!req.isAuthenticated()) {
            return res.status(403).json({success: false, data: "not Authorised"});
        }
        return genericCreate(req, res, tableName)
    }
};


GENERICS.admin.create = function (tableName, authorisedCheck) {
    return function (req, res) {
        if (!req.user.admin || !req.isAuthenticated()) {
            return res.status(403).json({success: false, data: "not Admin"});
        }
        return genericCreate(req, res, tableName);
    };
};

function genericUpdate(req, res, tableName){
    var data = req.body;
    var setList = [];
    for (var colName in data) {
        if(typeof(data[colName])!=="object") {
            setList.push(colName + "='" + data[colName] + "'")
        }else{
            setList.push(colName +" = " + colName + " || '" +  JSON.stringify(data[colName]) + "'");
        }
    }
    var updateSQL = format("UPDATE {} SET {} WHERE id={} RETURNING *", tableName, setList, req.params.id);
    conn.queryDB(updateSQL)
        .then(function (data) {
            return res.status(200).json({
                data: data.results,
                success: true,
                message: format("update in {} successful", tableName)
            });
        }).catch(function (reason) {
        return res.status(500).json({success: false, data: reason});
    });
}


GENERICS.user.update = function(tableName, authorisedCheck) {
    return function (req, res) {
        if (!req.isAuthenticated()) {
            return res.status(403).json({success: false, data: "not Authorised"});
        }
        return genericUpdate(req, res, tableName);
    };
};

GENERICS.admin.update = function(tableName, authorisedCheck) {
    return function (req, res) {
        if (!req.isAuthenticated() || !req.user.admin) {
            return res.status(403).json({success: false, data: "not Authorised"});
        }
        return genericUpdate(req, res, tableName);
    };
}


module.exports = GENERICS;