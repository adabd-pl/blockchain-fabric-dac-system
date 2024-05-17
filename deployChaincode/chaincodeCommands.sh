#!/usr/bin/env bash

chaincodeInfo(){
  #!/bin/bash
  export CHANNEL_NAME=$1
  export CC_RUNTIME_LANGUAGE="node"
  export CC_SRC_PATH=../chaincodes/javascript
  export CC_NAME="permissiongraph"
  echo "Channel name: $CHANNEL_NAME"
}

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../orderer/crypto-config-ca/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export FABRIC_CFG_PATH=${PWD}/../config

setGlobalsForPeer0Org1() {
  export PEER0_ORG1_CA=${PWD}/../org1/crypto-config-ca/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
  export CORE_PEER_LOCALMSPID="Org1MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../org1/crypto-config-ca/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
  export CORE_PEER_ADDRESS=localhost:7051
}

setGlobalsForPeer0Org2() {
  export PEER0_ORG2_CA=${PWD}/../org2/crypto-config-ca/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
  export CORE_PEER_LOCALMSPID="Org2MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../org2/crypto-config-ca/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
  export CORE_PEER_ADDRESS=localhost:9051
}


setGlobalsForPeer0Org3() {
  export PEER0_ORG3_CA=${PWD}/../org3/crypto-config-ca/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
  export CORE_PEER_LOCALMSPID="Org3MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../org3/crypto-config-ca/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
  export CORE_PEER_ADDRESS=localhost:11051
}

readTransaction() {


  #peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c '{"function": "initPrivateCollectionOrg1_2", "Args":["Org1MSPPrivateCollection"]}'


  echo "PRIVATE COLLECTION ORG1 - READ GRAPH"
  peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c 
  #sleep 4
  #peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["readVerticeInPrivate" ,  "V11" , "Org1MSPPrivateCollection"]}'
  #peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME}  -c '{"function": "transferAsset", "Args":["E1" , "Org1Org2MSPPrivateCollection", "Org3MSPPrivateCollection"]}' --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA #--peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA
    
    
}


getInstallChaincodes() {
  peer lifecycle chaincode queryinstalled
}



initPrivateCollection1_2(){
  setGlobalsForPeer0Org1
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c '{"function": "initPrivateCollectionOrg1_2", "Args":["Org1Org2MSPPrivateCollection"]}'
}



initPrivateCollection3(){
  setGlobalsForPeer0Org3
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA -c '{"function": "initPrivateCollectionOrg3", "Args":["Org3MSPPrivateCollection"]}'
}


queryPrivateCollection1(){
  setGlobalsForPeer0Org1
  peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "Org1Org2MSPPrivateCollection"]}'
}


queryPrivateCollection2(){
  setGlobalsForPeer0Org2
  peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "Org1Org2MSPPrivateCollection"]}'
}



queryPrivateCollection3(){
  setGlobalsForPeer0Org3
  peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "Org3MSPPrivateCollection"]}'
 }



###setGlobalsForPeer0Org2



##peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA -c '{"function": "initPrivateCollectionOrg1_2", "Args":["Org1Org2MSPPrivateCollection"]}'
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME}  -c '{"function": "transferAsset", "Args":["V13" , "Org2MSPPrivateCollection", "Org1MSPPrivateCollection"]}'  --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA
  
##peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "Org2MSPPrivateCollection"]}'

##peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraph" ]}''

#peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "assetCollection" ]}'
#peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["readVerticeInPrivate" ,  "V13" , "Org2MSPPrivateCollection"]}'



##Change collection configuration 
# ./deployOrg1_JavaScript with change collections_config.json

function usage() {
    echo "Usage: $0 <channel name> org<nr> <test-name>"
    exit 1
}

chaincodeInfo "$1"

# Sprawdzanie ilości argumentów
if [ "$#" -ne 3 ]; then
    usage
fi

setGlobalsForPeer0Org1
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME}  -c '{"function": "transferAsset", "Args":["E2" , "Org1Org2MSPPrivateCollection", "Org3MSPPrivateCollection"]}'
#readTransaction
peer channel getinfo -c mychannel
# Set globals to org based on first parameter
if   [ "$2" == "org1" ]; then
    setGlobalsForPeer0Org1
    export PRIVATE_COLLECTION= "Org1Org2MSPPrivateCollection"   
elif [ "$2" == "org2" ]; then
    setGlobalsForPeer0Org2
    export PRIVATE_COLLECTION= "Org1Org2MSPPrivateCollection" 
elif [ "$2" == "org3" ]; then
    setGlobalsForPeer0Org3
    export PRIVATE_COLLECTION= "Org3MSPPrivateCollection" 
else
    echo "Invalid first parameter"
    usage
fi

# Function request based on second parameter
if   [ "$3" == "queryPrivateCollection1" ]; then
    queryPrivateCollection1
elif [ "$3" == "queryPrivateCollection2" ]; then
    queryPrivateCollection2
elif [ "$3" == "queryPrivateCollection3" ]; then
    queryPrivateCollection3
elif   [ "$3" == "initPrivateCollection1_2" ]; then
    initPrivateCollection1_2
elif [ "$3" == "initPrivateCollection3" ]; then
    initPrivateCollection3
else
    echo "Invalid second parameter"
    #usage

    echo "TRANSFER EDGE FROM ORG1_ORG2 TO ORG3"

    echo "UPDATE PERMISSION FROM ORG1"

    peer channel getinfo -c mychannel
fi

