/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const PermissionGraph = require('./lib/permission-graph');

module.exports.PermissionGraph = PermissionGraph;
module.exports.contracts = [ PermissionGraph ];
