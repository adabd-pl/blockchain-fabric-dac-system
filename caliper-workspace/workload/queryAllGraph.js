

'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const helper = require('./helper');

/**
 * Workload module for the benchmark round.
 */
class QueryAllGraphWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        //TODO
        //Add init of private collections
    }

    async submitTransaction() {
      
        const request = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'queryGraph',
            invokerIdentity: 'User1',
           // contractArguments: ['Org1MSPPrivateCollection'],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(request);
    }

    async cleanupWorkloadModule() {
      
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new QueryAllGraphWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;


