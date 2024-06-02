#!/bin/bash
#!/usr/bin/env bash

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../orderer/crypto-config-ca/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export FABRIC_CFG_PATH=${PWD}/../config

chaincodeInfo(){
  #!/bin/bash
  export CHANNEL_NAME="mychannel"
  export CC_RUNTIME_LANGUAGE="node"
  export CC_SRC_PATH=../chaincodes/javascript
  export CC_NAME="permissiongraph"
  echo "Channel name: $CHANNEL_NAME"
}

setGlobalsForPeer0Org1() {
  export PEER0_ORG1_CA=${PWD}/../org1/crypto-config-ca/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
  export CORE_PEER_LOCALMSPID="Org1MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../org1/crypto-config-ca/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
  export CORE_PEER_ADDRESS=localhost:7051
}

setGlobalsForPeer1Org1() {
  export PEER0_ORG1_CA=${PWD}/../org1/crypto-config-ca/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt
  export CORE_PEER_LOCALMSPID="Org1MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
  export CORE_PEER_MSPCONFIGPATH=${PWD}/../org1/crypto-config-ca/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
  export CORE_PEER_ADDRESS=localhost:7051
}


setGlobalsForPeer0Org2() {
  export PEER0_ORG2_CA=${PWD}/../org2/crypto-config-ca/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
  export CORE_PEER_LOCALMSPID="Org2MSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
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

# Tablica ze stringami
# org1_array = (  "string2" "string3" "string4" )


# # Pętla for przetwarzająca kolejne elementy tablicy
# for element in "${tablica[@]}"
# do
#     setGlobalsForPeer0Org1
#     echo "Invoke: $element"
#     peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c "$element"
#     # Tutaj można dodać dowolne operacje na każdym elemencie
# done


#!/bin/bash


json="$(cat ../graph_structure/3zones.json)"
chaincodeInfo
generateGraph(){
echo $json
# JSON zawierający wierzchołki i krawędzie
# json='{
#   "vertices": [
#     {
#       "id": "zone0:wyatt.feest",
#       "type": "user"
#     },
#     {
#       "id": "zone0:emory.skiles",
#       "type": "user"
#     },
#     {
#       "id": "zone0:Murrayville",
#       "type": "provider"
#     },
#     {
#       "id": "zone0:earle.bauch",
#       "type": "user"
#     },
#     {
#       "id": "zone0:terrell.koch",
#       "type": "user"
#     },
#     {
#       "id": "zone0:sid.lindgren",
#       "type": "user"
#     },
#     {
#       "id": "zone0:edmund.lesch",
#       "type": "user"
#     },
#     {
#       "id": "zone0:rodger.crooks",
#       "type": "user"
#     },
#     {
#       "id": "zone0:GuyPlain",
#       "type": "space"
#     },
#     {
#       "id": "zone0:gregorio.hodkiewicz",
#       "type": "user"
#     },
#     {
#       "id": "zone0:nicolas.vonrueden",
#       "type": "user"
#     }
#   ],
#   "edges": [
#     {
#       "src": "zone0:sid.lindgren",
#       "dst": "zone0:GuyPlain",
#       "perms": "01000"
#     },
#     {
#       "src": "zone0:rodger.crooks",
#       "dst": "zone0:GuyPlain",
#       "perms": "10111"
#     },
#     {
#       "src": "zone0:edmund.lesch",
#       "dst": "zone0:GuyPlain",
#       "perms": "10110"
#     },
#     {
#       "src": "zone0:earle.bauch",
#       "dst": "zone0:GuyPlain",
#       "perms": "01011"
#     },
#     {
#       "src": "zone0:terrell.koch",
#       "dst": "zone0:GuyPlain",
#       "perms": "01001"
#     },
#     {
#       "src": "zone0:nicolas.vonrueden",
#       "dst": "zone0:earle.bauch",
#       "perms": "11010"
#     },
#     {
#       "src": "zone0:wyatt.feest",
#       "dst": "zone0:GuyPlain",
#       "perms": "11111"
#     },
#     {
#       "src": "zone0:gregorio.hodkiewicz",
#       "dst": "zone0:GuyPlain",
#       "perms": "10100"
#     }
#   ]
# }'
chaincodeInfo
setGlobalsForPeer0Org1
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME}  -c '{"function": "createVertex", "Args":["1" , "u"]}'
# Pętla przetwarzająca wierzchołki
echo "$json" | jq -c '.vertices[]' | while read -r vertex; 
do
  id=$(echo "$vertex" | jq -r '.id')
  type=$(echo "$vertex" | jq -r '.type')
  #echo  '{"function": "createVertex", "Args":[ "'${id}'" , "'${type}'"]}'
  if [[ $id == *"zone0"* ]]; then
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c '{"function": "createVertex", "Args":[ "'${id}'" , "'${type}'"]}'
  fi
done



echo ""
count=1
# Pętla przetwarzająca krawędzie
echo "Przetwarzanie krawędzi:"
echo "$json" | jq -c '.edges[]' | while read -r edge; do
  src=$(echo "$edge" | jq -r '.src')
  dst=$(echo "$edge" | jq -r '.dst')
  perms=$(echo "$edge" | jq -r '.perms')
  echo '{"function": "createEdge", "Args":[ "'${src}'" , "'${dst}'"  , '${perms}']}'
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c '{"function": "createEdge", "Args":[ "'${count}'" , "'${src}'" , "'${dst}'"  , "'${perms}'"]}'
  count=$((count + 1))
done


#peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "findPathAndConcatPerms", "Args":[ "zone0:rodger.crooks","zone0:GuyPlain"]}'

# json='{
#   "vertices": [
#     {
#       "id": "zone1:theola.gusikowski",
#       "type": "user"
#     },
#     {
#       "id": "zone1:BrianTurnpike",
#       "type": "space"
#     },
#     {
#       "id": "zone1:lyman.leuschke",
#       "type": "user"
#     },
#     {
#       "id": "zone1:et_praesentium",
#       "type": "group"
#     },
#     {
#       "id": "zone1:lois.ohara",
#       "type": "user"
#     },
#     {
#       "id": "zone1:saepe_aut",
#       "type": "group"
#     },
#     {
#       "id": "zone1:IsaiasCape",
#       "type": "space"
#     },
#     {
#       "id": "zone1:donte.hackett",
#       "type": "user"
#     },
#     {
#       "id": "zone1:monty.ward",
#       "type": "user"
#     },
#     {
#       "id": "zone1:karl.mertz",
#       "type": "user"
#     },
#     {
#       "id": "zone1:jerold.murray",
#       "type": "user"
#     },
#     {
#       "id": "zone1:norman.roob",
#       "type": "user"
#     },
#     {
#       "id": "zone1:danna.waters",
#       "type": "user"
#     },
#     {
#       "id": "zone1:dalila.mclaughlin",
#       "type": "user"
#     },
#     {
#       "id": "zone1:blair.bednar",
#       "type": "user"
#     },
#     {
#       "id": "zone1:rachelle.feest",
#       "type": "user"
#     }
#   ],
#   "edges": [
#     {
#       "src": "zone1:danna.waters",
#       "dst": "zone1:saepe_aut",
#       "perms": "11100"
#     },
#     {
#       "src": "zone1:norman.roob",
#       "dst": "zone1:saepe_aut",
#       "perms": "00100"
#     },
#     {
#       "src": "zone1:karl.mertz",
#       "dst": "zone1:et_praesentium",
#       "perms": "01111"
#     },
#     {
#       "src": "zone1:lois.ohara",
#       "dst": "zone1:et_praesentium",
#       "perms": "01001"
#     },
#     {
#       "src": "zone1:saepe_aut",
#       "dst": "zone1:IsaiasCape",
#       "perms": "11000"
#     },
#     {
#       "src": "zone1:rachelle.feest",
#       "dst": "zone1:IsaiasCape",
#       "perms": "11000"
#     },
#     {
#       "src": "zone0:emory.skiles",
#       "dst": "zone1:et_praesentium",
#       "perms": "10100"
#     },
#     {
#       "src": "zone1:theola.gusikowski",
#       "dst": "zone1:IsaiasCape",
#       "perms": "00101"
#     },
#     {
#       "src": "zone1:lyman.leuschke",
#       "dst": "zone1:et_praesentium",
#       "perms": "10000"
#     },
#     {
#       "src": "zone1:monty.ward",
#       "dst": "zone1:saepe_aut",
#       "perms": "10010"
#     },
#     {
#       "src": "zone1:lyman.leuschke",
#       "dst": "zone1:saepe_aut",
#       "perms": "10101"
#     },
#     {
#       "src": "zone1:jerold.murray",
#       "dst": "zone1:IsaiasCape",
#       "perms": "00100"
#     },
#     {
#       "src": "zone1:et_praesentium",
#       "dst": "zone1:IsaiasCape",
#       "perms": "10111"
#     },
#     {
#       "src": "zone1:IsaiasCape",
#       "dst": "zone0:Murrayville",
#       "perms": "00111"
#     },
#     {
#       "src": "zone1:donte.hackett",
#       "dst": "zone1:IsaiasCape",
#       "perms": "01010"
#     },
#     {
#       "src": "zone1:dalila.mclaughlin",
#       "dst": "zone1:et_praesentium",
#       "perms": "00110"
#     },
#     {
#       "src": "zone1:blair.bednar",
#       "dst": "zone0:et_praesentium",
#       "perms": "10111"
#     } ,
#     {
#       "src": "zone1:blair.bednar",
#       "dst": "zone0:et_praesentium",
#       "perms": "10111"
#     }
#   ]
# }'

# json='{"edges": [ {
#       "src": "zone1:lois.ohara",
#       "dst": "zone1:IsaiasCape",
#       "perms": "10100"
#     }]}'
setGlobalsForPeer0Org1
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME}  -c '{"function": "createVertex", "Args":["1" , "u"]}'
# Pętla przetwarzająca wierzchołki
echo "$json" | jq -c '.vertices[]' | while read -r vertex; 
do
  id=$(echo "$vertex" | jq -r '.id')
  type=$(echo "$vertex" | jq -r '.type')
  type=$(echo "$vertex" | jq -r '.id')
  #echo  '{"function": "createVertex", "Args":[ "'${id}'" , "'${type}'"]}'
  if [[ $id == *"zone1"* ]]; then
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA -c '{"function": "createVertex", "Args":[ "'${id}'" , "'${type}'"]}'
  fi
done

echo ""
count=1
# Pętla przetwarzająca krawędzie
echo "Przetwarzanie krawędzi:"
echo "$json" | jq -c '.edges[]' | while read -r edge; do
  src=$(echo "$edge" | jq -r '.src')
  dst=$(echo "$edge" | jq -r '.dst')
  perms=$(echo "$edge" | jq -r '.perms')
  echo '{"function": "createEdge", "Args":[ "'${src}'" , "'${dst}'"  , '${perms}']}'
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA -c '{"function": "createEdge", "Args":[ "'${count}'" , "'${src}'" , "'${dst}'"  , "'${perms}'"]}'
  count=$((count + 1))
done 


setGlobalsForPeer0Org3
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME}  -c '{"function": "createVertex", "Args":["1" , "u"]}'
# Pętla przetwarzająca wierzchołki
echo "$json" | jq -c '.vertices[]' | while read -r vertex; 
do
  id=$(echo "$vertex" | jq -r '.id')
  type=$(echo "$vertex" | jq -r '.type')
  type=$(echo "$vertex" | jq -r '.id')
  #echo  '{"function": "createVertex", "Args":[ "'${id}'" , "'${type}'"]}'
  if [[ $id == *"zone2"* ]]; then
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA -c '{"function": "createVertex", "Args":[ "'${id}'" , "'${type}'"]}'
  fi
done

echo ""
count=1
# Pętla przetwarzająca krawędzie
echo "Przetwarzanie krawędzi:"
echo "$json" | jq -c '.edges[]' | while read -r edge; do
  src=$(echo "$edge" | jq -r '.src')
  dst=$(echo "$edge" | jq -r '.dst')
  perms=$(echo "$edge" | jq -r '.perms')
  echo '{"function": "createEdge", "Args":[ "'${src}'" , "'${dst}'"  , '${perms}']}'
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA -c '{"function": "createEdge", "Args":[ "'${count}'" , "'${src}'" , "'${dst}'"  , "'${perms}'"]}'
  count=$((count + 1))
done 
}

#generateGraph

setGlobalsForPeer0Org2
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c '{"function": "createEdge", "Args":[ "20" , "zone1:blair.bednar" , "zone0:et_praesentium"  , "10111"]}'

echo '{"function": "findPathAndConcatPerms", "Args":[ "zone1:lyman.leuschke", "zone1:IsaiasCape"]}'
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "findPathAndConcatPerms", "Args":[ "zone1:lyman.leuschke", "zone1:IsaiasCape"]}'

#peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "findPathAndConcatPerms", "Args":[ "zone1:et_praesentium", "zone1:IsaiasCape"]}'
#peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "queryVertex", "Args":[ "zone1:et_praesentium"]}'


echo '{"function": "changePermission", "Args":[ "14" ,  "11001"]}'
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA -c '{"function": "changePermission", "Args":[ "14" ,  "11001"]}'
  