#!/usr/bin/env bash

cp ../orderer/mychannel2.tx .
export CORE_PEER_TLS_ENABLED=true
ORDERER_CA=${PWD}/../orderer/crypto-config-ca/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_ORG3_CA=${PWD}/crypto-config-ca/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/../config

export CHANNEL_NAME=mychannel2

setGlobalsForPeer0Org3() {
  export CORE_PEER_LOCALMSPID="Org3MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/crypto-config-ca/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
  export CORE_PEER_ADDRESS=localhost:11051
}

setGlobalsForPeer1Org3() {
  export CORE_PEER_LOCALMSPID="Org3MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/crypto-config-ca/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
  export CORE_PEER_ADDRESS=localhost:12051

}

createChannel() {
  echo "========================== CREATE  CHANNEL =========================="
  setGlobalsForPeer0Org3

  peer channel create -o localhost:7050 -c $CHANNEL_NAME \
    --ordererTLSHostnameOverride orderer.example.com \
    -f ./${CHANNEL_NAME}.tx --outputBlock ./${CHANNEL_NAME}.block \
    --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

}

joinChannel() {
  echo "========================== JOIN TO CHANNEL =========================="
  setGlobalsForPeer0Org3
  peer channel join -b ./$CHANNEL_NAME.block

  setGlobalsForPeer1Org3
  peer channel join -b ./$CHANNEL_NAME.block
}

updateAnchorPeers() {
  echo "======================== UPDATE ANCHOR PEER ========================="
  setGlobalsForPeer0Org3
  peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME -f ./${CORE_PEER_LOCALMSPID}anchors2.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

}
echo    "========================== ORG3 CHANNEL 2 =========================="
createChannel
sleep 10
joinChannel
sleep 10
updateAnchorPeers
sleep 10
