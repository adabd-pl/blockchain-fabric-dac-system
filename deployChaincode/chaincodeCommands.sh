#!/usr/bin/env bash

chaincodeInfo(){
  #!/bin/bash
  export CHANNEL_NAME=$1
  export CC_RUNTIME_LANGUAGE="node"
  export CC_SRC_PATH=../chaincodes/javascript
  export CC_NAME="permissiongraph"
  echo "Channel name: $CHANNEL_NAME"
  echo "Sequence: $CC_SEQUENCE"
  echo "Version: $CC_SEQUENCE"
}

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../orderer/crypto-config-ca/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_ORG1_CA=${PWD}/../org1/crypto-config-ca/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/../config

setGlobalsForPeer0Org1() {
  export CORE_PEER_LOCALMSPID="Org1MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../org1/crypto-config-ca/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
  export CORE_PEER_ADDRESS=localhost:7051
}

setGlobalsForPeer0Org2() {
  export CORE_PEER_LOCALMSPID="Org2MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../org2/crypto-config-ca/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
  export CORE_PEER_ADDRESS=localhost:9051
}

insertTransaction() {

  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c '{"function": "createCar", "Args":["CAR101","Honda","City","White", "CM"]}'

  sleep 2
}

readTransaction() {
  echo "Reading a transaction"

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c '{"function": "initPrivateCollectionOrg1_2", "Args":["Org1MSPPrivateCollection"]}'
sleep 5


echo "PRIVATE COLLECTION ORG1 - READ GRAPH"
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "Org1MSPPrivateCollection"]}'
#sleep 4
#peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["readVerticeInPrivate" ,  "V11" , "Org1MSPPrivateCollection"]}'
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME}  -c '{"function": "TransferAsset", "Args":["V11" , "Org1MSPPrivateCollection", "Org2MSPPrivateCollection"]}' --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA #--peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA
  
 
}


getInstallChaincodes() {

  peer lifecycle chaincode queryinstalled

}
if [ $# -ne 3 ]; then
    echo $#
    echo "     "
    echo "     "
    echo "Usage: $1 <channel name> <sequence> <version>"
    exit 1
fi

chaincodeInfo "$1"
setGlobalsForPeer0Org1

readTransaction

setGlobalsForPeer0Org2



echo "Reading a transaction Org 2"

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA -c '{"function": "initPrivateCollectionOrg1_2", "Args":["Org2MSPPrivateCollection"]}'
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME}  -c '{"function": "transferAsset", "Args":["V13" , "Org2MSPPrivateCollection", "Org1MSPPrivateCollection"]}'  --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA
  
 
echo "Private collection Org 2"
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "Org2MSPPrivateCollection"]}'
#peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "assetCollection" ]}'
#peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["readVerticeInPrivate" ,  "V13" , "Org2MSPPrivateCollection"]}'
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraph" ]}'


##Change collection configuration 
# ./deployOrg1_JavaScript with change collections_config.json



