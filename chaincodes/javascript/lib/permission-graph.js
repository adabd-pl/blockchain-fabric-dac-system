/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const fs = require('fs');


class PermissionGraph extends Contract {

      /**
     * Initializes the ledger.
     * @param {Context} ctx - The transaction context.
     */
    async initLedger(ctx) {
      /*  console.info('============= START : Initialize Ledger ===========');


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
        console.info('============= END : Initialize Ledger ===========');*/
    }

    /**
     * Initializes the ledger private collection.
     * @param {Context} ctx - The transaction context.
     * @param {String} collectionName - Name of collection to init. 
    */
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
          vertices[i].docType = 'vertice';
          await ctx.stub.putPrivateData(collectionName, vertices[i].id, Buffer.from(JSON.stringify(vertices[i])));
    
          console.info('Added <--> ', vertices[i]);
      }

      for (let i = 0; i < edges.length; i++) {
          edges[i].docType = 'edge';
          await ctx.stub.putPrivateData(collectionName,  "E" + i, Buffer.from(JSON.stringify(edges[i])));
    
          console.info('Added <--> ', edges[i]);
      }
      console.info('============= END : Initialize Collection ===========');

    }
    /**
     * Initializes the ledger private collection.
     * @param {Context} ctx - The transaction context.
     * @param {String} collectionName - Name of collection to init. 
    */
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
          vertices[i].docType = 'vertice';
          await ctx.stub.putPrivateData(collectionName, vertices[i].id, Buffer.from(JSON.stringify(vertices[i])));
    
          console.info('Added <--> ', vertices[i]);
      }

      for (let i = 0; i < edges.length; i++) {
          edges[i].docType = 'edge';
          await ctx.stub.putPrivateData(collectionName,"E" + i, Buffer.from(JSON.stringify(edges[i])));
    
          console.info('Added <--> ', edges[i]);
      }
      console.info('============= END : Initialize Collection ===========');

    }


    /**
     * Create new vertice in private collection.
     * @param {Context} ctx - The transaction context.
     * @param {String} id - id of vertice
     * @param {String} type - type of vertice ( ex. user ) 
     * @param {String} collectionName - Name of collection to init. 
    */
    async createVerticeInPrivate(ctx, id , type , collectionName ) {
      console.info('============= START : Create Vertice In Private ===========');
      try {
        const vertice = {
          id,
          type
        };

        vertice.id = id;
        vertice.type = type;
        vertice.doctype = "vertice";
        await ctx.stub.putPrivateData(collectionName, id , Buffer.from(JSON.stringify(vertice)));
        } catch(error) {
            throw new Error ('Error when creating Vertice with id ' + id + '\n' + error);
      }
    
      console.info('============= END : Create Vertice In Private ===========');
    }



    async readVerticeInPrivate(ctx, id , collectionName ) {
      console.info('============= START : Read Vertice In Private ===========');

      const vertice = await ctx.stub.getPrivateData(collectionName, id); 
      const vertice_param = await ctx.stub.getPrivateDataValidationParameter(collectionName, id); 
    
      if (!vertice || vertice.length === 0) {
          throw new Error(`${id} does not exist`);
      }

      console.log(vertice.toString());
      console.log(vertice_param.toString());
      
      console.info('============= END : Read Vertice In Private ===========');

      return vertice.toString();
    }

    /**
     * Create new edge in private collection.
     * @param {Context} ctx - The transaction context.
     * @param {String} collectionName - Name of collection to init. 
    */
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

    /**
     * Create edge reference to one private collection from another.
     * @param {Context} ctx - The transaction context.
     * @param {String} id - edge id.
     * @param {String} fromCollection - Name of collection from edge is. 
     * @param {String} fromCollection - Name of collection where is destination of edge.
    */
    async  transferAsset(ctx , id , fromCollection , toCollection) {
      console.info('============= START : Transfer Edge In Private ===========');
    
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
      
      const edge_ref = {
        src,
        dst  
      };

      edge_ref.src = asset.src;
      edge_ref.dst = asset.dst;
      edge_ref.docType = 'edge_ref';
    

      await ctx.stub.putPrivateData(toCollection,  id , edge_ref.toString());
      
      console.info('============= END : Transfer Edge In Private ===========');
      return asset.toString();
    }


    /**
     * Read graph from collection.
     * @param {Context} ctx - The transaction context.
     * @param {String} collectionName - Name of collection to init. 
     * @returns {Object} - actual graph.
    */
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
    //TODO
    async changePermission(ctx, edgeId , collectionName , newPerms) {
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
    async updateLastEdgeId (){
        //TODO
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

    /**
     * Reads a graph from the ledger.
     * @param {Context} ctx - The transaction context.
    */
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

}

module.exports = PermissionGraph;