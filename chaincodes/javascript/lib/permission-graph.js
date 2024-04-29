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
            await ctx.stub.putState(vertices[i].id, Buffer.from(JSON.stringify(vertices[i])));
            console.info('Added <--> ', vertices[i]);
        }

        for (let i = 0; i < edges.length; i++) {
            edges[i].docType = 'edge';
            await ctx.stub.putState( 'edge' + i , Buffer.from(JSON.stringify(edges[i])));
            console.info('Added <--> ', edges[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
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


    //create new egde
    async createEdge(ctx, src ,dst , perms ) {
        console.info('============= START : Create Vertice ===========');

        const edge = {
            src,
            dst,
            perms
        };

        edge.src = src;
        edge.dst = dst;
        edge.perms = perms;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(edge)));
        console.info('============= END : create Vertice ===========');
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

    //change perms in exact egde
    async changePermission(ctx, edgeId) {
        console.info('============= START : changePermission ===========');

        const edgeAsBytes = await ctx.stub.getState(edgeId); //
        if (!edgeAsBytes || edgeAsBytes.length === 0) {
            throw new Error(`${edgeId} does not exist in graph`);
        }
        const edge = JSON.parse(edgeAsBytes.toString());
        egde.perms = newPerms;

        await ctx.stub.putState(edgeId, Buffer.from(JSON.stringify(car)));
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