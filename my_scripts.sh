
export PATH=${PWD}/bin:$PATH

sudo chmod -R 777 ../Hyperledger-Fabric

 cd org1
./1_enrollOrg1AdminAndUsers.sh
./2_generateMSPOrg1.sh
 cd ../org2
./1_enrollOrg2AdminAndUsers.sh
./2_generateMSPOrg2.sh 

cd ..
chmod -R 777 org3

cd org3
./1_enrollOrg3AdminAndUsers.sh
./2_generateMSPOrg3.sh 


 cd ../orderer
./1_enrollAdminAndMSP.sh
./2_artifact.sh
 
 cd ../org1
./3_createChannel.sh
 
 cd ../org2
./3_joinChannel.sh



cd ../org3
./3_createChannel.sh

cd ../org1
./3_joinChannel.sh


#query function from chaincode
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/orderer/crypto-config-ca/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem  --channelID mychannel  -n fabcarjs --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/org1/crypto-config-ca/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt  -c '{"function": "queryAllCars","Args":[]}'