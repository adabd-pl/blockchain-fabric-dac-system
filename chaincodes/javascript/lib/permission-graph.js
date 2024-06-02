/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { AsyncResource } = require('async_hooks');
const { error } = require('console');
const { Contract } = require('fabric-contract-api');
const fs = require('fs');


class PermissionGraph extends Contract {

    /**
     * Initializes the ledger.
     * @param {Context} ctx - The transaction context.
    */
    async initLedger(ctx) {
       
    }

    /**
     * Change perm in exact egde
     * @param {Context} ctx - The transaction context.
     * @param {String} edgeId - id of edge
     * @param {String} newPerms - new permission to set
    */
    async changePermission(ctx, edgeId , newPerms) {
        const edgeKey = ctx.stub.createCompositeKey('edge', [edgeId]);
        console.log(edgeKey);
        const edgeAsBytes = await ctx.stub.getState( edgeKey);
        if (!edgeAsBytes || edgeAsBytes.length === 0) {
            throw new Error(`${edgeId} does not exist in graph`);
        }
        
       
       
        const edge = JSON.parse(edgeAsBytes);
        console.log(edge);
        if (edge.owner !== ctx.clientIdentity.getMSPID()  ) {
            return 'You dont have permission.';
        }
        edge.data = newPerms;
        console.log('Edge: ' + JSON.stringify(edge) +' permission: ' + edge.data);
     

        await ctx.stub.putState(edgeKey, Buffer.from(JSON.stringify(edge)));
        return `Edge ${edgeId} permissions has been updated`;
    
    }

    /**
     * Create new vertex.
     * @param {Context} ctx - The transaction context.
     * @param {String} vertexId - id of vertex
     * @param {String} docType - type of vertex ( ex. user ) 
    */
    async createVertex(ctx, vertexId , docType ) {
      const vertexKey = ctx.stub.createCompositeKey('vertex', [vertexId]);

      const vertex = {
        type: 'vertex',
        id: vertexId,
        owner: ctx.clientIdentity.getMSPID(),
        docType: docType
      };
      await ctx.stub.putState(vertexKey, Buffer.from(JSON.stringify(vertex)));
      return `Vertex ${vertexId} has been added`;
    }
     
    /**
     * Create new edge.
     * @param {Context} ctx - The transaction context.
     * @param {String} edgeId - id of vertice
     * @param {String} src - source of edge
     * @param {String} dst - destination of edge
     * @param {String} perms - permissions for edge
    */
    async createEdge(ctx, edgeId ,src ,dst , perms ) {
      const edgeKey = ctx.stub.createCompositeKey('edge', [edgeId]);
     
      try{
        const dst_vertex = await this.queryVertex(ctx, dst) ;
         
        if (!dst_vertex ) {
            return `${dst} does not exist in graph or you do not have permission.`;
        }
 
        console.log( dst_vertex.owner , ctx.clientIdentity.getMSPID());
        if (dst_vertex.owner !== ctx.clientIdentity.getMSPID()  ) {
            return new Error(`You do not have permission.`);
            
        }
        
        const edge = {
        type: 'edge',
        id: edgeId,
        src: src,
        dst: dst,
        data: perms,
        owner: ctx.clientIdentity.getMSPID(),
        };

   
        await ctx.stub.putState(edgeKey, Buffer.from(JSON.stringify(edge)));


        console.info(`Edge ${edgeId} from ${src} to ${dst} has been added`);
  
        return `Edge ${edgeId} from ${src} to ${dst} has been added`;
    } catch (err) {
        console.log(err);
        return err;
    }
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

    /**
     * Reads vertices from the ledger.
     * @param {Context} ctx - The transaction context.
    */
    async queryAllVertices(ctx) {
      const iterator = await ctx.stub.getStateByPartialCompositeKey('vertex', []);
  
      const allResults = [];
  
      while (true) {
          const res = await iterator.next();
          if (res.value && res.value.value.toString()) {
              const strValue = res.value.value.toString();
              let record;
              try {
                  record = JSON.parse(strValue);
              } catch (err) {
                  console.log(err);
                  record = strValue;
              }
              allResults.push(record);
          }
          if (res.done) {
              await iterator.close();
              return allResults;
          }
      }
    }
  

      /**
     * Reads vertex from the ledger.
     * @param {Context} ctx - The transaction context.
     * @param {String} vertexId - id of vertex
    */
    async queryVertex(ctx , vertexId) {
        const vertexKey = ctx.stub.createCompositeKey('vertex', [vertexId]);
        const vertexAsBytes = await ctx.stub.getState( vertexKey);
    
        if (!vertexAsBytes || vertexAsBytes.length === 0) {
            throw new Error(`${vertexId} does not exist in graph`);
        }
    
        const peerMSPID = ctx.stub.getMspID();

        const vertex = JSON.parse(vertexAsBytes);
        if (peerMSPID == vertex.owner){
            return vertex;
        }
        else{
            return;
        }
    }

    /**
     * Reads edges from the ledger.
     * @param {Context} ctx - The transaction context.
    */
    async queryAllEdges(ctx) {
    const iterator = await ctx.stub.getStateByPartialCompositeKey('edge', []);
  
    const allResults = [];

    while (true) {
        const res = await iterator.next();
        if (res.value && res.value.value.toString()) {
            const strValue = res.value.value.toString();
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
        }
        if (res.done) {
            await iterator.close();
            return allResults;
        }
    }
    }

    /**
     * Reads permissions for start vertex to destination vertex from the ledger.
     * @param {Context} ctx - The transaction context.
     * @param {String} startVertexId - id of start vertex
     * @param {String} endVertexId - id of end vertex
    */
    async findPathAndConcatPerms(ctx, startVertexId, endVertexId) {
    if (!startVertexId || !endVertexId) {
        throw new Error('startVertexId and endVertexId must be non-empty');
    }

    // Find all vertex
    const edgesIterator = await ctx.stub.getStateByPartialCompositeKey('edge', []);
    const edges = [];
    while (true) {
        const res = await edgesIterator.next();
        if (res.value && res.value.value.toString()) {
            const edge = JSON.parse(res.value.value.toString());
            edges.push(edge);
        }
        if (res.done) {
            await edgesIterator.close();
            break;
        }
    }

    // Find all paths between startVertexId and endVertexId and sum permissions
    const visited = new Set();
    let totalPermissions = 0;

    const stack = [[startVertexId, 0]];

    while (stack.length > 0) {
        const [currentVertex, currentPerms] = stack.pop();

        if (currentVertex === endVertexId) {
            totalPermissions |= currentPerms;
        }

        if (!visited.has(currentVertex)) {
            visited.add(currentVertex);

            for (const edge of edges) {
                if (edge.src === currentVertex && !visited.has(edge.dst)) {
                    stack.push([edge.dst, this.bitwiseConcat(currentPerms, edge.data)]);
                }
            }

            visited.delete(currentVertex);
        }
    }

        if (totalPermissions === 0) {
            throw new Error(`No path found from ${startVertexId} to ${endVertexId}`);
        }

        return totalPermissions;
    }

    
    /**
     * Concatenation of permissions from two edges.
     * @param {String} perms1 - first permissions
     * @param {String} perms2 - first permissions
    */
    bitwiseConcat(perms1, perms2) {
    console.log(perms1, perms2);
    if (!perms1) return perms2;
    if (!perms2) return perms1;
   
    const maxLength = Math.max(perms1.length, perms2.length);
    const result = [];

    for (let i = 0; i < maxLength; i++) {
        const bit1 = perms1[i] ? perms1[i] : '0';
        const bit2 = perms2[i] ? perms2[i] : '0';
    
        result.push(bit1 === '1' && bit2 === '1' ? '1' : '0');
    }

    return result.join('');
    }

}

module.exports = PermissionGraph;