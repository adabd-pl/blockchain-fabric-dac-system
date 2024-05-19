'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const srcs = [''];
const dests = [''];
const perms = ['01001', '00111', '00111', '01110', '00001', '10111'];

/**
 * Workload module for the benchmark round.
 */
class CreateEdgeWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        //TODO
        //Add init of private collections
    }
    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex++;
        //let id = 'E' + this.txIndex.toString();
        let src = srcs[Math.floor(Math.random() * srcs.length)];
        let dest = dests[Math.floor(Math.random() * dests.length)];
        let perm = perms[Math.floor(Math.random() * perms.length)];
      
        let args = {
            contractId: this.roundArguments.contractId,
            invokerIdentity: 'User1',
            contractFunction: 'createEdgeInPrivate',
            contractArguments: [src, dest, perm, 'Org1Org2MSPPrivateCollection' ],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(args);
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new CreateEdgeWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
