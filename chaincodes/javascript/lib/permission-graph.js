/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { AsyncResource } = require('async_hooks');
const { Contract } = require('fabric-contract-api');
const fs = require('fs');


class PermissionGraph extends Contract {

      /**
     * Initializes the ledger.
     * @param {Context} ctx - The transaction context.
     */
    async initLedger(ctx) {
       console.info('============= START : Initialize Ledger ===========');


        console.info('============= END : Initialize Ledger ===========');
    }




    async readVerticeInPrivate(ctx, id , collectionName ) {
      console.info('============= START : Read Vertice In Private ===========');

      const vertice = await ctx.stub.getPrivateData(collectionName, id); 
      //const vertice_param = await ctx.stub.getPrivateDataValidationParameter(collectionName, id); 
    
      if (!vertice || vertice.length === 0) {
          throw new Error(`${id} does not exist`);
      }

      console.log(vertice.toString());
      //console.log(vertice_param.toString());
      
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
     * Read edge from collection.
     * @param {Context} ctx - The transaction context.
     * @param {String} id - Id of edge. 
     * @param {String} collectionName - Name of collection to query. 
     * @returns {String} - searched edge.
    */
    async readEdgeInPrivate(ctx, id , collectionName ) {
      console.info('============= START : Read Edge In Private ===========');

      const edge = await ctx.stub.getPrivateData(collectionName, id); 

      if (!edge || edge.length === 0) {
          throw new Error(`${id} does not exist`);
      }

      console.log(edge.toString());
      //console.log(vertice_param.toString());
      
      console.info('============= END : Read Edge In Private ===========');

      return edge.toString();
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

      console.log('TransferAsset Put: collection' + toCollection +', ID ' + id  + '  asset: ' + asset.toString());
      const asset_json = JSON.parse(asset);
      console.log('TransferAsset: ' + asset_json.src +' from ' + asset_json);
     
  
      const edge_ref = {
        src: asset_json.src,
        dst: asset_json.dst,
        docType: 'edge_ref'
      };
    
      console.log(edge_ref);
    

      await ctx.stub.putPrivateData(toCollection,  id , Buffer.from(JSON.stringify(edge_ref)));
      
      console.info('============= END : Transfer Edge In Private ===========');
      return JSON.stringify(edge_ref);
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
    async changePermission(ctx, edgeId , newPerms) {
        const edgeKey = ctx.stub.createCompositeKey('vertex', [edgeId]);

        const edgeAsBytes = await ctx.stub.getState( edgeKey);
        if (!edgeAsBytes || edgeAsBytes.length === 0) {
            throw new Error(`${edgeId} does not exist in graph`);
        }
     
        const peerMSPID = ctx.stub.getMspID();
    
        const edge = JSON.parse(edgeAsBytes);
        edge.perms = newPerms;
        console.log('Edge: ' + JSON.stringify(edge) +' permission: ' + edge.perms);
     

        await ctx.stub.putState(edgeId, Buffer.from(JSON.stringify(edge)));
        console.info(`Edge ${edgeId} permissions has been updated`);
    
    }

    /**
     * Create new vertice.
     * @param {Context} ctx - The transaction context.
     * @param {String} vertexId - id of vertice
     * @param {String} docType - type of vertice ( ex. user ) 
    */
    async createVertex(ctx, vertexId , docType ) {
      const vertexKey = ctx.stub.createCompositeKey('vertex', [vertexId]);

      const vertex = {
        type: 'vertex',
        id: vertexId,
        owner: ctx.clientIdentity.getMSPID(),
        docType: docType
      };
      console.log(JSON.stringify(vertex));
      await ctx.stub.putState(vertexKey, Buffer.from(JSON.stringify(vertex)));
      console.info(`Vertex ${vertexId} has been added`);
      return `Vertex ${vertexId} has been added`;
    }
     
   /**
     * Create new edge.
     * @param {Context} ctx - The transaction context.
     * @param {String} edgeId - id of vertice
     * @param {String} src - source of edge
     * @param {String} dst - destincation of edge
     * @param {String} perms - permissions for edge
    */
    async createEdge(ctx, edgeId ,src ,dst , perms ) {
      const edgeKey = ctx.stub.createCompositeKey('edge', [edgeId]);
     
      
      //src_vertex = this.queryVertex(ctx, src);
     
      try{
       const dst_vertex = await this.queryVertex(ctx, dst) ;
        if( dst_vertex = undefined){
        return 'Vertex not exists or not allowed.'
        }
        

    //Cannot create edge apart from zone/org
    if ( dst_vertex.owner != ctx.clientIdentity.getMSPID() ){
      return 'No permission to create edge.'
    }
    console.log( dst_vertex.owner , ctx.clientIdentity.getMSPID() )

    const edge = {
      type: 'edge',
      id: edgeId,
      src: src,
      dst: dst,
      data: perms,
      owner: ctx.clientIdentity.getMSPID(),
    };

   
       await ctx.stub.putState(edgeKey, Buffer.from(JSON.stringify(edge)))
  
    console.info(`Edge ${edgeId} from ${src} to ${dst} has been added`);
  
  
    }catch{

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
        return 'No permission.'
    }
}


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

  async findPathAndConcatPerms(ctx, startVertexId, endVertexId) {
    if (!startVertexId || !endVertexId) {
        throw new Error('startVertexId and endVertexId must be non-empty');
    }

    // Znajdź wszystkie krawędzie
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

    // Znajdź ścieżkę pomiędzy startVertexId i endVertexId
    const visited = new Set();
    const stack = [[startVertexId, "10011"]];

    while (stack.length > 0) {
        const [currentVertex, currentPerms] = stack.pop();
        console.log(currentVertex, currentPerms );
        if (currentVertex === endVertexId) {
            return currentPerms;
        }
        if (!visited.has(currentVertex)) {
            visited.add(currentVertex);

            for (const edge of edges) {
                if (edge.src === currentVertex && !visited.has(edge.dst)) {
                  console.log(edge)
                    stack.push([edge.dst, this.bitwiseConcat(currentPerms, edge.data)]);
                }
            }
        }
    }

    throw new Error(`No path found from ${startVertexId} to ${endVertexId}`);
}

bitwiseConcat(perms1, perms2) {
    console.log(perms1, perms2);
    if (!perms1) return perms2;
    if (!perms2) return perms1;
   
    const maxLength = Math.max(perms1.length, perms2.length);
    const result = [];

    for (let i = 0; i < maxLength; i++) {
        const bit1 = perms1[i] ? perms1[i] : '0';
        const bit2 = perms2[i] ? perms2[i] : '0';
        console.log(bit1, bit2);
        result.push(bit1 === '1' && bit2 === '1' ? '1' : '0');
    }

    return result.join('');
}

}

module.exports = PermissionGraph;