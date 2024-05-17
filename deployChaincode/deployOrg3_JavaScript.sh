#!/usr/bin/env bash

chaincodeInfo(){
  #!/bin/bash
  export CHANNEL_NAME=$1
  export CC_RUNTIME_LANGUAGE="node"
  export CC_VERSION=$3
  export CC_SRC_PATH=../chaincodes/javascript
  export CC_NAME="permissiongraph"
  export CC_SEQUENCE=$2
  echo "Channel name: $CHANNEL_NAME"
  echo "Sequence: $CC_SEQUENCE"
  echo "Version: $CC_SEQUENCE"
}
preSetupJavaScript() {

  pushd ../chaincodes/javascript
  npm install
  npm run build
  popd

}

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../orderer/crypto-config-ca/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_ORG3_CA=${PWD}/../org3/crypto-config-ca/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/../config

setGlobalsForPeer0Org3() {
  export CORE_PEER_LOCALMSPID="Org3MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../org3/crypto-config-ca/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
  export CORE_PEER_ADDRESS=localhost:11051
}

packageChaincode() {

  rm -rf ${CC_NAME}.tar.gz

  peer lifecycle chaincode package ${CC_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${CC_NAME}_${CC_VERSION}

}

installChaincode() {

  peer lifecycle chaincode install ${CC_NAME}.tar.gz

}

queryInstalled() {

  peer lifecycle chaincode queryinstalled >&log.txt

  cat log.txt

  PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)

  echo PackageID is ${PACKAGE_ID}
}
approveForMyOrg3() {

  setGlobalsForPeer0Org3

  peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION}   --collections-config '/home/adabd/go/src/github.com/NewNetwork_v2/Hyperledger-Fabric/collections_config.json' --package-id ${PACKAGE_ID} --sequence ${CC_SEQUENCE} --init-required

}

getblock() {
  peer channel getinfo -c mychannel -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA
}

checkCommitReadyness() {

  peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name ${CC_NAME} --sequence ${CC_SEQUENCE} --version ${CC_VERSION}   --collections-config '/home/adabd/go/src/github.com/NewNetwork_v2/Hyperledger-Fabric/collections_config.json'  --init-required --output json

}
commitChaincodeDefination() {

  peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME}   --collections-config '/home/adabd/go/src/github.com/NewNetwork_v2/Hyperledger-Fabric/collections_config.json' --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA --sequence ${CC_SEQUENCE} --version ${CC_VERSION} --init-required

}

queryCommitted() {

  peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME} --output json

}
chaincodeInvokeInit() {

  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME -n ${CC_NAME} --isInit --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA  -c '{"function": "initLedger","Args":[]}'

}

insertTransaction() {

  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA -c '{"function": "createCar", "Args":["CAR103","Audi","R8","Black", "CM"]}'

  sleep 3
}
readTransaction() {
  echo "Reading a transaction"

  # Query all cars
 # peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraph"]}'
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA -c '{"function": "createVerticeInPrivate", "Args":["V10" , "User", "Org3MSPPrivateCollection"]}'

  peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["queryGraphFromCollection" , "Org3MSPPrivateCollection"]}'
  peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["readVerticeInPrivate" ,  "V10"  , "Org3MSPPrivateCollection"]}'
  
  # Query Car by Id
  #peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "queryCar","Args":["CAR101"]}'
}
lifecycleCommands() {
  echo " "
  echo "========================== PACKAGE CHAINCODE =========================="
  echo " "
  
  packageChaincode
  sleep 3

  echo " "
  echo "========================== INSTALL CHAINCODE ==========================="
  echo " "
  
  installChaincode
  sleep 3
  
  echo " "
  echo "========================== INSTALLED PACKAGE  =========================="
  echo " "
  
  queryInstalled
  sleep 3
  
  echo " "
  echo "============================ APPROVE FOR ORG ============================"
  approveForMyOrg3
  sleep 3
  
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

preSetupJavaScript
chaincodeInfo "$1"  "$2" "$3"
setGlobalsForPeer0Org3
lifecycleCommands
#insertTransaction
readTransaction
getInstallChaincodes
