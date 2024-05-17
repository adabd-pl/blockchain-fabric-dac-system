#npm install --only=prod @hyperledger/caliper-cli@0.4.2

#npx caliper bind --caliper-bind-sut fabric:2.2

npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml --caliper-benchconfig benchmarks/myAssetBenchmark.yaml --caliper-flow-only-test --caliper-fabric-gateway-enabled