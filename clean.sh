#!/usr/bin/env bash

#if your using centos then enable below command
sudo setenforce 0

removeOrdererCA() {

  echo "Removing Orderer CA"
  docker-compose -f ./orderer/ca-orderer.yaml down --volumes --remove-orphans

}
removeOrg1CA() {

  echo "Removing Org1 CA"
  docker-compose -f ./org1/ca-org1.yaml down --volumes --remove-orphans

}
removeOrg2CA() {

  echo "Removing Org2 CA"
  docker-compose -f ./org2/ca-org2.yaml down --volumes --remove-orphans

}
removeOrderers() {
  echo "Removing orderers "
  docker-compose -f ./orderer/docker-compose-orderer.yaml down --volumes --remove-orphans
}
removeOrg1() {

  echo "Removing Org1 Peers"
  docker-compose -f ./org1/docker-compose-peer.yaml down --volumes --remove-orphans
}
removeOrg2() {
  echo "Removing Org1 Peers"
  docker-compose -f ./org2/docker-compose-peer.yaml down --volumes --remove-orphans
}


removeOrg3CA() {

  echo "Removing Org3 CA"
  docker-compose -f ./org3/ca-org3.yaml down --volumes --remove-orphans
}
removeOrg3CA() {
  echo "Removing Org3 Peers"
  docker-compose -f ./org3/docker-compose-peer.yaml down --volumes --remove-orphans
}

export COMPOSE_PROJECT_NAME=fabricnet
removeOrdererCA
removeOrg1CA
removeOrg2CA
removeOrderers
removeOrg1
removeOrg2
export COMPOSE_PROJECT_NAME=org3
removeOrg3CA
removeOrg3CA

cd ..
sudo chmod -R 777 Hyperledger-Fabric
cd Hyperledger-Fabric

echo "Removing crypto CA material"
rm -rf ./orderer/fabric-ca
rm -rf ./org1/fabric-ca
rm -rf ./org2/fabric-ca
rm -rf ./orderer/crypto-config-ca
rm -rf ./org1/crypto-config-ca
rm -rf ./org2/crypto-config-ca
rm -rf ./org1/Org1MSPanchors.tx
rm -rf ./org2/Org2MSPanchors.tx
rm -rf ./orderer/genesis.block
rm -rf ./orderer/mychannel.tx
rm -rf ./org1/mychannel.tx
rm -rf ./org1/mychannel.block
rm -rf ./org2/mychannel.tx
rm -rf ./org2/mychannel.block
rm -rf ./explorer/dockerConfig/crypto-config
rm -rf ./deployChaincode/*.tar.gz
rm -rf ./deployChaincode/node_modules
rm -rf ./deployChaincode/log.txt
rm -rf ./deployChaincode/npm-debug.log
rm -rf ./revokeIdentity/config*  ./revokeIdentity/modi* ./revokeIdentity/base64Cert


rm -rf ./org3/fabric-ca
rm -rf ./org3/crypto-config-ca
rm -rf ./org3/Org3MSPanchors.tx
rm -rf ./org3/mychannel2.tx
rm -rf ./org3/mychannel2.block
rm -rf ./orderer/mychannel2.tx
rm -rf ./orderer/mychannel2.block

