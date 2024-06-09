
'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');



const perms = ['01001', '00111', '00111', '01110', '00001', '10111'];
let txIndex = 0;
/**
 * Workload module for the benchmark round.
 */
class ChangePermissionWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }

    /**
     * Initialize the workload module with the given parameters.
     * @param {number} workerIndex The 0-based index of the worker instantiating the workload module.
     * @param {number} totalWorkers The total number of workers participating in the round.
     * @param {number} roundIndex The 0-based index of the currently executing round.
     * @param {Object} roundArguments The user-provided arguments for the round from the benchmark configuration file.
     * @param {BlockchainInterface} sutAdapter The adapter of the underlying SUT.
     * @param {Object} sutContext The custom context object provided by the SUT adapter.
     * @async
     */
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
       
        this.txIndex = 0;
       
           
   }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex = this.txIndex + 1;
        let newPerms = perms[Math.floor(Math.random() * perms.length)];
        let id = this.txIndex % 30;
      

        if ( id != 0 ){
            let edgeId =  id.toString(); 

        
            let args = {
                contractId: this.roundArguments.contractId,
                invokerIdentity: 'User1',
                contractFunction: 'changePermission',
                contractArguments: [ edgeId,  newPerms ],
                readOnly: false
            };

            await this.sutAdapter.sendRequests(args);
    }
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new ChangePermissionWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
