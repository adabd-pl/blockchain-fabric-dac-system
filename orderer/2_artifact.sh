#!/usr/bin/env bash

# System channel
SYS_CHANNEL="sys-channel"

# channel name defaults to "mychannel"
CHANNEL_NAME="mychannel"

echo $CHANNEL_NAME

# Generate System Genesis block
configtxgen -profile OrdererGenesis -configPath . -channelID $SYS_CHANNEL -outputBlock ./genesis.block

# Generate channel configuration block
configtxgen -profile BasicChannel -configPath . -outputCreateChannelTx ./mychannel.tx -channelID $CHANNEL_NAME

echo "#######    Generating anchor peer update for Org1MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ../org1/Org1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org1MSP

echo "#######    Generating anchor peer update for Org2MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ../org2/Org2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org2MSP

echo "#######    Generating anchor peer update for Org3MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ../org3/Org3MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org3MSP

sleep 2

# channel name defaults to "mychannel"
##CHANNEL_NAME="mychannel2"

#echo $CHANNEL_NAME

# Generate System Genesis block
#configtxgen -profile OrdererGenesis -configPath . -channelID $SYS_CHANNEL -outputBlock ./genesis2.block

# Generate channel configuration block
#configtxgen -profile BasicChannel2 -configPath . -outputCreateChannelTx ./mychannel2.tx -channelID $CHANNEL_NAME

#echo "#######    Generating anchor peer update for Org1MSP  ##########"
#configtxgen -profile BasicChannel2 -configPath . -outputAnchorPeersUpdate ../org1/Org1MSPanchors2.tx -channelID $CHANNEL_NAME -asOrg Org1MSP

#echo "#######    Generating anchor peer update for Org3MSP  ##########"
#configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ../org3/Org3MSPanchors2.tx -channelID $CHANNEL_NAME -asOrg Org3MSP

#sleep 2

docker-compose -f docker-compose-orderer.yaml up -d

sleep 20