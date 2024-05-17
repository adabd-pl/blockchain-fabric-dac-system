/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const fs = require('fs');


class PermissionGraph extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');

        const data = {
            "vertices": [
              {
                "id": "org1:paris",
                "type": "provider"
              },
              {
                "id": "org1:lisbon",
                "type": "provider"
              },
              {
                "id": "org2:krakow",
                "type": "provider"
              },
              {
                "id": "org1:datahub",
                "type": "space"
              },
              {
                "id": "org1:eo_data",
                "type": "space"
              },
              {
                "id": "org1:ceric",
                "type": "space"
              },
              {
                "id": "org2:eosc",
                "type": "space"
              },
              {
                "id": "org2:primage",
                "type": "space"
              },
              {
                "id": "org1:dhub_members",
                "type": "group"
              },
              {
                "id": "org1:ebi",
                "type": "group"
              },
              {
                "id": "org1:dhub_mngrs",
                "type": "group"
              },
              {
                "id": "org1:uber_admins",
                "type": "group"
              },
              {
                "id": "org2:cyfnet",
                "type": "group"
              },
              {
                "id": "org2:admins",
                "type": "group"
              },
              {
                "id": "org2:audit",
                "type": "group"
              },
              {
                "id": "org2:members",
                "type": "group"
              },
              {
                "id": "org1:bob",
                "type": "user"
              },
              {
                "id": "org1:alice",
                "type": "user"
              },
              {
                "id": "org1:jill",
                "type": "user"
              },
              {
                "id": "org1:luke",
                "type": "user"
              },
              {
                "id": "org2:anne",
                "type": "user"
              },
              {
                "id": "org2:tom",
                "type": "user"
              }
            ],
            "edges": [
              {
                "src": "org1:datahub",
                "dst": "org1:paris",
                "perms": null
              },
              {
                "src": "org1:datahub",
                "dst": "org1:lisbon",
                "perms": null
              },
              {
                "src": "org1:eo_data",
                "dst": "org1:paris",
                "perms": null
              },
              {
                "src": "org1:eo_data",
                "dst": "org1:lisbon",
                "perms": null
              },
              {
                "src": "org1:eo_data",
                "dst": "org2:krakow",
                "perms": null
              },
              {
                "src": "org1:ceric",
                "dst": "org2:krakow",
                "perms": null
              },
              {
                "src": "org2:eosc",
                "dst": "org1:paris",
                "perms": null
              },
              {
                "src": "org2:eosc",
                "dst": "org2:krakow",
                "perms": null
              },
              {
                "src": "org2:primage",
                "dst": "org2:krakow",
                "perms": null
              },
              {
                "src": "org1:dhub_members",
                "dst": "org1:datahub",
                "perms": "10000"
              },
              {
                "src": "org1:dhub_members",
                "dst": "org1:eo_data",
                "perms": "10000"
              },
              {
                "src": "org1:dhub_mngrs",
                "dst": "org1:dhub_members",
                "perms": "11011"
              },
              {
                "src": "org1:ebi",
                "dst": "org1:ceric",
                "perms": "10000"
              },
              {
                "src": "org2:admins",
                "dst": "org1:dhub_members",
                "perms": "11111"
              },
              {
                "src": "org2:admins",
                "dst": "org2:eosc",
                "perms": "11011"
              },
              {
                "src": "org2:admins",
                "dst": "org2:cyfnet",
                "perms": "11111"
              },
              {
                "src": "org1:uber_admins",
                "dst": "org2:admins",
                "perms": "11111"
              },
              {
                "src": "org2:cyfnet",
                "dst": "org2:eosc",
                "perms": "11001"
              },
              {
                "src": "org2:cyfnet",
                "dst": "org2:primage",
                "perms": "11000"
              },
              {
                "src": "org2:audit",
                "dst": "org2:cyfnet",
                "perms": "11001"
              },
              {
                "src": "org2:members",
                "dst": "org2:cyfnet",
                "perms": "10000"
              },
              {
                "src": "org1:bob",
                "dst": "org1:datahub",
                "perms": "11111"
              },
              {
                "src": "org1:bob",
                "dst": "org1:dhub_mngrs",
                "perms": "11110"
              },
              {
                "src": "org1:alice",
                "dst": "org1:eo_data",
                "perms": "11001"
              },
              {
                "src": "org1:alice",
                "dst": "org1:ebi",
                "perms": "11000"
              },
              {
                "src": "org1:jill",
                "dst": "org1:ebi",
                "perms": "11111"
              },
              {
                "src": "org1:luke",
                "dst": "org1:uber_admins",
                "perms": "10001"
              },
              {
                "src": "org2:anne",
                "dst": "org1:ceric",
                "perms": "10001"
              },
              {
                "src": "org2:anne",
                "dst": "org2:audit",
                "perms": "10001"
              },
              {
                "src": "org2:anne",
                "dst": "org2:members",
                "perms": "00000"
              },
              {
                "src": "org2:tom",
                "dst": "org2:members",
                "perms": "00000"
              },
              {
                "src": "org2:tom",
                "dst": "org2:primage",
                "perms": "10011"
              }
            ]
          };
          

        const vertices = data.vertices;
        const edges = data.edges;

        for (let i = 0; i < vertices .length; i++) {
            vertices[i].docType = 'vertical';
           // await ctx.stub.putState(vertices[i].id, Buffer.from(JSON.stringify(vertices[i])));
            console.info('Added <--> ', vertices[i]);
        }

  
        console.info('============= END : create Vertice In Private ===========');
        for (let i = 0; i < edges.length; i++) {
            edges[i].docType = 'edge';
            //await ctx.stub.putState( 'edge' + i , Buffer.from(JSON.stringify(edges[i])));
            console.info('Added <--> ', edges[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }




  async initPrivateCollectionOrg1_2(ctx, collectionName){
    const data = { 
    "vertices" : [ {
        "id" : "zone0:wyatt.feest",
        "type" : "user"
      }, {
        "id" : "zone0:emory.skiles",
        "type" : "user"
      }, {
        "id" : "zone1:theola.gusikowski",
        "type" : "user"
      }, {
        "id" : "zone1:Brian Turnpike",
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
        "id" : "zone1:Lake Josiefort",
        "type" : "provider"
      }, {
        "id" : "zone1:lois.ohara",
        "type" : "user"
      }, {
        "id" : "zone1:saepe_aut",
        "type" : "group"
      }, {
        "id" : "zone1:Isaias Cape",
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
        "id" : "zone0:Guy Plain",
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
      } ],
      "edges" : [ {
        "src" : "zone1:Brian Turnpike",
        "dst" : "zone0:Murrayville",
        "perms" : "10001"
      }, {
        "src" : "zone1:danna.waters",
        "dst" : "zone1:saepe_aut",
        "perms" : "11100"
      }, {
        "src" : "zone0:Guy Plain",
        "dst" : "zone1:Lake Josiefort",
        "perms" : "10010"
      }, {
        "src" : "zone1:norman.roob",
        "dst" : "zone1:saepe_aut",
        "perms" : "00100"
      }, {
        "src" : "zone0:sid.lindgren",
        "dst" : "zone0:Guy Plain",
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
        "dst" : "zone0:Guy Plain",
        "perms" : "10111"
      }, {
        "src" : "zone1:saepe_aut",
        "dst" : "zone1:Isaias Cape",
        "perms" : "11000"
      }, {
        "src" : "zone1:rachelle.feest",
        "dst" : "zone1:Isaias Cape",
        "perms" : "11000"
      }, {
        "src" : "zone0:emory.skiles",
        "dst" : "zone1:et_praesentium",
        "perms" : "10100"
      },{
        "src" : "zone0:edmund.lesch",
        "dst" : "zone0:Guy Plain",
        "perms" : "10110"
      }, {
        "src" : "zone1:theola.gusikowski",
        "dst" : "zone1:Isaias Cape",
        "perms" : "00101"
      }, {
        "src" : "zone1:lyman.leuschke",
        "dst" : "zone1:et_praesentium",
        "perms" : "10000"
      }, {
        "src" : "zone0:earle.bauch",
        "dst" : "zone0:Guy Plain",
        "perms" : "01011"
      }, {
        "src" : "zone0:terrell.koch",
        "dst" : "zone0:Guy Plain",
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
        "dst" : "zone1:Isaias Cape",
        "perms" : "00100"
      }, {
        "src" : "zone1:et_praesentium",
        "dst" : "zone1:Isaias Cape",
        "perms" : "10111"
      }, {
        "src" : "zone1:Isaias Cape",
        "dst" : "zone0:Murrayville",
        "perms" : "00111"
      }, {
        "src" : "zone0:nicolas.vonrueden",
        "dst" : "zone0:Guy Plain",
        "perms" : "11010"
      }, {
        "src" : "zone0:wyatt.feest",
        "dst" : "zone0:Guy Plain",
        "perms" : "11111"
      },  {
        "src" : "zone1:donte.hackett",
        "dst" : "zone1:Isaias Cape",
        "perms" : "01010"
      }, {
        "src" : "zone1:dalila.mclaughlin",
        "dst" : "zone1:et_praesentium",
        "perms" : "00110"
      }, {
        "src" : "zone0:gregorio.hodkiewicz",
        "dst" : "zone0:Guy Plain",
        "perms" : "10100"
      }, {
        "src" : "zone1:blair.bednar",
        "dst" : "zone1:et_praesentium",
        "perms" : "10111"
      } ]


    
    }

    const vertices = data.vertices;
    const edges = data.edges;

    console.info('============= START : Initialize Collection ===========');
    for (let i = 0; i < vertices .length; i++) {
        vertices[i].docType = 'vertical';
        await ctx.stub.putPrivateData(collectionName, vertices[i].id, Buffer.from(JSON.stringify(vertices[i])));
  
        console.info('Added <--> ', vertices[i]);
    }



    for (let i = 0; i < edges.length; i++) {
        edges[i].docType = 'edge';
        await ctx.stub.putPrivateData(collectionName, edges[i].id, Buffer.from(JSON.stringify(edges[i])));
  
        console.info('Added <--> ', edges[i]);
    }
    console.info('============= END : Initialize Collection ===========');

  }

  async initPrivateCollectionOrg3(ctx, collectionName){
    const data = { 
    "vertices" : [ {
        "id" : "zone2:Antwan Field",
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
        "id" : "zone2:Brekke Gardens",
        "type" : "space"
      }],
      "edges" : [ {
        "src" : "zone2:debera.moore",
        "dst" : "zone2:Antwan Field",
        "perms" : "10001"
      },  {
        "src" : "zone2:margit.miller",
        "dst" : "zone2:Antwan Field",
        "perms" : "11000"
      }, {
        "src" : "zone2:Antwan Field",
        "dst" : "zone0:Murrayville",
        "perms" : "11001"
      }, {
        "src" : "zone2:coralie.williamson",
        "dst" : "zone2:Antwan Field",
        "perms" : "11010"
      }]


    
    }

    const vertices = data.vertices;
    const edges = data.edges;

    console.info('============= START : Initialize Collection ===========');
    for (let i = 0; i < vertices .length; i++) {
        vertices[i].docType = 'vertical';
        await ctx.stub.putPrivateData(collectionName, vertices[i].id, Buffer.from(JSON.stringify(vertices[i])));
  
        console.info('Added <--> ', vertices[i]);
    }



    for (let i = 0; i < edges.length; i++) {
        edges[i].docType = 'edge';
        await ctx.stub.putPrivateData(collectionName, edges[i].id, Buffer.from(JSON.stringify(edges[i])));
  
        console.info('Added <--> ', edges[i]);
    }
    console.info('============= END : Initialize Collection ===========');

  }



    async createVertice(ctx, id , type ) {
        console.info('============= START : Create Vertice ===========');

        const vertice = {
            id,
            type
        };

        vertice.id = id;
        vertice.type = type;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(vertice)));

        console.info('============= END : create Vertice ===========');
    }

    async createVerticeInPrivate(ctx, id , type , collectionName ) {
      console.info('============= START : Create Vertice In Private ===========');
      try {
        const vertice = {
          id,
          type
      };

      vertice.id = id;
      vertice.type = type;

  
      await ctx.stub.putPrivateData(collectionName, id , Buffer.from(JSON.stringify(vertice)));
      //await ctx.stub.putPrivateData("assetCollection", id , Buffer.from(JSON.stringify(vertice)));

    } catch(error) {
        throw new Error ('Error when creating Vertice with id ' + id + '\n' + error);
    }
    

    console.info('============= END : Create Vertice In Private ===========');
  }

  
  async readVerticeInPrivate(ctx, id , collectionName ) {
    console.info('============= START : Read Vertice In Private ===========');

    const vertice = await ctx.stub.getPrivateData(collectionName, id); // get the car from chaincode state
    const vertice_param = await ctx.stub.getPrivateDataValidationParameter(collectionName, id); // get the car from chaincode state
   
    if (!vertice || vertice.length === 0) {
        throw new Error(`${id} does not exist`);
    }
    console.log(vertice.toString());
    
    console.log(vertice_param.toString());
    
    console.info('============= END : Read Vertice In Private ===========');

    return vertice.toString();
  
  }


  //create new egde
  async createEdge(ctx, src ,dst , perms ) {
      const edge = {
          src,
          dst,
          perms
      };

      edge.src = src;
      edge.dst = dst;
      edge.perms = perms;

      await ctx.stub.putState(id, Buffer.from(JSON.stringify(edge)));
  }

  async createEdgeInPrivate(ctx, src ,dst , perms , collectionName ) {
    const edge = {
        src,
        dst,
        perms
    };

    edge.src = src;
    edge.dst = dst;
    edge.perms = perms;

    await ctx.stub.putPrivateData(collectionName , src + '_' + dst  , Buffer.from(JSON.stringify(edge)));
  }


  async  transferAsset(ctx , id , fromCollection , toCollection) {
    console.info('============= START : Transfer Asset In Private ===========');
   
    const asset = await ctx.stub.getPrivateData(fromCollection, id);
   
    if (!asset || asset.length === 0) {
      throw new Error(`${id} does not exist`);
    }
    const clientMSPID = ctx.clientIdentity.getMSPID();

    const peerMSPID = ctx.stub.getMspID();

    if (clientMSPID !== peerMSPID) {
        throw new Error('client from org %v is not authorized to read or write private data from an org ' + clientMSPID + ' peer ' + peerMSPID);
    }
   
    console.log('TransferAsset Put: collection' + toCollection +', ID ' + id + '  asset: ' + asset.toString());
    await ctx.stub.putPrivateData(toCollection,  id , asset.toString()); // rewrite the asset
     console.info('============= END : Transfer Asset In Private ===========');
    return asset.toString();
    
}




    //get whole graph
    async queryGraph(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults, null, 2);
    }



    //get whole graph
    async queryGraphFromCollection(ctx , collectionName ) {
      const startKey = '';
      const endKey = '';
      const allResults = [];
      for await (const {key, value} of ctx.stub.getPrivateDataByRange(collectionName, startKey, endKey)) {
          const strValue = Buffer.from(value).toString('utf8');
          let record;
          try {
              record = JSON.parse(strValue);
          } catch (err) {
              console.log(err);
              record = strValue;
          }
          allResults.push({ Key: key, Record: record });
      }
      console.info(allResults);
      return JSON.stringify(allResults, null, 2);
  }


    //change perms in exact egde
    async changePermission(ctx, edgeId , collectionName) {
        console.info('============= START : changePermission ===========');

        const edgeAsBytes = await ctx.stub.getState(edgeId); //
        if (!edgeAsBytes || edgeAsBytes.length === 0) {
            throw new Error(`${edgeId} does not exist in graph`);
        }
     
        const peerMSPID = ctx.stub.getMspID();
    
        if ( !collectionName.includes(peerMSPID) ) {
            throw new Error('client from org %v is not authorized to read or write private data from an org ' + collectionName + ' peer ' + peerMSPID);
        }

        const edge = JSON.parse(edgeAsBytes.toString());
        egde.perms = newPerms;

        await ctx.stub.putPrivateData(collectionName , edgeId, Buffer.from(JSON.stringify(edge)));
        console.info('============= END : changePermission ===========');
    
    }


    //Add to chain to keep order with ids 
    async getLastEdgeId (){
        //TODO
    }

    //Add to chain to keep order with ids 
    async getLastVerticeId (){
        //TODO
    }

    //Add to chain to keep order with ids 
    async updateLastEdgeId (){
        //TODO
    }

    //Add to chain to keep order with ids 
    async updateLastVerticeId (){
        //TODO
    }
    
  
}

module.exports = PermissionGraph;