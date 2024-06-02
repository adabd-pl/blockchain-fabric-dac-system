
'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const vertices = [ 'zone0:wyatt.feest' ,'zone1:saepe_aut' , 'zone1:rachelle.feest' , 'zone1:et_praesentium',  'zone1:Brian Turnpike'];
/**
 * Workload module for the benchmark round.
 */

const data = { 
    "vertices" : [ 
        {
        "id" : "zone2:AntwanField",
        "type" : "space"
      },{
        "id" : "zone2:coralie.williamson",
        "type" : "user"
      },  {
        "id" : "zone2:debera.moore",
        "type" : "user"
      }, {
        "id" : "zone2:margit.miller",
        "type" : "user"
      }, {
        "id" : "zone2:BrekkeGardens",
        "type" : "space"
      },{
        "id" : "zone0:wyatt.feest",
        "type" : "user"
      }, {
        "id" : "zone0:emory.skiles",
        "type" : "user"
      }, {
        "id" : "zone1:theola.gusikowski",
        "type" : "user"
      }, {
        "id" : "zone1:BrianTurnpike",
        "type" : "space"
      }, {
        "id" : "zone0:Murrayville",
        "type" : "provider"
      }, {
        "id" : "zone1:lyman.leuschke",
        "type" : "user"
      }, {
        "id" : "zone0:earle.bauch",
        "type" : "user"
      }, {
        "id" : "zone1:et_praesentium",
        "type" : "group"
      }, {
        "id" : "zone1:LakeJosiefort",
        "type" : "provider"
      }, {
        "id" : "zone1:lois.ohara",
        "type" : "user"
      }, {
        "id" : "zone1:saepe_aut",
        "type" : "group"
      }, {
        "id" : "zone1:IsaiasCape",
        "type" : "space"
      }, {
        "id" : "zone0:terrell.koch",
        "type" : "user"
      }, {
        "id" : "zone0:sid.lindgren",
        "type" : "user"
      }, {
        "id" : "zone1:donte.hackett",
        "type" : "user"
      }, {
        "id" : "zone0:edmund.lesch",
        "type" : "user"
      }, {
        "id" : "zone1:monty.ward",
        "type" : "user"
      }, {
        "id" : "zone1:karl.mertz",
        "type" : "user"
      }, {
        "id" : "zone1:jerold.murray",
        "type" : "user"
      }, {
        "id" : "zone1:norman.roob",
        "type" : "user"
      }, {
        "id" : "zone1:danna.waters",
        "type" : "user"
      }, {
        "id" : "zone1:dalila.mclaughlin",
        "type" : "user"
      }, {
        "id" : "zone0:GuyPlain",
        "type" : "space"
      },  {
        "id" : "zone0:gregorio.hodkiewicz",
        "type" : "user"
      }, {
        "id" : "zone1:blair.bednar",
        "type" : "user"
      }, {
        "id" : "zone0:rodger.crooks",
        "type" : "user"
      },  {
        "id" : "zone0:nicolas.vonrueden",
        "type" : "user"
      }, {
        "id" : "zone1:rachelle.feest",
        "type" : "user"
      } 
    ],
      "edges" : [ 
        {
        "src" : "zone1:BrianTurnpike",
        "dst" : "zone0:Murrayville",
        "perms" : "10001"
      }, {
        "src" : "zone1:danna.waters",
        "dst" : "zone1:saepe_aut",
        "perms" : "11100"
      }, {
        "src" : "zone0:GuyPlain",
        "dst" : "zone1:LakeJosiefort",
        "perms" : "10010"
      }, {
        "src" : "zone1:norman.roob",
        "dst" : "zone1:saepe_aut",
        "perms" : "00100"
      }, {
        "src" : "zone0:sid.lindgren",
        "dst" : "zone0:GuyPlain",
        "perms" : "01000"
      }, {
        "src" : "zone1:karl.mertz",
        "dst" : "zone1:et_praesentium",
        "perms" : "01111"
      }, {
        "src" : "zone1:lois.ohara",
        "dst" : "zone1:et_praesentium",
        "perms" : "01001"
      }, {
        "src" : "zone0:rodger.crooks",
        "dst" : "zone0:GuyPlain",
        "perms" : "10111"
      }, {
        "src" : "zone1:saepe_aut",
        "dst" : "zone1:IsaiasCape",
        "perms" : "11000"
      }, {
        "src" : "zone1:rachelle.feest",
        "dst" : "zone1:IsaiasCape",
        "perms" : "11000"
      }, {
        "src" : "zone0:emory.skiles",
        "dst" : "zone1:et_praesentium",
        "perms" : "10100"
      },{
        "src" : "zone0:edmund.lesch",
        "dst" : "zone0:GuyPlain",
        "perms" : "10110"
      }, {
        "src" : "zone1:theola.gusikowski",
        "dst" : "zone1:IsaiasCape",
        "perms" : "00101"
      }, {
        "src" : "zone1:lyman.leuschke",
        "dst" : "zone1:et_praesentium",
        "perms" : "10000"
      }, {
        "src" : "zone0:earle.bauch",
        "dst" : "zone0:GuyPlain",
        "perms" : "01011"
      }, {
        "src" : "zone0:terrell.koch",
        "dst" : "zone0:GuyPlain",
        "perms" : "01001"
      }, {
        "src" : "zone1:monty.ward",
        "dst" : "zone1:saepe_aut",
        "perms" : "10010"
      },{
        "src" : "zone1:lyman.leuschke",
        "dst" : "zone1:saepe_aut",
        "perms" : "10101"
      }, {
        "src" : "zone1:jerold.murray",
        "dst" : "zone1:IsaiasCape",
        "perms" : "00100"
      }, {
        "src" : "zone1:et_praesentium",
        "dst" : "zone1:IsaiasCape",
        "perms" : "10111"
      }, {
        "src" : "zone1:IsaiasCape",
        "dst" : "zone0:Murrayville",
        "perms" : "00111"
      }, {
        "src" : "zone0:nicolas.vonrueden",
        "dst" : "zone0:GuyPlain",
        "perms" : "11010"
      }, {
        "src" : "zone0:wyatt.feest",
        "dst" : "zone0:GuyPlain",
        "perms" : "11111"
      },  {
        "src" : "zone1:donte.hackett",
        "dst" : "zone1:IsaiasCape",
        "perms" : "01010"
      }, {
        "src" : "zone1:dalila.mclaughlin",
        "dst" : "zone1:et_praesentium",
        "perms" : "00110"
      }, {
        "src" : "zone0:gregorio.hodkiewicz",
        "dst" : "zone0:GuyPlain",
        "perms" : "10100"
      }, {
        "src" : "zone1:blair.bednar",
        "dst" : "zone1:et_praesentium",
        "perms" : "10111"
      },{
        "src" : "zone2:debera.moore",
        "dst" : "zone2:AntwanField",
        "perms" : "10001"
      },  {
        "src" : "zone2:margit.miller",
        "dst" : "zone2:AntwanField",
        "perms" : "11000"
      },  {
        "src" : "zone2:coralie.williamson",
        "dst" : "zone2:AntwanField",
        "perms" : "11010"
      }
    ]
}

class QueryAssetWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
        this.limitIndex = 0;
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
        // Parsowanie danych JSON
        const json = JSON.parse(JSON.stringify(data));
        this.vertices = json.vertices;
        this.limitIndex = this.roundArguments.assets;
       // await helper.createCar(this.sutAdapter, this.workerIndex, this.roundArguments);
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex++;

      
        const firstIndex = Math.floor(Math.random() * vertices.length);
        let secondIndex;
        do {
            secondIndex = Math.floor(Math.random() * vertices.length);
        } while (secondIndex === firstIndex);

        const args = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'findPathAndConcatPerms',
            invokerIdentity: 'User1',
            contractArguments: [  this.vertices[firstIndex], this.vertices[secondIndex] ],
            readOnly: false
        };
        

        if (this.txIndex === this.limitIndex) {
            this.txIndex = 0;
        }

        await this.sutAdapter.sendRequests(args);
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new QueryAssetWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
