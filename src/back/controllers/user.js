'use strict';

const restify = require('../utils/restify');
const Models = require('../models');

Object.assign(exports, restify.restify(Models.User));
